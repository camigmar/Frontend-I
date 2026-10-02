import { useEffect, useState } from 'react'

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
    <div className="container my-5 text-center">
      <h1>PixelQuest Games</h1>

      {/* lo que se ve según cómo va la carga */}
      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!cargando && !error && (
        <ul className="list-unstyled">
          {/* una línea por cada producto */}
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.title} - ${producto.price} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
