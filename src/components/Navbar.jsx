import { useState } from 'react'

function Navbar({ cantidadEnCarrito }) {
  // true cuando el menú del celular está abierto
  const [menuAbierto, setMenuAbierto] = useState(false)

  // cierra el menú al elegir un enlace
  function cerrarMenu() {
    setMenuAbierto(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio" onClick={cerrarMenu}>
          <img
            src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Logotipo de PixelQuest Games"
            width="40"
            height="40"
          />
          PixelQuest Games
        </a>

        {/* botón hamburguesa que abre y cierra el menú en celular */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menuPrincipal"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* la clase show es la que hace que se vea el menú */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#inicio" onClick={cerrarMenu}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#catalogo" onClick={cerrarMenu}>Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#carrito" onClick={cerrarMenu}>
                Carrito <span className="badge bg-warning text-dark">{cantidadEnCarrito}</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto" onClick={cerrarMenu}>Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
