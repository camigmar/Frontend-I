# PixelQuest Games

Tienda de videojuegos en línea hecha con React, Vite y Bootstrap 5. Muestra un catálogo de juegos, permite filtrarlos por categoría, armar un carrito de compras, agregar o eliminar juegos del catálogo y enviar un mensaje de contacto.

- **Autora:** Camila González
- **Curso:** Desarrollo Frontend I (PFY2201), Duoc UC
- **Evaluación Final Transversal**

## Enlaces

- Repositorio: https://github.com/camigmar/Frontend-I
- Sitio publicado: https://camigmar.github.io/Frontend-I/
- Video de presentación: entregado como archivo .mp4 junto con esta entrega en la plataforma de la asignatura.

## Tecnologías

- HTML5 (estructura semántica: `header`, `nav`, `main`, `section`, `footer`)
- CSS3 propio con CSS Grid y Flexbox
- JavaScript
- Bootstrap 5
- React + Vite

## Funcionalidades

- Catálogo de 12 juegos que se carga desde `public/productos.json`.
- Tarjetas con imagen, nombre, precio y descripción (con "Ver más / Ver menos").
- Filtro por categoría (Aventura, Acción, RPG, Estrategia y las que se agreguen).
- Carrito con cantidades, subtotal por juego, total y contador en la barra de navegación.
- Formulario de contacto con validación.
- Formulario para agregar juegos y botón para eliminarlos del catálogo (con confirmación).
- Barra de navegación responsive con menú hamburguesa en pantallas chicas.

## Cómo cumple cada requisito

| Requisito | Dónde está |
|---|---|
| Estructura HTML semántica | `src/App.jsx` (`header`, `main` con 5 `section`: inicio, catálogo, agregar, carrito y contacto), `src/components/Footer.jsx` (`footer`), `src/components/Navbar.jsx` (`nav`) |
| CSS propio con Grid | `src/index.css` → `.grilla-productos`, usada en `src/components/ProductList.jsx` |
| CSS propio con Flexbox | `src/index.css` → `.filtro-categorias` (`CategoryFilter.jsx`), `.pie-pagina` (`Footer.jsx`), `.fila-carrito` (`Cart.jsx`) |
| Diseño responsive | `src/index.css` (Grid `auto-fill`, media query del footer), navbar `navbar-expand-lg` en `src/components/Navbar.jsx` |
| Bootstrap 5 | importado en `src/main.jsx`; navbar, tarjetas, botones, `list-group`, formularios y alertas en `src/components/` |
| Componentes de React | `src/components/` (8 componentes) y `src/App.jsx` |
| Estado y props | `src/App.jsx` y los componentes (ver "Conceptos de React usados") |
| Carga de datos (Fetch + JSON) | `useEffect` en `src/App.jsx` lee `public/productos.json` |
| Manejo de errores y carga | `src/App.jsx`: mensajes "Cargando productos..." y de error |
| Eventos | `onClick` en tarjetas, filtro, carrito y navbar; `onSubmit` y `onChange` en `ContactForm.jsx` y `AddGameForm.jsx` |
| Validación de formularios | `src/components/ContactForm.jsx` y `src/components/AddGameForm.jsx` (función `validar`) |
| Accesibilidad | `aria-label`, `aria-expanded`, `aria-pressed`, `aria-invalid`, `aria-describedby`, `role="status"`, `:focus-visible` y `prefers-reduced-motion` en `src/index.css` |
| Publicación en GitHub Pages | `vite.config.js` (`base: '/Frontend-I/'`) y scripts `predeploy` / `deploy` en `package.json` |

## Estructura del proyecto

```
Frontend-I/
├── index.html
├── package.json
├── vite.config.js
├── .oxlintrc.json
├── public/
│   ├── favicon.svg
│   ├── productos.json
│   └── img/
│       ├── logo.png
│       ├── juego101.svg ... juego112.svg
│       └── sin-imagen.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── CategoryFilter.jsx
│       ├── ProductList.jsx
│       ├── ProductCard.jsx
│       ├── Cart.jsx
│       ├── ContactForm.jsx
│       └── AddGameForm.jsx
└── legacy-semana6/
    ├── index.html
    ├── productos.json
    └── assets/ (css, js, img)
```

`legacy-semana6/` es la versión anterior del sitio (HTML, Bootstrap y JavaScript, semana 6). Se conserva solo como referencia y no forma parte de la app en React.

## Conceptos de React usados

### useState

| Componente | Estados |
|---|---|
| `App.jsx` | `productos`, `cargando`, `error`, `carrito`, `categoriaActiva` |
| `Navbar.jsx` | `menuAbierto` (abre y cierra el menú del celular) |
| `ProductCard.jsx` | `expandida` (descripción completa o recortada) y `confirmando` (eliminar en dos pasos) |
| `ContactForm.jsx` | `datos`, `errores`, `enviado`, `nombreEnviado` |
| `AddGameForm.jsx` | `datos`, `errores`, `agregado` |

Los formularios también usan `useRef` para poner el foco en el primer campo con error.

### useEffect

