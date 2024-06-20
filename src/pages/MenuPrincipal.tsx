import '../components/Form/Form.css'
import { useState, useEffect, SetStateAction } from 'react'
import Data from '../components/Form/Data'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const API_URL = "http://localhost:3010/"

function MenuPrincipal() {
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [showData, setShowData] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) fetchCategory();
  }, [])

  useEffect(() => {
    if (email === 'Marco@gmail.com') {
      alert("Easter egg");
    }
  }, [email]);

  const handleInputChange = (stateUpdate: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void }) => {
    return (event: { target: { value: any } }) => {
      stateUpdate(event.target.value)
    }
  }

  const handleOnClick = () => {
    logIn({ email, password })
  }

  const logIn = async ({ email, password }: { email: String, password: string }) => {
    try {
      const response = await fetch(API_URL + "api/v1/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.status === 200) {
        const data = await response.json()
        setUser(data)
        console.log(data.token);
        window.localStorage.setItem("token", data.token)
        fetchCategory();
        alert("Bienvenido al sistema")
        navigate('menu-principal')
      } else {
        alert("Usuario y contraseña incorrecta")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await fetch(API_URL + "api/v1/categories", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await response.json()
      console.log(data)
      setCategories(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    
      <header>
      <nav className="nav">
        <ul className="leftList">
          <li className="logo">
            <a href=""><b>ANIMEDOT</b></a>
          </li>
        </ul>
        <ul className="centerList">
          <div className="navButtons">
            <Link to="../Agregar">AGREGAR</Link>
            <Link to="../">INICIO</Link>
            <li><a href="" className="fa-solid"></a></li>
          </div>
        </ul>
      </nav>
    </header>
    
    {
    categories.length !== 0 && categories.map(categorie => (
      <body>

        <div className='cardContainer'>

          <section key={categorie._id} className="card">
              <p >Anime</p>
              <p >{categorie.name}</p>
              <p >{categorie.description}</p>
              <p >{categorie._id}</p>
              
          </section>
        </div>
      </body>
    ))
}


      <Data email={email} password={password} showData={showData} />
     
    </>
  )
}

export default MenuPrincipal