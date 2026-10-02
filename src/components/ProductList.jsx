import ProductCard from './ProductCard.jsx'

function ProductList({ productos }) {
  return (
    // 1 columna en celular, 2 en tablet y 3 en pantalla grande
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
          <ProductCard producto={producto} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
