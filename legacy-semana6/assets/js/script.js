// ===================================================================
// script.js — PixelQuest Games
// Semana 5: Manipulando el DOM con JavaScript para mejorar la interactividad
// Incluye: manipulación del DOM, eventos (click, mouseover, submit)
// y Fetch API con manejo de promesas y errores.
// Semana 6: modal de detalle de producto, carrito de compras, formulario
// de búsqueda y carga de catálogo desde un archivo JSON local.
// ===================================================================

// API pública usada para cargar más juegos dinámicamente (Fake Store API)
const API_PRODUCTOS = "https://fakestoreapi.com/products?limit=3";

// Mensaje reutilizado por ambas fuentes de datos (API pública y JSON local) cuando falla la carga
const MENSAJE_ERROR_CARGA = "No se pudieron cargar los productos. Intenta nuevamente más tarde.";

// ===================== Estado del carrito (Semana 6) =====================
// Array en memoria: cada elemento es { nombre, precioTexto, precioNumero, cantidad }
const carrito = [];

// Guarda el producto que se está mostrando en el modal, para poder agregarlo al carrito desde ahí
let productoEnModal = null;

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

// ===================== Modal de detalle de producto (Semana 6) =====================
// Lee los data-attributes de la tarjeta clickeada y los inyecta en el modal antes de abrirlo
function mostrarModalDetalle(tarjeta) {
    document.getElementById("modalNombre").textContent = tarjeta.dataset.nombre;
    document.getElementById("modalDescripcion").textContent = tarjeta.dataset.descripcion;
    document.getElementById("modalPrecio").textContent = tarjeta.dataset.precio;

    const imagen = document.getElementById("modalImagen");
    imagen.src = tarjeta.dataset.imagen;
    imagen.alt = `Portada del videojuego ${tarjeta.dataset.nombre}`;

    // Guardamos el producto mostrado para que el botón "Agregar al carrito" del modal sepa cuál agregar
    productoEnModal = { nombre: tarjeta.dataset.nombre, precio: tarjeta.dataset.precio };

    // bootstrap.Modal.getOrCreateInstance reutiliza la instancia si el modal ya fue abierto antes
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalDetalleProducto"));
    modal.show();
}

// ===================== Carrito de compras (Semana 6) =====================
// Convierte un texto de precio como "$49.99 USD" al número 49.99
function extraerPrecioNumerico(precioTexto) {
    return parseFloat(precioTexto.replace(/[^0-9.]/g, ""));
}

// Convierte un número a un texto de precio con el mismo formato usado en todo el sitio: "$49.99 USD"
function formatearPrecio(numero) {
    return `$${numero.toFixed(2)} USD`;
}

