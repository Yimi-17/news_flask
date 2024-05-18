from flask import Flask, render_template
from flask_cors import CORS
from config import Config
from routes.routes import routes  # Importa el blueprint correctamente
from os.path import join

app = Flask(__name__)
app.config.from_object(Config)
app.template_folder = join(app.root_path, 'templates')

# Configuración de Flask-CORS para permitir solicitudes desde cualquier origen durante el desarrollo
CORS(app)

# Registro de las rutas
app.register_blueprint(routes)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/noticias')
def mostrar_pagina_noticias():
    return render_template('noticias.html')

if __name__ == '__main__':
    app.run(debug=True)
