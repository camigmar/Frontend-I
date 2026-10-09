function Footer() {
  return (
    // por ahora el id contacto está aquí, en el paso 4 se va al formulario
    <footer id="contacto" className="pie py-4">
      {/* en celular va en columna y en pantalla grande en fila */}
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0 fw-bold">PixelQuest Games</p>
        <a href="mailto:contacto@pixelquestgames.cl">contacto@pixelquestgames.cl</a>
        <p className="mb-0">© 2026 PixelQuest Games</p>
        <a href="#inicio">Volver arriba</a>
      </div>
    </footer>
  )
}

export default Footer