// Agrega un producto al carrito; si ya estaba, solo aumenta la cantidad en vez de duplicarlo
function agregarAlCarrito(nombre, precioTexto) {
    const itemExistente = carrito.find((item) => item.nombre === nombre);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precioTexto: precioTexto,
            precioNumero: extraerPrecioNumerico(precioTexto),
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// Reconstruye la lista visual del carrito con createElement/appendChild
function renderizarListaCarrito() {
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = ""; // limpiamos la lista antes de volver a generarla

    if (carrito.length === 0) {
        const itemVacio = document.createElement("li");
        itemVacio.className = "list-group-item";
        itemVacio.textContent = "Tu carrito está vacío.";
        lista.appendChild(itemVacio);
        return;
    }

    carrito.forEach((item) => {
        const subtotal = item.precioNumero * item.cantidad;

        const elementoLista = document.createElement("li");
        elementoLista.className = "list-group-item d-flex justify-content-between align-items-center";

        const textoNombre = document.createElement("span");
        textoNombre.textContent = `${item.nombre} x${item.cantidad}`;

        const textoSubtotal = document.createElement("span");
        textoSubtotal.className = "fw-bold text-warning";
        textoSubtotal.textContent = formatearPrecio(subtotal);

        elementoLista.appendChild(textoNombre);
        elementoLista.appendChild(textoSubtotal);
        lista.appendChild(elementoLista);
    });
}

// Recalcula la cantidad total de productos y el total a pagar, y actualiza el DOM
function recalcularTotalesCarrito() {
    const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    const totalPagar = carrito.reduce((acumulado, item) => acumulado + item.precioNumero * item.cantidad, 0);

    document.getElementById("carritoCantidad").textContent = cantidadTotal;
    document.getElementById("carritoTotal").textContent = formatearPrecio(totalPagar);
    document.getElementById("badgeCarrito").textContent = cantidadTotal;
}

// Punto único que se llama cada vez que el carrito cambia: mantiene la lista y los totales sincronizados
function actualizarCarrito() {
    renderizarListaCarrito();
    recalcularTotalesCarrito();
}

// Configura el botón "Agregar al carrito" del modal de detalle de producto
function configurarCarrito() {
    const botonModal = document.getElementById("modalBtnAgregarCarrito");

    botonModal.addEventListener("click", () => {
        if (productoEnModal) {
            agregarAlCarrito(productoEnModal.nombre, productoEnModal.precio);
        }
    });

    actualizarCarrito(); // pinta el estado inicial ("Tu carrito está vacío")
}

// ===================== Delegación de eventos sobre la fila de productos =====================
// Configura la vista previa (mouseover/mouseout) y los clicks de favoritos, "Ver detalle"
// y "Agregar al carrito". Se usa delegación (un solo listener en el contenedor) para que
// funcione también con las tarjetas que se agregan después dinámicamente mediante la Fetch API.
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

    // Evento click: según el botón presionado, alternamos favorito, abrimos el modal
    // de detalle o agregamos el producto de esa tarjeta al carrito
    fila.addEventListener("click", (evento) => {
        const tarjeta = evento.target.closest(".producto");

        if (evento.target.classList.contains("btn-favorito")) {
            alternarFavorito(evento.target);
        }

        if (evento.target.classList.contains("btn-ver-detalle")) {
            mostrarModalDetalle(tarjeta);
        }

        if (evento.target.classList.contains("btn-agregar-carrito")) {
            agregarAlCarrito(tarjeta.dataset.nombre, tarjeta.dataset.precio);
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
    tarjeta.dataset.descripcion = descripcionCorta; // se usa tanto en la vista previa como en el modal
    tarjeta.dataset.precio = `$${producto.price} USD`;
    tarjeta.dataset.imagen = producto.image;

    tarjeta.innerHTML = `
        <img src="${producto.image}" class="card-img-top card-img-api" alt="Portada del producto ${producto.title}">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
                <h3 class="card-title h5">${producto.title}</h3>
                <button type="button" class="btn-favorito" aria-label="Marcar como favorito">&#9825;</button>
            </div>
            <p class="card-text">${descripcionCorta}</p>
            <p class="card-text fw-bold text-warning">$${producto.price} USD</p>
            <button type="button" class="btn btn-outline-warning btn-sm w-100 btn-ver-detalle">Ver detalle</button>
            <button type="button" class="btn btn-warning btn-sm w-100 mt-2 btn-agregar-carrito">Agregar al carrito</button>
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
        mensaje.textContent = MENSAJE_ERROR_CARGA;
        console.error("Error al cargar productos:", error);
        boton.disabled = false;
    }
}

// ===================== Fetch API: cargar catálogo desde un JSON local (Semana 6) =====================
// Al cargar la página, se piden los productos propios desde productos.json (mismo origen, sin red externa)
// y se agregan al DOM reutilizando crearTarjetaProducto, igual que con la API pública.
async function cargarProductosLocales() {
    const fila = document.getElementById("filaProductos");
    const mensajeError = document.getElementById("mensajeErrorProductos");

    try {
        const respuesta = await fetch("productos.json");

        if (!respuesta.ok) {
            throw new Error(`Error al leer productos.json: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        productos.forEach((producto) => {
            fila.appendChild(crearTarjetaProducto(producto));
        });
    } catch (error) {
        // Si el archivo no existe, el JSON es inválido o hay un error de red, avisamos sin romper la página
        mensajeError.textContent = MENSAJE_ERROR_CARGA;
        mensajeError.classList.remove("d-none");
        console.error("Error al cargar productos locales:", error);
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

// ===================== Formulario de búsqueda (submit) =====================
// Filtra las cards de #filaProductos según el texto ingresado, comparando contra data-nombre.
// Funciona tanto con las cards estáticas como con las agregadas dinámicamente por la Fetch API.
function configurarBusqueda() {
    const formulario = document.getElementById("formBusqueda");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // evita que el formulario recargue la página

        const textoBusqueda = document.getElementById("inputBusqueda").value.trim().toLowerCase();
        const tarjetas = document.querySelectorAll("#filaProductos .producto");
        const mensajeSinResultados = document.getElementById("mensajeSinResultados");
        let hayCoincidencias = false;

        tarjetas.forEach((tarjeta) => {
            // Ocultamos la columna completa (no solo la card) para que el grid se reacomode
            const columna = tarjeta.closest(".col");
            const nombre = tarjeta.dataset.nombre.toLowerCase();

            // Si el campo está vacío, se considera coincidencia y se muestran todos los productos
            const coincide = textoBusqueda === "" || nombre.includes(textoBusqueda);

            columna.classList.toggle("d-none", !coincide);

            if (coincide) {
                hayCoincidencias = true;
            }
        });

        // El mensaje de "sin resultados" solo aparece si no hubo ninguna coincidencia
        mensajeSinResultados.classList.toggle("d-none", hayCoincidencias);
    });
}

// ===================== Inicialización =====================
// Esperamos a que el HTML esté completamente cargado antes de buscar los elementos
document.addEventListener("DOMContentLoaded", () => {
    configurarEventosProductos();
    configurarFormularioNewsletter();
    configurarCarrito();
    configurarBusqueda();
    cargarProductosLocales(); // el catálogo local se completa solo, sin esperar un click

    const botonCargarMas = document.getElementById("btnCargarMas");
    botonCargarMas.addEventListener("click", cargarMasJuegos);
});
