import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Data from '../components/Form/Data';
import '../css/Login.css';

const API_URL = "http://localhost:3010/";

const LogIn: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) fetchCategory();
  }, []);

  useEffect(() => {
    if (email === 'Marco@gmail.com') {
      alert("Easter egg");
    }
  }, [email]);

  const handleInputChange = (stateUpdate: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      stateUpdate(event.target.value);
    };
  };

  const handleOnClick = () => {
    logIn({ email, password });
  };

  const logIn = async ({ email, password }: { email: string, password: string }) => {
    try {
      const response = await fetch(API_URL + "api/v1/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        console.log(data.token);
        window.localStorage.setItem("token", data.token);
        fetchCategory();
        alert("Bienvenido al sistema");
        navigate('../menu-principal');
      } else {
        alert("Usuario y contraseña incorrecta");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(API_URL + "api/v1/categories", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Inicio</title>
      
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
              <li><a href="" className="fa-solid"></a></li>
            </div>
          </ul>
        </nav>
      </header>
     
      <body>

      <Data email={email} password={password} showData={showData} />
      
     

            <div className="cardContainer">
              <div className='card'>
                <label htmlFor="name">Email:</label>
                <input type="text" id="name" name="name" value={email}
                  onChange={handleInputChange(setEmail)} />
              
            
                <label htmlFor="email">Password:</label>
                <input type="password" id="email" name="email" value={password}
                  onChange={handleInputChange(setPassword)} />
              <button onClick={handleOnClick}>
                {
                  showData ? "Ingresar" : "Ingresar"
                }
              </button>
                </div>
            </div>
      </body>
         
    </>
  );
};

export default LogIn;
