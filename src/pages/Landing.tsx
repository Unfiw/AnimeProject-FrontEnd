import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../css/styles.css';

const Landing: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Animedot</title>
        <link rel="stylesheet" href="../css/styles.css" />
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
      <body>
        <div className="heroContainer">
          <div className="hero">
            <div className="text-hero">
              <h1>"No importa cuán difícil sea el camino, siempre hay que seguir adelante. Detrás de cada obstáculo hay una oportunidad para crecer.</h1>
              
              <br />
              <cite>Alphonse Elric - FMA Brotherhood</cite>
            </div>
            <div className="heroImg">
              <h1></h1>
            </div>
          </div>
        </div>
      
        <footer>
          <ul>
            <li>Marco Antonio Becerra Díaz</li>
            <li>4°P</li>
            <li>Desarrollo Web 2</li>
            <li>Base de Datos 2</li>
          </ul>
        </footer>
      </body>
    </div>
  );
};

export default Landing;
