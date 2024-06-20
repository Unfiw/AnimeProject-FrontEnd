import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet-async';

const MenuPrincipal = () => {
  return (
    <div>

    <Helmet>
        <title>Animedot</title>
        <link rel="stylesheet" href="../css/menu.css" />
      </Helmet>
      <header>
        <nav className="nav">
          <ul className="leftList">
            <li className="logo">
              <a href=""><b>ANIMEDOT</b></a>
            </li>
          </ul>
          <ul className="centerList">
            <div className="navButtons">
              <Link to="/">INICIO</Link>
              <Link to="Login">LOGIN</Link>
              <Link to="Registro">REGISTRO</Link>
              <li><a href="" className="fa-solid"></a></li>
            </div>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default MenuPrincipal