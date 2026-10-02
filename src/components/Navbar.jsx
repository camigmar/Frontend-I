function Navbar({ cantidadEnCarrito }) {
  return (
    // barra de arriba con el logo y el nombre
    <nav className="navbar navbar-dark sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img
            src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Logotipo de PixelQuest Games"
            width="40"
            height="40"
          />
          PixelQuest Games
        </a>

        {/* baja hasta el carrito y muestra cuántos productos hay */}
        <a className="nav-link" href="#carrito">
          Carrito <span className="badge bg-warning text-dark">{cantidadEnCarrito}</span>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
