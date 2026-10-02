function Navbar() {
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
      </div>
    </nav>
  )
}

export default Navbar
