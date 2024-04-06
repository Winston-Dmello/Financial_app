import pandas as pd
import numpy as np
import re
from nanoid import generate
from database import Transactions
import asyncio
from datetime import datetime
from Bot_Helper.main import get_info

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

async def upload_balance_sheet(userid):
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
        {"UserId": userid},
        {"$set": {f"transactions.{generate()}": transaction}}
    )
    print('Successfully Added!')
    
async def basic_details(UserID):
    Total_Amount_Spent: float = 0
    Total_Amount_Recieved:float = 0
    Net_Total:float = 0
    
    user_transaction_data = await Transactions.find_one({"UserId":UserID})
    transactions = user_transaction_data['transactions']
    for transaction in transactions:
        details = transactions[transaction]
        if details['amount']>0:
            Total_Amount_Recieved += details['amount']
        else:
            Total_Amount_Spent += (-1*details['amount'])
    Net_Total = Total_Amount_Recieved-Total_Amount_Spent
    
    print(Total_Amount_Spent.__round__(2), Total_Amount_Recieved.__round__(2), Net_Total.__round__(2))

async def monthly_average_details(UserID, year=2024):
    cal_dict = {}
    for month in range(1,13):
        start_date = datetime(year, month, 1)
        end_date = datetime(year, month + 1, 1) if month < 12 else datetime(year + 1, 1, 1)

        user_data = await Transactions.find_one({"UserId": UserID})
        transactions = user_data.get("transactions", {})
        filtered_transactions = [v for v in transactions.values() if start_date <= v["Date"] < end_date]
        Monthly_Income = 0
        Monthly_Expense = 0
        if len(filtered_transactions) > 0:
            for transaction in filtered_transactions:
                if transaction['amount'] > 0:
                    Monthly_Income+=transaction['amount']
                else:
                    Monthly_Expense+=(-1*transaction['amount'])
            cal_dict[month] = [Monthly_Income.__round__(2), Monthly_Expense.__round__(2), (Monthly_Income-Monthly_Expense).__round__(2)]
    print(cal_dict)
async def highest_spend(UserID):
    user_data = await Transactions.find_one({"UserId":UserID})
    transactions = user_data.get("transactions", {})
    lowest_amount = 0
    for transaction in transactions:
        if transactions[transaction]["amount"] < lowest_amount:
            lowest_amount = transactions[transaction]['amount']
            lowest_transaction = transaction
    print(transactions[lowest_transaction])

async def most_money_sent_to(UserID):
    user_data = await Transactions.find_one({"UserId":UserID})
    transactions = user_data.get("transactions", {})
    sender_dict = {}
    for transaction in transactions:
        if transactions[transaction]['particulars'] in sender_dict:
            sender_dict[transactions[transaction]['particulars']] += transactions[transaction]['amount']
        else:
            sender_dict[transactions[transaction]['particulars']] = transactions[transaction]['amount']
    highest_client = {k: v for k, v in sender_dict.items() if v == min(sender_dict.values())}
    print(highest_client)
async def analysis(UserID):
    user_data = await Transactions.find_one({'UserId':UserID})
    transactions = user_data.get('transactions', {})
    get_info(transactions)

async def pie_data(UserID):
    data = []
    data_data = {}
    user_data = await Transactions.find_one({'UserId': UserID})
    transactions = user_data.get('transactions', {})
    for transaction in transactions.values():
        if transaction['amount']<0:
            if transaction['particulars'] in data_data:
                data_data[transaction['particulars']] += transaction['amount']
            else:
                data_data[transaction['particulars']] = transaction['amount']
    for x,y in data_data.items():
        data.append({x:-y})
    return data

async def get_recent_trans(UserID):
    user_details = await Transactions.find_one({"UserId":UserID})
    if user_details != None:
        transactions = user_details.get("transactions")
        if transactions != None:
            trs = []
            for t in transactions:
                trs.append({t:transactions[t]})
            return trs[::-1][:31]

def manage_datetime(transactions):
    if transactions:
        for t in transactions:
            for x in t:
                t[x]['Date'] =  datetime.strftime(t[x]['Date'],"%d-%m-%Y")
        return transactions