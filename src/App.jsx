import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'

function App() {
  // aquí guardo los productos
  const [productos, setProductos] = useState([])
  // true mientras se cargan los productos
  const [cargando, setCargando] = useState(true)
  // mensaje si algo sale mal
  const [error, setError] = useState(null)

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
      <Navbar />

      <main className="container my-5">
        <h1 className="text-center mb-4">PixelQuest Games</h1>

        {/* lo que se ve según cómo va la carga */}
        {cargando && <p className="text-center">Cargando productos...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!cargando && !error && <ProductList productos={productos} />}
      </main>
    </>
  )
}

export default App
