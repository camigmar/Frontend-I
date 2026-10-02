# PixelQuest Games

Tienda de videojuegos hecha con React, Vite y Bootstrap 5 para el curso Desarrollo Frontend I.

Sitio publicado: https://camigmar.github.io/Frontend-I/

## Qué hace la tienda

- Muestra un catálogo de videojuegos que se carga desde `productos.json`.
- Cada juego tiene imagen, título, descripción y precio.
- Se pueden agregar juegos al carrito, sumar unidades y eliminarlos.
- El carrito muestra la cantidad, el subtotal de cada juego y el total.
- La barra de arriba muestra cuántos productos hay en el carrito y tiene un enlace que baja hasta él.

## Cómo usé React

### useState

- `productos`: la lista de juegos que llega del JSON.
- `cargando`: está en `true` mientras se cargan los productos.
- `error`: guarda un mensaje si la carga falla.
- `carrito`: los juegos agregados, cada uno con su `cantidad`.
- `expandida`: cada tarjeta tiene el suyo para mostrar la descripción completa o recortada.

### useEffect

En `App.jsx` hay un `useEffect` con `[]` que carga `productos.json` una sola vez al abrir la página. Usa `import.meta.env.BASE_URL` para que la ruta funcione también en GitHub Pages. Tiene una pausa de 800 ms para simular una API, revisa `response.ok` y usa `try/catch` por si algo falla.

### Renderizado condicional

- Mientras carga se ve "Cargando productos...".
- Si hay un error se ve el mensaje en rojo.
- Si el JSON viene vacío se ve "No hay productos disponibles.".
- Si el carrito está vacío se ve un aviso en vez de la lista y el total.
- Si un juego ya está en el carrito, su botón se pone verde y dice "✓ En el carrito (cantidad)".
- El botón "Ver más / Ver menos" muestra la descripción completa o recortada a 60 caracteres.

## Estructura de carpetas

```
Frontend-I/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── productos.json
│   └── img/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       ├── Navbar.jsx
│       ├── ProductList.jsx
│       ├── ProductCard.jsx
│       └── Cart.jsx
└── legacy-semana6/
```

- `src/components/`: los componentes de la tienda.
- `public/`: el JSON y las imágenes.
- `legacy-semana6/`: la versión anterior hecha con HTML, Bootstrap y JavaScript (semana 6).

## Cómo ejecutarlo

Se necesita tener Node.js instalado.

```
npm install
npm run dev
```

Después abrir http://localhost:5173/Frontend-I/ en el navegador.

## Cómo publicarlo

```
npm run deploy
```

Este comando hace el build y sube la carpeta `dist` a la rama `gh-pages`. La página queda en https://camigmar.github.io/Frontend-I/
