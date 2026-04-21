// ==========================================
// RELOJ CON FECHA Y HORA (Requerimiento 1)
// ==========================================

function actualizarReloj() {
    const ahora = new Date();
    
    // Extraer fecha
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const diaSemana = dias[ahora.getDay()];
    const dia = ahora.getDate();
    const mes = meses[ahora.getMonth()];
    const año = ahora.getFullYear();
    
    // Extraer hora
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    
    // Agregar cero a la izquierda
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    
    // Formato: "Lunes, 12 de Abril de 2026 - 14:35:08"
    const fechaString = `${diaSemana}, ${dia} de ${mes} de ${año}`;
    const tiempoString = `${horas}:${minutos}:${segundos}`;
    
    document.getElementById('reloj').textContent = `${fechaString} - ${tiempoString}`;
}

// Iniciar reloj inmediatamente y actualizar cada segundo
actualizarReloj();
setInterval(actualizarReloj, 1000);


// ==========================================
// DATOS INICIALES DE ARTÍCULOS
// ==========================================

const articulosIniciales = {
    inicio: [
        {
            titulo: "Recinstruccion del Liceo Bicentenario Maritimo",
            categoria: "Educacion",
            descripcion: "El Ministerio de Educación invertió $1.037 millones en la conservación del Liceo Bicentenario Marítimo de Valparaíso. La comunidad educativa celebra la reapertura de espacios tras años de deterioro.",
            fuente: "soychile.cl"
        },
        {
            titulo: "Alerta Roja por Incendio en Santo Domingo",
            categoria: "Emergencias",
            descripcion: "Senapred activó Alerta Roja por incendio forestal en Santo Domingo que afectó al menos 200 hectáreas. Se solicitó evacuación de los sectores San Guillermo, Media Luna de San Enrique y Horizonte del Mar.",
            fuente: "soychile.cl"
        },
        {
            titulo: "Exportaciones Regionales Baten Récord",
            categoria: "Economia Regional",
            descripcion: "La Región de Valparaíso cerró 2024 con exportaciones por US$ 2.233 millones, un aumento del 12,6% respecto al año anterior. Los principales destinos fueron Estados Unidos, China y Reino Unido.",
            fuente: "ProChile"
        }
    ],
    deportes: [
        {
            titulo: "Everton vs Limache en Sausalito",
            categoria: "Fútbol Profesional",
            descripcion: "Everton de Viña del Mar recibió a Deportes Limache en el Estadio Sausalito por la Copa de la Liga. El encuentro marcó el retorno de las grandes jornadas futbolísticas a la Ciudad Jardín tras la tragedia de febrero 2024.",
            fuente: ""
        },
        {
            titulo: "Los Cóndores Jugarán en Sausalito",
            categoria: "Rugby Internacional",
            descripcion: "La selección chilena de rugby 'Los Cóndores' ejercerá su localía en el Estadio Sausalito de Viña del Mar durante julio, enfrentándose a Hong Kong como parte de su preparación internacional.",
            fuente: ""
        },
        {
            titulo: "Itaú Medio Maratón 2026",
            categoria: "Running",
            descripcion: "Viña del Mar se prepara para el Itaú Medio Maratón 2026, que reunirá a miles de corredores en un circuito costero que destacará la belleza de la Ciudad Jardín y su reactivación turística.",
            fuente: ""
        }
    ],
    negocios: [
        {
            titulo: "Subsidios Sercotec para Mipymes Afectadas",
            categoria: "Reconstrucción Económica",
            descripcion: "Más de 100 Mipymes afectadas por los incendios de febrero 2024 firmaron contratos con Sercotec para recibir subsidios de hasta $10 millones por empresa.",
            fuente: "SERCOTEC"
        },
        {
            titulo: "Valparaíso Industria Circular",
            categoria: "Economía Sustentable",
            descripcion: "Un estudio reveló que se podrían generar más de 200.000 oportunidades de negocio aprovechando los residuos de empresas en la región.",
            fuente: "plataforma-industria circular"
        },
        {
            titulo: "Empresas Audiovisuales en Cannes",
            categoria: "Economía Creativa",
            descripcion: "Por primera vez, tres empresas audiovisuales de la Región de Valparaíso participaron en el Marché Du Film de Cannes.",
            fuente: "EMOL"
        }
    ]
};


