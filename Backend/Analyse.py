import pandas as pd
import numpy as np
import re
from nanoid import generate
from database import Transactions

FILE_PATHS = ".\Bank_Statements"

def find_table():
    start_row = -1
    end_row = -1
    with open(f"{FILE_PATHS}/test.csv", 'r') as file_data:  
        keywords = ['date', 'tran date', 'particulars', 'details', 'credit', 'cr', 'debit', 'dr', 'balance', 'bal']
        fd = file_data.readlines()
        for i, line in enumerate(fd):
            if line.startswith("Tran Date") or line.startswith("Date"):
                start_row = i
                break
        for i, line in enumerate(fd[start_row:], start=i):
            if line.isspace():
                end_row = i
                break
        return(start_row, end_row-1)

def extract_part(x):
    if x.startswith("UPI"):
        match = re.match(r'\bUPI/[^/]*/[^/]*/([^/]*)/', x)
        if match:
            return match.group(1).strip()
    return x
def get_table():
    (start_row, end_row) = find_table()
    df = pd.read_csv(f'{FILE_PATHS}/test.csv', skiprows=start_row, nrows=end_row-start_row)
    for col in df.columns:
        if col.lower() in ["tran date", "transaction date", "date"]:
            df.rename(columns={col: "Date"}, inplace=True)
        elif col.lower() in ['particulars', 'details']:
            df.rename(columns={col:"particulars"}, inplace=True)
        elif col.lower() in ['cr', 'c', 'crdt', 'credit']:
            df.rename(columns={col: 'credit'}, inplace=True)
        elif col.lower() in ['dr', 'd', 'debt', 'debit']:
            df.rename(columns= {col:'debit'}, inplace=True)
        elif col.lower() in ['bal', "balance", 'remaining balance', 'rem bal', 'remaining bal']:
            df. rename(columns= {col: "balance"},inplace=True)
    df.replace(r'^\s*$', np.nan, regex=True, inplace=True)
    df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y')
    df['credit'] = df['credit'].str.strip().astype(float)
    df['debit'] = df['debit'].str.strip().astype(float)
    df['type'] = df['particulars'].str.startswith('UPI').map({True: "UPI", False:"Non-UPI"})
    df['amount'] = df.apply(lambda row: row['credit'] if pd.notnull(row['credit']) else -row['debit'] if pd.notnull(row['debit']) else pd.NA, axis=1)
    df['particulars'] = df['particulars'].apply(extract_part)
    return df

async def upload_balance_sheet(userid=None):
    df = get_table()
    for index, row in df.iterrows():
        transaction = {
            "Date": row['Date'].to_pydatetime(),
            "particulars": row['particulars'],
            "amount": row['amount'],
            "type": row['type'],
            "Category": "",
            "notes": ""
        }
        await Transactions.update_one(
        {"UserId": "m6UgaO0i"},
        {"$set": {f"transactions.{generate()}": transaction}}
    )
    print('Successfully Added!')