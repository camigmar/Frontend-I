import ProductCard from './ProductCard.jsx'

function ProductList({ productos, carrito, agregarAlCarrito, eliminarProducto }) {
  // si el json vino vacío aviso en vez de dejar la página en blanco
  if (productos.length === 0) {
    return <p className="text-center">No hay productos disponibles.</p>
  }

  return (
    // grilla propia: caben las columnas que alcancen de 260px o más
    <div className="grilla-productos">
      {productos.map((producto) => {
        // reviso si este juego ya está en el carrito
        const enCarrito = carrito.some((item) => item.id === producto.id)
        // cuántas unidades hay de este juego
        const cantidad = enCarrito ? carrito.find((item) => item.id === producto.id).cantidad : 0

        return (
          <ProductCard
            key={producto.id}
            producto={producto}
            enCarrito={enCarrito}
            cantidad={cantidad}
            agregarAlCarrito={agregarAlCarrito}
            eliminarProducto={eliminarProducto}
          />
        )
      })}
    </div>
  )
}

export default ProductList