// ==========================================
// FUNCIONES PARA ARTÍCULOS DINÁMICOS (Requerimiento 2 y 4)
// ==========================================

// Función para crear el HTML de un artículo
function crearArticuloHTML(articulo) {
    const fuenteHTML = articulo.fuente ? `<h4>Fuente: ${articulo.fuente}</h4>` : '';
    
    return `
        <article>
            <h3>${articulo.titulo}</h3>
            <p>${articulo.categoria}</p>
            <div class="noticia">
                <p>${articulo.descripcion}</p>
                ${fuenteHTML}
            </div>
        </article>
    `;
}

// Función para cargar artículos en una sección
function cargarArticulos(seccion) {
    const grid = document.getElementById(`grid-${seccion}`);
    const contador = document.getElementById(`contador-${seccion}`);
    
    // Limpiar contenido actual
    grid.innerHTML = '';
    
    // Obtener artículos de la sección
    const articulos = articulosIniciales[seccion] || [];
    
    // Generar HTML para cada artículo
    articulos.forEach(articulo => {
        grid.innerHTML += crearArticuloHTML(articulo);
    });
    
    // Actualizar contador (Requerimiento 4)
    contador.textContent = articulos.length;
}

// Función para agregar nuevo artículo
function agregarArticulo(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const seccion = document.getElementById('seccionArticulo').value;
    const titulo = document.getElementById('tituloArticulo').value;
    const categoria = document.getElementById('categoriaArticulo').value;
    const descripcion = document.getElementById('descripcionArticulo').value;
    const fuente = document.getElementById('fuenteArticulo').value;
    
    // Crear objeto artículo
    const nuevoArticulo = {
        titulo: titulo,
        categoria: categoria,
        descripcion: descripcion,
        fuente: fuente
    };
    
    // Agregar al arreglo correspondiente
    articulosIniciales[seccion].push(nuevoArticulo);
    
    // Recargar la sección
    cargarArticulos(seccion);
    
    // Limpiar formulario y ocultar
    document.getElementById('formularioArticulo').reset();
    document.getElementById('formularioArticulo').classList.add('oculto');
    document.getElementById('btnMostrarFormArticulo').textContent = '➕ Agregar Nuevo Artículo';
    
    // Mostrar confirmación
    alert('¡Artículo publicado exitosamente en la sección ' + seccion.toUpperCase() + '!');
}

// Toggle para mostrar/ocultar formulario de artículos
document.getElementById('btnMostrarFormArticulo').addEventListener('click', function() {
    const formulario = document.getElementById('formularioArticulo');
    formulario.classList.toggle('oculto');
    
    if (formulario.classList.contains('oculto')) {
        this.textContent = '➕ Agregar Nuevo Artículo';
    } else {
        this.textContent = '✖ Cerrar Formulario';
    }
});

// Event listener para envío de formulario de artículos
document.getElementById('formularioArticulo').addEventListener('submit', agregarArticulo);


// ==========================================
// FORMULARIO DE CONTACTO (Requerimiento 3)
// ==========================================

// Toggle para mostrar/ocultar formulario de contacto
document.getElementById('btnMostrarContacto').addEventListener('click', function() {
    const formulario = document.getElementById('formularioContacto');
    formulario.classList.toggle('oculto');
    
    if (formulario.classList.contains('oculto')) {
        this.textContent = '📧 Escribir Mensaje';
    } else {
        this.textContent = '✖ Cerrar Mensaje';
    }
});

// Manejo del envío de contacto
document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreContacto').value;
    const mensaje = document.getElementById('mensajeContacto').value;
    
    // Mostrar confirmación
    document.getElementById('mensajeConfirmacion').textContent = 
        `¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto.`;
    
    // Limpiar formulario
    this.reset();
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        document.getElementById('formularioContacto').classList.add('oculto');
        document.getElementById('btnMostrarContacto').textContent = '📧 Escribir Mensaje';
        document.getElementById('mensajeConfirmacion').textContent = '';
    }, 3000);
});


// ==========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar artículos en todas las secciones
    cargarArticulos('inicio');
    cargarArticulos('deportes');
    cargarArticulos('negocios');
});
