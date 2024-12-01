// Configuración y Constantes
const CONFIG_API = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '124b92a8dd9ec01ffb0dbf64bc44af3c',
    ciudadPredeterminada: 'nueva york'
};

const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Elementos del DOM
const elementos = {
    logoTitulo: document.querySelector('.title'),
    cuerpo: document.querySelector('body'),
    inputCiudad: document.querySelector('#get-city'),
    nombreCiudad: document.querySelector('.city-name'),
    temperatura: document.querySelector('.weather-deg'),
    condicion: document.querySelector('.weather-condition'),
    humedad: document.querySelector('.humidity'),
    fecha: document.querySelector('.date')
};

// Gestión del Fondo
function establecerFondoAleatorio() {
    const numeroAleatorio = Math.ceil(Math.random() * 5);
    elementos.cuerpo.style.backgroundImage = `url('images/bg${numeroAleatorio}.jpg')`;
    
    if (numeroAleatorio >= 3) {
        elementos.logoTitulo.style.color = 'white';
    }
}

// Formateo de Fecha
function formatearFechaActual() {
    const fechaActual = new Date();
    const mes = MESES[fechaActual.getMonth()];
    return `${fechaActual.getDate()} de ${mes} de ${fechaActual.getFullYear()}`;
}

// Gestión de Datos del Clima
async function obtenerDatosClima(ciudad) {
    try {
        const respuesta = await fetch(`${CONFIG_API.url}${ciudad}&&appid=${CONFIG_API.key}`);
        const datos = await respuesta.json();
        actualizarVistaClima(datos);
    } catch (error) {
        console.error('Error al obtener datos del clima:', error);
    }
}

function actualizarVistaClima(datos) {
    const temperaturaCelsius = Math.round(datos.main.temp - 273.15);
    
    elementos.nombreCiudad.textContent = `${datos.name}, ${datos.sys.country}`;
    elementos.temperatura.textContent = `${temperaturaCelsius}°C`;
    elementos.condicion.textContent = traducirCondicionClima(datos.weather[0].description);
    elementos.humedad.textContent = `Humedad: ${datos.main.humidity}%`;
    elementos.fecha.textContent = formatearFechaActual();
}

// Traducción de condiciones climáticas
function traducirCondicionClima(condicion) {
    const traducciones = {
        'clear sky': 'cielo despejado',
        'few clouds': 'algunas nubes',
        'scattered clouds': 'nubes dispersas',
        'broken clouds': 'nublado parcial',
        'overcast clouds': 'nublado',
        'light rain': 'lluvia ligera',
        'moderate rain': 'lluvia moderada',
        'heavy rain': 'lluvia intensa',
        'thunderstorm': 'tormenta',
        'snow': 'nieve',
        'mist': 'neblina'
        // Agregar más traducciones según sea necesario
    };

    return traducciones[condicion.toLowerCase()] || condicion;
}

// Escuchadores de Eventos
function inicializarEventos() {
    window.addEventListener('load', establecerFondoAleatorio);
    
    elementos.inputCiudad.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            obtenerDatosClima(elementos.inputCiudad.value);
            elementos.inputCiudad.value = '';
        }
    });
}

// Inicialización
function inicializar() {
    inicializarEventos();
    obtenerDatosClima(CONFIG_API.ciudadPredeterminada);
}

inicializar();