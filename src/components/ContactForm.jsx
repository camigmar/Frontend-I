import { useRef, useState } from 'react'

// formato simple de correo: algo@algo.algo
const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// revisa los datos y devuelve un mensaje por cada campo malo
function validar(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()
  const email = datos.email.trim()
  const mensaje = datos.mensaje.trim()

  if (!nombre) {
    errores.nombre = 'Escribe tu nombre.'
  } else if (nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
  }

  if (!email) {
    errores.email = 'Escribe tu correo.'
  } else if (!formatoEmail.test(email)) {
    errores.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  }

  if (!mensaje) {
    errores.mensaje = 'Escribe tu mensaje.'
  } else if (mensaje.length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  } else if (mensaje.length > 500) {
    errores.mensaje = 'El mensaje no puede pasar de 500 caracteres.'
  }

  return errores
}

const datosVacios = { nombre: '', email: '', mensaje: '' }

function ContactForm({ correoTienda }) {
  // lo que la persona va escribiendo
  const [datos, setDatos] = useState(datosVacios)
  // un mensaje de error por campo
  const [errores, setErrores] = useState({})
  // true cuando el mensaje se "envió"
  const [enviado, setEnviado] = useState(false)
  // nombre para el mensaje de gracias, porque el form se limpia
  const [nombreEnviado, setNombreEnviado] = useState('')

  // para poder poner el foco en el campo con error
  const campoNombre = useRef(null)
  const campoEmail = useRef(null)
  const campoMensaje = useRef(null)

  // guarda lo que se escribe y borra el error de ese campo
  function cambiarCampo(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    setEnviado(false)
  }

  function enviarFormulario(evento) {
    evento.preventDefault()
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)

    // si hay errores no se envía y el foco va al primer campo malo
    const primerError = ['nombre', 'email', 'mensaje'].find((campo) => nuevosErrores[campo])
    if (primerError) {
      setEnviado(false)
      const campos = { nombre: campoNombre, email: campoEmail, mensaje: campoMensaje }
      campos[primerError].current.focus()
      return
    }

    // no hay backend, así que solo simulo que se envió
    setNombreEnviado(datos.nombre.trim())
    setEnviado(true)
    setDatos(datosVacios)
  }

  return (
    <div className="formulario-contacto">
      <p className="text-center mb-4">También puedes escribirnos a {correoTienda}</p>

      {enviado && (
        <div className="alert alert-success" role="status">
          ¡Gracias, {nombreEnviado}! Tu mensaje fue enviado.
        </div>
      )}

      <form noValidate onSubmit={enviarFormulario}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              ref={campoNombre}
              type="text"
              id="nombre"
              name="nombre"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={datos.nombre}
              onChange={cambiarCampo}
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby="error-nombre"
            />
            <div id="error-nombre" className="invalid-feedback">{errores.nombre}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              ref={campoEmail}
              type="email"
              id="email"
              name="email"
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              value={datos.email}
              onChange={cambiarCampo}
              aria-invalid={Boolean(errores.email)}
              aria-describedby="error-email"
            />
            <div id="error-email" className="invalid-feedback">{errores.email}</div>
          </div>

          <div className="col-12">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea
              ref={campoMensaje}
              id="mensaje"
              name="mensaje"
              rows="5"
              className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
              value={datos.mensaje}
              onChange={cambiarCampo}
              aria-invalid={Boolean(errores.mensaje)}
              aria-describedby="error-mensaje contador-mensaje"
            />
            <div id="error-mensaje" className="invalid-feedback">{errores.mensaje}</div>
            {/* cuántas letras lleva el mensaje */}
            <div id="contador-mensaje" className="form-text text-end contador">
              {datos.mensaje.length}/500
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-warning">Enviar mensaje</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
