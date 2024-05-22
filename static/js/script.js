// Función para cargar las últimas noticias en la página de noticias
async function cargarNoticias() {
    try {
        const response = await fetch('/api/noticias'); // Corrige la URL aquí
        if (!response.ok) {
            throw new Error('La solicitud a /api/noticias falló');
        }
        const data = await response.json();

        const listaNoticias = document.getElementById('todas-noticias'); // Asigna el ID correcto aquí
        if (!listaNoticias) {
            throw new Error('No se encontró el elemento con ID "todas-noticias"');
        }
        listaNoticias.innerHTML = ''; // Limpiar contenido existente

        data.forEach(noticia => {
            const item = document.createElement('div');
            item.classList.add('col-md-4', 'mb-4'); // Añadir clases de Bootstrap para el diseño de columnas
            item.innerHTML = `
                <div class="card h-100">
                    <img src="${noticia['URL de la imagen']}" class="card-img-top" alt="Imagen de la noticia">
                    <div class="card-body">
                        <h5 class="card-title">${noticia['Título']}</h5>
                        <p class="card-text">${noticia['Descripción']}</p>
                        <p class="card-text"><small class="text-muted">Categoría: ${noticia['Categoría']}</small></p>
                        <p class="card-text"><small class="text-muted">Fecha: ${noticia['Fecha']}</small></p>
                        <p class="card-text"><small class="text-muted">Fuente: ${noticia['Fuente']}</small></p>
                    </div>
                    <div class="card-footer">
                        <a href="${noticia['URL de la noticia']}" class="btn btn-primary" target="_blank">Ver más</a>
                    </div>
                </div>
            `;
            listaNoticias.appendChild(item);
        });
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
    }
}

// Función para cargar las últimas noticias de la fecha más reciente
async function cargarUltimasNoticiasFechaMasReciente() {
    try {
        const response = await fetch('/api/noticias/ultima-fecha');
        if (!response.ok) {
            throw new Error('La solicitud a /api/noticias/ultima-fecha falló');
        }
        const noticias = await response.json();

        const listaNoticias = document.getElementById('ultimas-noticias-fecha-mas-reciente');
        listaNoticias.innerHTML = ''; // Limpiar contenido existente

        noticias.forEach(noticia => {
            const item = document.createElement('div');
            item.classList.add('col-md-4', 'mb-4'); // Añadir clases de Bootstrap para el diseño de columnas
            item.innerHTML = `
                <div class="card h-100">
                    <img src="${noticia['URL de la imagen']}" class="card-img-top" alt="Imagen de la noticia">
                    <div class="card-body">
                        <h5 class="card-title">${noticia['Título']}</h5>
                        <p class="card-text">${noticia['Descripción']}</p>
                        <p class="card-text"><small class="text-muted">Categoría: ${noticia['Categoría']}</small></p>
                        <p class="card-text"><small class="text-muted">Fecha: ${noticia['Fecha']}</small></p>
                        <p class="card-text"><small class="text-muted">Fuente: ${noticia['Fuente']}</small></p>
                    </div>
                    <div class="card-footer">
                        <a href="${noticia['URL de la noticia']}" class="btn btn-primary" target="_blank">Ver más</a>
                    </div>
                </div>
            `;
            listaNoticias.appendChild(item);
        });

    } catch (error) {
        console.error('Error al cargar las últimas noticias de la fecha más reciente:', error);
    }
}

// Función para buscar noticias por palabra clave
async function buscarNoticias() {
    const keyword = document.getElementById('search-input').value.trim(); // Obtener la palabra clave ingresada por el usuario

    try {
        const response = await fetch(`/api/noticias/buscar?keyword=${keyword}`); // Realizar la solicitud GET con la palabra clave como parámetro
        if (!response.ok) {
            throw new Error('La solicitud a /api/noticias/buscar falló');
        }
        const noticias = await response.json();

        const listaNoticias = document.getElementById('todas-noticias');
        listaNoticias.innerHTML = ''; // Limpiar contenido existente

        noticias.forEach(noticia => {
            const item = document.createElement('div');
            item.classList.add('col-md-4', 'mb-4'); // Añadir clases de Bootstrap para el diseño de columnas
            item.innerHTML = `
                <div class="card h-100">
                    <img src="${noticia['URL de la imagen']}" class="card-img-top" alt="Imagen de la noticia">
                    <div class="card-body">
                        <h5 class="card-title">${noticia['Título']}</h5>
                        <p class="card-text">${noticia['Descripción']}</p>
                        <p class="card-text"><small class="text-muted">Categoría: ${noticia['Categoría']}</small></p>
                        <p class="card-text"><small class="text-muted">Fecha: ${noticia['Fecha']}</small></p>
                        <p class="card-text"><small class="text-muted">Fuente: ${noticia['Fuente']}</small></p>
                    </div>
                    <div class="card-footer">
                        <a href="${noticia['URL de la noticia']}" class="btn btn-primary" target="_blank">Ver más</a>
                    </div>
                </div>
            `;
            listaNoticias.appendChild(item);
        });
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
    }
}

// Asociar las funciones a los eventos de carga de la página y clic del botón de búsqueda
window.onload = () => {
    cargarNoticias();
    cargarUltimasNoticiasFechaMasReciente();
    const botonBuscar = document.getElementById('search-button');
    botonBuscar.addEventListener('click', buscarNoticias);
};
