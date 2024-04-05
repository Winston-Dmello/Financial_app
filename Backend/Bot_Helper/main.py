API_KEY = "AIzaSyAF3OttFDMYIpTvwq39N8iY8P3ECCHzlyg"
#test
import google.generativeai as genai

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

def get_info(Transactions):
    response = model.generate_content(f'''{Transactions}
                                      You are supposed to take the +ve values as incomes and -ve values as expenses
                                      
                                      Answer in 5-10 points
                                      You are acting as a financial advisor on my expense Tracker app, I 
                                      be providing you with the transaction details.
                                      You are required to analyse them and suggest them tips on where they can
                                      reduce spending
                                      
                                      the app allows them to visualise the data already, apart from this the app also has a 
                                      goal-setting system. Give your inputs based on the following data
                                      ''')
    print(response.text)