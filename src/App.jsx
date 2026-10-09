import { useEffect, useState } from 'react'
import Cart from './components/Cart.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'

function App() {
  // aquí guardo los productos
  const [productos, setProductos] = useState([])
  // true mientras se cargan los productos
  const [cargando, setCargando] = useState(true)
  // mensaje si algo sale mal
  const [error, setError] = useState(null)
  // productos que la persona agregó, cada uno con su cantidad
  const [carrito, setCarrito] = useState([])
  // categoría elegida en el filtro
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')

  // saco las categorías del json sin repetir
  const categorias = [...new Set(productos.map((producto) => producto.category))]

  // si es "Todas" muestro todo, si no solo los de esa categoría
  const productosFiltrados =
    categoriaActiva === 'Todas'
      ? productos
      : productos.filter((producto) => producto.category === categoriaActiva)

  // si ya está le sumo 1, si no lo agrego con cantidad 1
  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const yaEsta = carritoActual.some((item) => item.id === producto.id)

      if (yaEsta) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  // saca el producto del carrito
  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id))
  }

  // suma de todas las cantidades para el número de la navbar
  const cantidadEnCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  // carga el json una sola vez cuando abre la página
  useEffect(() => {
    async function cargarProductos() {
      try {
        // pausa para que parezca una api de verdad
        await new Promise((resolve) => setTimeout(resolve, 800))

        // BASE_URL hace que la ruta sirva también en github pages
        const respuesta = await fetch(`${import.meta.env.BASE_URL}productos.json`)

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`)
        }

        const datos = await respuesta.json()
        setProductos(datos)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.')
      } finally {
        // deja de cargar aunque haya fallado
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  return (
    <>
      {/* el header queda pegado arriba al bajar */}
      <header className="sticky-top">
        <Navbar cantidadEnCarrito={cantidadEnCarrito} />
      </header>

      <main className="container my-5">
        <section id="inicio" className="text-center mb-5">
          <h1 className="mb-3">PixelQuest Games</h1>
          <p className="lead mb-0">Bienvenido a tu tienda de videojuegos favorita.</p>
        </section>

        <section id="catalogo">
          <h2 className="text-center mb-4">Catálogo</h2>

          {/* lo que se ve según cómo va la carga */}
          {cargando && <p className="text-center">Cargando productos...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {!cargando && !error && (
            <>
              <CategoryFilter
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                cambiarCategoria={setCategoriaActiva}
              />
              <ProductList
                productos={productosFiltrados}
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
              />
            </>
          )}
        </section>

        {/* el link "Carrito" de la navbar baja hasta aquí */}
        <section id="carrito" className="mt-5">
          <Cart carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