En `App.jsx`, un `useEffect` con `[]` carga `productos.json` una sola vez al abrir la página. Usa `import.meta.env.BASE_URL` para que la ruta funcione en GitHub Pages, tiene una pausa de 800 ms para simular una API, revisa `response.ok` y usa `try/catch/finally`.

### Props

| De | A | Props |
|---|---|---|
| `App` | `Navbar` | `cantidadEnCarrito` |
| `App` | `CategoryFilter` | `categorias`, `categoriaActiva`, `cambiarCategoria` |
| `App` | `ProductList` | `productos` (ya filtrados), `carrito`, `agregarAlCarrito`, `eliminarProducto` |
| `ProductList` | `ProductCard` | `producto`, `enCarrito`, `cantidad`, `agregarAlCarrito`, `eliminarProducto` |
| `App` | `Cart` | `carrito`, `eliminarDelCarrito` |
| `App` | `AddGameForm` | `categorias`, `titulosExistentes`, `agregarProducto` |
| `App` | `ContactForm` | `correoTienda` |

Las categorías y la lista filtrada se calculan en `App.jsx` a partir de `productos`; no están escritas a mano.

### Renderizado condicional

- "Cargando productos..." mientras carga y mensaje de error si falla.
- "No hay productos disponibles." si la lista viene vacía (`ProductList.jsx`).
- Mensaje de carrito vacío o lista con total (`Cart.jsx`).
- Botón verde "✓ En el carrito (cantidad)" si el juego ya está en el carrito.
- "Ver más / Ver menos" en la descripción.
- "¿Seguro? Confirmar" y "Cancelar" al eliminar un juego.
- Alertas de éxito en los dos formularios y menú abierto o cerrado en la navbar.

### Formularios controlados

`ContactForm.jsx` y `AddGameForm.jsx` guardan cada campo en el estado `datos`, validan al enviar con `<form noValidate>` y `preventDefault`, muestran el error debajo de cada campo (`is-invalid` + `invalid-feedback`) y lo borran cuando la persona vuelve a escribir en ese campo.

## Reglas de validación

### Formulario de contacto (`ContactForm.jsx`)

| Campo | Regla |
|---|---|
| Nombre | Obligatorio, mínimo 3 caracteres sin contar espacios de los extremos |
| Correo | Obligatorio y con formato válido (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) |
| Mensaje | Obligatorio, entre 10 y 500 caracteres, con contador "N/500" |

Si todo está bien, muestra "¡Gracias, [nombre]! Tu mensaje fue enviado." y limpia el formulario.

### Formulario para agregar juego (`AddGameForm.jsx`)

| Campo | Regla |
|---|---|
| Título | Obligatorio, mínimo 3 caracteres y no puede repetir un título que ya existe (sin importar mayúsculas) |
| Precio (USD) | Obligatorio, número mayor que 0 y menor que 1000 |
| Categoría | Obligatoria; sugiere las categorías existentes y permite escribir una nueva |
| Descripción | Obligatoria, mínimo 10 caracteres |

El juego nuevo recibe como id el mayor id actual + 1 y la portada `img/sin-imagen.svg`. Al eliminar un juego, también sale del carrito, y si su categoría queda vacía el filtro vuelve a "Todas".

## Instalación y uso

Requisito: tener Node.js instalado.

```
git clone https://github.com/camigmar/Frontend-I.git
cd Frontend-I
npm install
npm run dev
```

Después abrir http://localhost:5173/Frontend-I/ en el navegador.

Otros comandos:

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run lint` | Revisa el código con oxlint |
| `npm run deploy` | Hace el build y publica `dist/` en la rama `gh-pages` |

## Pruebas de compatibilidad

Fecha: 11 de octubre de 2026. Se probó con Chrome 154 y Edge 155 en modo headless, sobre `npm run dev`, en cuatro tamaños de pantalla.

En cada combinación se revisó: que no haya scroll horizontal, el número de columnas de la grilla, el menú, el filtro, agregar al carrito, el formulario de contacto (envío vacío y envío válido), agregar y eliminar un juego, y que la consola no muestre errores.

| Navegador | 375x667 (celular) | 768x1024 (tablet) | 1200x800 (laptop) | 1920x1080 (monitor) |
|---|---|---|---|---|
| Chrome 154 | ✅ 1 columna, menú hamburguesa | ✅ 2 columnas, menú hamburguesa | ✅ 4 columnas, enlaces en una fila | ✅ 4 columnas, enlaces en una fila |
| Edge 155 | ✅ 1 columna, menú hamburguesa | ✅ 2 columnas, menú hamburguesa | ✅ 4 columnas, enlaces en una fila | ✅ 4 columnas, enlaces en una fila |

✅ = todas las pruebas pasaron y la consola no mostró errores.

**No se probó:** Firefox (no está instalado en el equipo de pruebas), Safari ni dispositivos físicos. Los tamaños de celular y tablet se simularon cambiando el tamaño de la ventana del navegador.

## Limitaciones conocidas

- Los juegos agregados o eliminados y el contenido del carrito no se guardan: al recargar la página vuelve el catálogo original y el carrito vacío.
- El envío del formulario de contacto es simulado; no hay backend que reciba el mensaje.
- Las portadas de los juegos son ilustraciones SVG generadas (degradado con el nombre y la categoría), no imágenes reales de videojuegos.
