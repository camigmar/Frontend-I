function CategoryFilter({ categorias, categoriaActiva, cambiarCategoria }) {
  // "Todas" va primero y después cada categoría
  const opciones = ['Todas', ...categorias]

  return (
    <nav aria-label="Filtrar por categoría" className="mb-4">
      {/* los botones bajan a otra fila si no caben */}
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {opciones.map((categoria) => {
          const activa = categoria === categoriaActiva

          return (
            <button
              key={categoria}
              type="button"
              className={`btn ${activa ? 'btn-warning' : 'btn-outline-warning'}`}
              aria-pressed={activa}
              onClick={() => cambiarCategoria(categoria)}
            >
              {categoria}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default CategoryFilter
