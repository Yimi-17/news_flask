import gspread
from google.oauth2 import service_account

def connect_to_google_sheets():
    try:
        scope = ['https://spreadsheets.google.com/feeds',
                 'https://www.googleapis.com/auth/drive']
        credentials = service_account.Credentials.from_service_account_file(
            'dblosandes-e90932558c9c.json', scopes=scope)
        client = gspread.authorize(credentials)
        return client
    except Exception as e:
        print("Error al conectar con Google Sheets:", e)
        return None

def get_data_from_google_sheets():
    client = connect_to_google_sheets()
    if client:
        try:
            sheet = client.open('dblosandes').worksheet('MainV2')
            data = sheet.get_all_records()
            return data
        except Exception as e:
            print("Error al obtener datos de Google Sheets:", e)
            return []
    else:
        return []