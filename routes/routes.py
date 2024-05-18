from flask import Blueprint, jsonify, request, render_template
from google_sheets import get_data_from_google_sheets
from datetime import datetime, timedelta

routes = Blueprint('routes', __name__)

@routes.route('/api/noticias/ultima-fecha', methods=['GET'])
def obtener_ultima_fecha():
    noticias = get_data_from_google_sheets()  # Obtener todas las noticias
    fecha_mas_reciente = obtener_fecha_mas_reciente(noticias)
    noticias_ultima_fecha = [noticia for noticia in noticias if noticia['Fecha'] == fecha_mas_reciente]
    return jsonify(noticias_ultima_fecha)

def obtener_fecha_mas_reciente(noticias):
    # Extraer las fechas de las noticias y convertirlas a objetos datetime
    fechas_noticias = [datetime.strptime(noticia['Fecha'], '%Y-%m-%d') for noticia in noticias]

    # Encontrar la fecha más reciente
    fecha_mas_reciente = max(fechas_noticias)

    return fecha_mas_reciente.strftime('%Y-%m-%d')  # Convertir la fecha a formato de cadena


@routes.route('/api/noticias', methods=['GET'])
def obtener_noticias():
    noticias = get_data_from_google_sheets()
    return jsonify(noticias)

@routes.route('/noticias')
def mostrar_pagina_noticias():
    return render_template('noticias.html')

@routes.route('/api/noticias/fecha', methods=['GET'])
def obtener_noticias_por_fecha():
    fecha = request.args.get('fecha')

    if fecha:
        noticias = get_data_from_google_sheets()
        noticias_filtradas = [noticia for noticia in noticias if noticia['Fecha'] == fecha]
        return jsonify(noticias_filtradas)
    else:
        return "Especifica una fecha en el parámetro 'fecha'"

@routes.route('/api/noticias/buscar', methods=['GET'])
def buscar_noticias():
    keyword = request.args.get('keyword')

    if keyword:
        noticias = get_data_from_google_sheets()
        noticias_filtradas = [noticia for noticia in noticias if keyword.lower() in noticia['Título'].lower() or keyword.lower() in noticia['Descripción'].lower()]
        return jsonify(noticias_filtradas)
    else:
        return "Especifica una palabra clave en el parámetro 'keyword'"

@routes.route('/api/noticias/categoria', methods=['GET'])
def filtrar_noticias_por_categoria():
    categoria = request.args.get('categoria')

    if categoria:
        noticias = get_data_from_google_sheets()
        noticias_filtradas = [noticia for noticia in noticias if noticia['Categoría'].lower() == categoria.lower()]
        return jsonify(noticias_filtradas)
    else:
        return "Especifica una categoría en el parámetro 'categoria'"

@routes.route('/api/noticias/rango_fecha', methods=['GET'])
def filtrar_noticias_por_rango_fecha():
    fecha_inicio = request.args.get('inicio')
    fecha_fin = request.args.get('fin')

    if fecha_inicio and fecha_fin:
        noticias = get_data_from_google_sheets()
        noticias_filtradas = [noticia for noticia in noticias if fecha_inicio <= noticia['Fecha'] <= fecha_fin]
        return jsonify(noticias_filtradas)
    else:
        return "Especifica una fecha de inicio y una fecha de fin en los parámetros 'inicio' y 'fin'"

@routes.route('/api/noticias/fuente', methods=['GET'])
def filtrar_noticias_por_fuente():
    fuente = request.args.get('fuente')

    if fuente:
        noticias = get_data_from_google_sheets()
        noticias_filtradas = [noticia for noticia in noticias if noticia['Fuente'].lower() == fuente.lower()]
        return jsonify(noticias_filtradas)
    else:
        return "Especifica una fuente en el parámetro 'fuente'"



