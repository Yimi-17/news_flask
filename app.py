from flask import Flask, jsonify
import gspread
from google.oauth2.service_account import Credentials as ServiceAccountCredentials
from google.auth import _service_account_info
from google.oauth2 import service_account

app = Flask(__name__)

def connect_to_google_sheets():
    scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
    credentials = service_account.Credentials.from_service_account_file(
        'dblosandes-e90932558c9c.json', scopes=scope)
    client = gspread.authorize(credentials)
    return client

def get_data_from_google_sheets():
    client = connect_to_google_sheets()
    sheet = client.open('dblosandes').worksheet('MainV2')  # Reemplaza 'Nombre de tu hoja de cálculo' por el nombre real de tu hoja
    data = sheet.get_all_records()  # Esto recuperará todos los datos de la hoja
    return data

@app.route('/api/noticias')
def obtener_noticias():
    noticias = get_data_from_google_sheets()
    return jsonify(noticias)

if __name__ == '__main__':
    app.run(debug=True)

