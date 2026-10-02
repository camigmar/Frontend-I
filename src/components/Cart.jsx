function Cart({ carrito, eliminarDelCarrito }) {
  // suma de precio x cantidad de todo el carrito
  const total = carrito.reduce((suma, item) => suma + item.price * item.cantidad, 0)

  return (
    <div className="carrito">
      <h2 className="text-center mb-4">Tu carrito de compras</h2>

      <ul className="list-group mb-3">
        {/* una fila por producto */}
        {carrito.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center gap-3"
          >
            <span>
              {item.title} x{item.cantidad}
            </span>
            <span className="ms-auto precio fw-bold">
              ${(item.price * item.cantidad).toFixed(2)} USD
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => eliminarDelCarrito(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <p className="text-end fs-5">
        Total: <span className="precio fw-bold">${total.toFixed(2)} USD</span>
      </p>
    </div>
  )
}

export default Cart
