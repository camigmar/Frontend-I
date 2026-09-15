// ===================================================================
// script.js — PixelQuest Games
// Semana 5: Manipulando el DOM con JavaScript para mejorar la interactividad
// Incluye: manipulación del DOM, eventos (click, mouseover, submit)
// y Fetch API con manejo de promesas y errores.
// ===================================================================

// API pública usada para cargar más juegos dinámicamente (Fake Store API)
const API_PRODUCTOS = "https://fakestoreapi.com/products?limit=3";

// ===================== Vista previa al pasar el mouse (mouseover) =====================
// Muestra el nombre y la descripción del producto sobre el que está el mouse
function mostrarVistaPrevia(nombre, descripcion) {
    const panel = document.getElementById("vistaPrevia");
    panel.innerHTML = `<h4>${nombre}</h4><p class="mb-0">${descripcion}</p>`;
}

// Vuelve el panel a su mensaje inicial cuando el mouse sale de la fila de productos
function limpiarVistaPrevia() {
    const panel = document.getElementById("vistaPrevia");
    panel.innerHTML = '<p class="mb-0">Pasa el mouse sobre un producto para ver más detalles aquí.</p>';
}

// ===================== Favoritos (click) =====================
// Cambia el corazón vacío/lleno y el estilo del botón al hacer click
function alternarFavorito(boton) {
    boton.classList.toggle("activo");
    const esFavorito = boton.classList.contains("activo");
    boton.innerHTML = esFavorito ? "&#9829;" : "&#9825;";
    boton.setAttribute("aria-label", esFavorito ? "Quitar de favoritos" : "Marcar como favorito");
}

// ===================== Delegación de eventos sobre la fila de productos =====================
// Se usa delegación (un solo listener en el contenedor) para que funcione también
// con las tarjetas que se agregan después dinámicamente mediante la Fetch API.
function configurarEventosProductos() {
    const fila = document.getElementById("filaProductos");

    // Evento mouseover: actualiza el panel de vista previa con los datos de la tarjeta
    fila.addEventListener("mouseover", (evento) => {
        const tarjeta = evento.target.closest(".producto");
        if (tarjeta) {
            mostrarVistaPrevia(tarjeta.dataset.nombre, tarjeta.dataset.descripcion);
        }
    });

    // Cuando el mouse sale por completo de la fila (no solo cambia de tarjeta), se limpia el panel
    fila.addEventListener("mouseout", (evento) => {
        if (!fila.contains(evento.relatedTarget)) {
            limpiarVistaPrevia();
        }
    });

    // Evento click: si se hizo click en un botón de favorito, lo alternamos
    fila.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("btn-favorito")) {
            alternarFavorito(evento.target);
        }
    });
}

// ===================== Crear una tarjeta de producto con JavaScript =====================
// Genera una tarjeta con la misma estructura y clases que las que ya existen en el HTML,
// usando createElement/innerHTML, para que se integre visualmente con el resto del catálogo.
function crearTarjetaProducto(producto) {
    const descripcionCorta = producto.description.slice(0, 110) + "...";

    const columna = document.createElement("div");
    columna.className = "col";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card producto h-100";
    tarjeta.dataset.nombre = producto.title;
    tarjeta.dataset.descripcion = descripcionCorta;

    tarjeta.innerHTML = `
        <img src="${producto.image}" class="card-img-top card-img-api" alt="Portada del producto ${producto.title}">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
                <h3 class="card-title h5">${producto.title}</h3>
                <button type="button" class="btn-favorito" aria-label="Marcar como favorito">&#9825;</button>
            </div>
            <p class="card-text">${descripcionCorta}</p>
            <p class="card-text fw-bold text-warning">$${producto.price} USD</p>
        </div>
    `;

    columna.appendChild(tarjeta);
    return columna;
}

// ===================== Fetch API: cargar más juegos (click + promesas) =====================
// Al hacer click en el botón, se piden más productos a una API pública y se agregan al DOM.
async function cargarMasJuegos() {
    const boton = document.getElementById("btnCargarMas");
    const mensaje = document.getElementById("mensajeCarga");
    const fila = document.getElementById("filaProductos");

    boton.disabled = true;
    mensaje.textContent = "Cargando productos...";

    try {
        const respuesta = await fetch(API_PRODUCTOS);

        if (!respuesta.ok) {
            throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        productos.forEach((producto) => {
            fila.appendChild(crearTarjetaProducto(producto));
        });

        mensaje.textContent = `Se agregaron ${productos.length} juegos nuevos desde la tienda.`;
        boton.remove(); // ya se cargaron los productos disponibles, evitamos duplicarlos
    } catch (error) {
        // Manejo de errores: si la API falla o no hay conexión, se avisa al usuario
        mensaje.textContent = "No se pudieron cargar los productos. Intenta nuevamente más tarde.";
        console.error("Error al cargar productos:", error);
        boton.disabled = false;
    }
}

// ===================== Formulario de newsletter (submit) =====================
// Valida el correo ingresado y muestra un mensaje de éxito o error sin recargar la página.
function configurarFormularioNewsletter() {
    const formulario = document.getElementById("formNewsletter");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // evita que el formulario recargue la página

        const campoEmail = document.getElementById("emailNewsletter");
        const mensaje = document.getElementById("mensajeNewsletter");
        const email = campoEmail.value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        mensaje.innerHTML = "";
        const parrafo = document.createElement("p");

        if (emailValido) {
            parrafo.className = "text-success mb-0";
            parrafo.textContent = `¡Listo! Te avisaremos a ${email} sobre nuevos lanzamientos.`;
            formulario.reset();
        } else {
            parrafo.className = "text-danger mb-0";
            parrafo.textContent = "Ingresa un correo válido antes de suscribirte.";
        }

        mensaje.appendChild(parrafo);
    });
}

// ===================== Inicialización =====================
// Esperamos a que el HTML esté completamente cargado antes de buscar los elementos
document.addEventListener("DOMContentLoaded", () => {
    configurarEventosProductos();
    configurarFormularioNewsletter();

    const botonCargarMas = document.getElementById("btnCargarMas");
    botonCargarMas.addEventListener("click", cargarMasJuegos);
});
