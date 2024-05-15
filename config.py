import os
class Config:
    # Configuraciones generales
    DEBUG = True  # Modo de depuración activado
    PORT = 5000  # Puerto en el que se ejecuta la aplicación
    HOST = 'localhost'  # Dirección IP local
    SECRET_KEY = os.urandom(24)# Generar una clave secreta aleatoria

    # Configuración de la base de datos
    #DATABASE_URI = 'sqlite:///tu_base_de_datos.db'

    # Configuración de seguridad
    CORS_ENABLED = True  # Habilitar CORS

    # Otras configuraciones
    # ...
