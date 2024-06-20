import {Link, useNavigate} from 'react-router-dom'

const Inicio = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    setTimeout(() => {
      alert("Bienvenido al sistema")
      navigate('menu-principal')
    })
  }
  return(
    <section>
      <h1>Inicio</h1>
      <p>Esto es una pagina de inicio</p>
      <Link to="contacto">Contacto</Link>
      <button onClick={() => handleClick()}>Entrar al sistema</button>
    </section>
  )
}

export default Inicio