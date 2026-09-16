# PixelQuest Games

Tienda de videojuegos (e-commerce) desarrollada con HTML5, Bootstrap 5.3 y JavaScript vanilla, como proyecto del curso Desarrollo Frontend I.

## Descripción

PixelQuest Games es un sitio de catálogo de videojuegos con carrito de compras, búsqueda de productos y carga dinámica de catálogo desde una API pública y desde un archivo JSON local, construido sin frameworks ni librerías de JavaScript adicionales.

## Funcionalidades implementadas

### Bootstrap 5.3
- Navbar responsiva con menú colapsable
- Carrusel de productos destacados
- Grid de cards responsivas para el catálogo de productos
- Modal de detalle de producto

### JavaScript (DOM, eventos y Fetch API)
- Manipulación del DOM y manejo de eventos (`mouseover`, `click`, `submit`)
- Vista previa del producto al pasar el mouse sobre una card
- Sistema de favoritos
- Carrito de compras funcional: agregar productos, sumar cantidades de un mismo producto, calcular total y cantidad en tiempo real
- Formulario de búsqueda (`submit`) que filtra el catálogo por nombre
- Formulario de newsletter (`submit`) con validación de correo
- Fetch API:
  - Carga de productos desde una API pública (Fake Store API)
  - Carga de productos desde un archivo JSON local (`productos.json`)
  - Manejo de errores con `try/catch` y mensajes amigables en pantalla

## Estructura del proyecto

```
Frontend-I/
├── index.html
├── productos.json
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    └── img/
        ├── logo.png
        ├── producto1.png
        ├── producto2.png
        └── producto3.png
```

## Cómo abrir el proyecto

Este proyecto usa `fetch()` para cargar `productos.json`, por lo que **no funciona abriendo `index.html` directamente con doble clic** (protocolo `file://`) debido a restricciones de seguridad del navegador. Es necesario servirlo desde un servidor local:

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Click derecho sobre `index.html` → **Open with Live Server**.

Alternativa sin VS Code (con Python instalado):

```
python -m http.server 8000
```

y abrir `http://localhost:8000` en el navegador.
