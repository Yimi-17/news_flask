// Función para cargar las últimas noticias en la página de noticias
async function cargarNoticias() {
    try {
        const response = await fetch('http://localhost:5000/api/noticias'); // Corrige la URL aquí
        if (!response.ok) {
            throw new Error('La solicitud a /api/noticias falló');
        }
        const data = await response.json();
        
        const listaNoticias = document.getElementById('todas-noticias'); // Asigna el ID correcto aquí
        if (!listaNoticias) {
            throw new Error('No se encontró el elemento con ID "noticias"');
        }
        listaNoticias.innerHTML = ''; // Limpiar contenido existente

        data.forEach(noticia => {
            const item = document.createElement('li');
            item.innerHTML = `
                <h3>${noticia['Título']}</h3>
                <p>${noticia['Descripción']}</p>
                <p>Categoría: ${noticia['Categoría']}</p>
                <p>Fecha: ${noticia['Fecha']}</p>
                <img src="${noticia['URL de la imagen']}" alt="Imagen de la noticia">
                <a href="${noticia['URL de la noticia']}" target="_blank">Ver más</a>
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
        const response = await fetch('http://localhost:5000/api/noticias/ultima-fecha');
        if (!response.ok) {
            throw new Error('La solicitud a /api/noticias/ultima-fecha falló');
        }
        const noticias = await response.json();
        
        // Limpiar la lista de noticias
        const listaNoticias = document.getElementById('ultimas-noticias-fecha-mas-reciente');
        listaNoticias.innerHTML = ''; // Limpiar contenido existente

        // Procesar las noticias obtenidas
        noticias.forEach(noticia => {
            const item = document.createElement('li');
            item.innerHTML = `
                <h3>${noticia['Título']}</h3>
                <p>${noticia['Descripción']}</p>
                <p>Categoría: ${noticia['Categoría']}</p>
                <p>Fecha: ${noticia['Fecha']}</p>
                <img src="${noticia['URL de la imagen']}" alt="Imagen de la noticia">
                <a href="${noticia['URL de la noticia']}" target="_blank">Ver más</a>
            `;
            listaNoticias.appendChild(item);
        });

    } catch (error) {
        console.error('Error al cargar las últimas noticias de la fecha más reciente:', error);
    }
}

window.onload = () => {
    cargarNoticias();
    cargarUltimasNoticiasFechaMasReciente();
    
};



