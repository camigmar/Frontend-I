import { useState } from 'react'

function ProductCard({ producto, enCarrito, cantidad, agregarAlCarrito, eliminarProducto }) {
  // true cuando se ve la descripción completa
  const [expandida, setExpandida] = useState(false)
  // true después del primer clic en eliminar
  const [confirmando, setConfirmando] = useState(false)

  // primer clic pregunta, segundo clic elimina
  function clicEliminar() {
    if (confirmando) {
      eliminarProducto(producto.id)
    } else {
      setConfirmando(true)
    }
  }

  // solo recorto si la descripción es más larga que 60 letras
  const esLarga = producto.description.length > 60
  const descripcion =
    expandida || !esLarga ? producto.description : `${producto.description.slice(0, 60)}...`

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
        <p className="card-text mb-1">{descripcion}</p>
        {esLarga && (
          <button
            type="button"
            className="btn-ver-mas mb-3"
            onClick={() => setExpandida(!expandida)}
          >
            {expandida ? 'Ver menos' : 'Ver más'}
          </button>
        )}
        {/* precio siempre con 2 decimales */}
        <p className="card-text precio fw-bold">${producto.price.toFixed(2)} USD</p>
        {/* verde si ya está en el carrito, igual se puede seguir agregando */}
        <button
          type="button"
          className={`btn w-100 ${enCarrito ? 'btn-success' : 'btn-warning'}`}
          onClick={() => agregarAlCarrito(producto)}
        >
          {enCarrito ? `✓ En el carrito (${cantidad})` : 'Agregar al carrito'}
        </button>

        {/* eliminar en dos pasos para no borrar sin querer */}
        <div className="d-flex gap-2 mt-2">
          <button
            type="button"
            className={`btn btn-sm flex-fill ${confirmando ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={clicEliminar}
          >
            {confirmando ? '¿Seguro? Confirmar' : 'Eliminar del catálogo'}
          </button>
          {confirmando && (
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={() => setConfirmando(false)}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
