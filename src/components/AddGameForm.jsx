import { useRef, useState } from 'react'

// revisa los datos y devuelve un mensaje por cada campo malo
function validar(datos, titulosExistentes) {
  const errores = {}
  const titulo = datos.titulo.trim()
  const precio = datos.precio.trim()
  const categoria = datos.categoria.trim()
  const descripcion = datos.descripcion.trim()

  // comparo en minúsculas para que "sky fortress" cuente como repetido
  const repetido = titulosExistentes.some((existente) => existente.toLowerCase() === titulo.toLowerCase())

  if (!titulo) {
    errores.titulo = 'Escribe el título del juego.'
  } else if (titulo.length < 3) {
    errores.titulo = 'El título debe tener al menos 3 caracteres.'
  } else if (repetido) {
    errores.titulo = 'Ya hay un juego con ese título.'
  }

  if (!precio) {
    errores.precio = 'Escribe el precio.'
  } else if (Number.isNaN(Number(precio)) || Number(precio) <= 0 || Number(precio) >= 1000) {
    errores.precio = 'El precio debe ser un número mayor que 0 y menor que 1000.'
  }

  if (!categoria) {
    errores.categoria = 'Escribe o elige una categoría.'
  }

  if (!descripcion) {
    errores.descripcion = 'Escribe una descripción.'
  } else if (descripcion.length < 10) {
    errores.descripcion = 'La descripción debe tener al menos 10 caracteres.'
  }

  return errores
}

const datosVacios = { titulo: '', precio: '', categoria: '', descripcion: '' }

function AddGameForm({ categorias, titulosExistentes, agregarProducto }) {
  // lo que se va escribiendo
  const [datos, setDatos] = useState(datosVacios)
  // un mensaje de error por campo
  const [errores, setErrores] = useState({})
  // título del último juego agregado, para la alerta
  const [agregado, setAgregado] = useState('')

  // para poner el foco en el primer campo con error
  const campoTitulo = useRef(null)
  const campoPrecio = useRef(null)
  const campoCategoria = useRef(null)
  const campoDescripcion = useRef(null)

  // guarda lo que se escribe y borra el error de ese campo
  function cambiarCampo(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    setAgregado('')
  }

  function enviarFormulario(evento) {
    evento.preventDefault()
    const nuevosErrores = validar(datos, titulosExistentes)
    setErrores(nuevosErrores)

    // si hay errores no se agrega y el foco va al primer campo malo
    const primerError = ['titulo', 'precio', 'categoria', 'descripcion'].find((campo) => nuevosErrores[campo])
    if (primerError) {
      setAgregado('')
      const campos = { titulo: campoTitulo, precio: campoPrecio, categoria: campoCategoria, descripcion: campoDescripcion }
      campos[primerError].current.focus()
      return
    }

    const titulo = datos.titulo.trim()
    agregarProducto({
      title: titulo,
      price: Number(datos.precio),
      category: datos.categoria.trim(),
      description: datos.descripcion.trim(),
      image: 'img/sin-imagen.svg',
    })
    setAgregado(titulo)
    setDatos(datosVacios)
  }

  // clases y aria iguales para todos los campos
  function propsDeCampo(campo) {
    return {
      id: `${campo}-juego`,
      name: campo,
      className: `form-control ${errores[campo] ? 'is-invalid' : ''}`,
      value: datos[campo],
      onChange: cambiarCampo,
      'aria-invalid': Boolean(errores[campo]),
      'aria-describedby': `error-${campo}-juego`,
    }
  }

  return (
    <div className="formulario-agregar">
      {agregado && (
        <div className="alert alert-success" role="status">
          Se agregó «{agregado}» al catálogo.
        </div>
      )}

      <form noValidate onSubmit={enviarFormulario}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="titulo-juego" className="form-label">Título</label>
            <input ref={campoTitulo} type="text" {...propsDeCampo('titulo')} />
            <div id="error-titulo-juego" className="invalid-feedback">{errores.titulo}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="precio-juego" className="form-label">Precio (USD)</label>
            <input ref={campoPrecio} type="number" step="0.01" min="0" {...propsDeCampo('precio')} />
            <div id="error-precio-juego" className="invalid-feedback">{errores.precio}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="categoria-juego" className="form-label">Categoría</label>
            {/* sugiere las categorías que ya hay pero deja escribir una nueva */}
            <input ref={campoCategoria} type="text" list="lista-categorias" {...propsDeCampo('categoria')} />
            <datalist id="lista-categorias">
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria} />
              ))}
            </datalist>
            <div id="error-categoria-juego" className="invalid-feedback">{errores.categoria}</div>
          </div>

          <div className="col-12">
            <label htmlFor="descripcion-juego" className="form-label">Descripción</label>
            <textarea ref={campoDescripcion} rows="3" {...propsDeCampo('descripcion')} />
            <div id="error-descripcion-juego" className="invalid-feedback">{errores.descripcion}</div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-warning">Agregar videojuego</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddGameForm
