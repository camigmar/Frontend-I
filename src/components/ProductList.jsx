import ProductCard from './ProductCard.jsx'

function ProductList({ productos, carrito, agregarAlCarrito }) {
  // si el json vino vacío aviso en vez de dejar la página en blanco
  if (productos.length === 0) {
    return <p className="text-center">No hay productos disponibles.</p>
  }

  return (
    // 1 columna en celular, 2 en tablet y 3 en pantalla grande
    <div className="row g-4">
      {productos.map((producto) => {
        // reviso si este juego ya está en el carrito
        const enCarrito = carrito.some((item) => item.id === producto.id)
        // cuántas unidades hay de este juego
        const cantidad = enCarrito ? carrito.find((item) => item.id === producto.id).cantidad : 0

        return (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <ProductCard
              producto={producto}
              enCarrito={enCarrito}
              cantidad={cantidad}
              agregarAlCarrito={agregarAlCarrito}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProductList
