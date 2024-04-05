API_KEY = "AIzaSyAF3OttFDMYIpTvwq39N8iY8P3ECCHzlyg"

import google.generativeai as genai

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')


response = model.generate_content('could you repeat that again')
print(response.text)