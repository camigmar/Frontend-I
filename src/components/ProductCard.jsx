function ProductCard({ producto }) {
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
      </div>
    </div>
  )
}

export default ProductCard
