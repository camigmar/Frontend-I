function ProductCard({ producto, agregarAlCarrito }) {
  return (
    // tarjeta de un solo producto
    <div className="card producto h-100">
      <img
        src={`${import.meta.env.BASE_URL}${producto.image}`}
        className="card-img-top"
        alt={`Portada del videojuego ${producto.title}`}
      />
      <div className="card-body">
        <h3 className="card-title h5">{producto.title}</h3>
        <p className="card-text">{producto.description}</p>
        {/* precio siempre con 2 decimales */}
        <p className="card-text precio fw-bold">${producto.price.toFixed(2)} USD</p>
        {/* manda este producto al carrito */}
        <button
          type="button"
          className="btn btn-warning w-100"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard
