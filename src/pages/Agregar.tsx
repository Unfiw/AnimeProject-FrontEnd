import '../components/Form/Form.css'
import { useState, useEffect, SetStateAction } from 'react'
import Data from '../components/Form/Data'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const API_URL = "http://localhost:3010/"

function Agregar() {
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [studio, setStudio] = useState<string>("")
  const [description, setDescription] = useState<string>("")
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

  const handleInputChange = (stateUpdate: { (value: SetStateAction<string>): void; }) => {
    return (event: { target: { value: any } }) => {
      stateUpdate(event.target.value)
    }
  }

  const handleOnClick = () => {
    logIn({ email, password })
  }

  const logIn = async ({ email, password }: { email: string, password: string }) => {
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
      const response = await fetch(API_URL + "api/v1/animes", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await response.json()
      setCategories(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCategory = { name, studio, description };

    try {
      const response = await fetch(API_URL + "api/v1/animes", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newCategory),
      })

      if (response.status === 201) {
        alert("Anime agregado exitosamente")
        fetchCategory();
      } else {
        alert("Error al agregar la categoría")
      }
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
              <Link to="../menu-principal">MENU</Link>
              <li><a href="" className="fa-solid"></a></li>
            </div>
          </ul>
        </nav>
      </header>

      <body>
        <Data email={email} password={password} showData={showData} />
        <div className="cardContainer">
          <form className='card' onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={name} onChange={handleInputChange(setName)} />
            
            <label htmlFor="studio">Studio:</label>
            <input type="text" id="studio" name="studio" value={studio} onChange={handleInputChange(setStudio)} />
            
            <label htmlFor="description">Descripción:</label>
            <input type="text" id="description" name="description" value={description} onChange={handleInputChange(setDescription)} />
            
            <button type="submit">AGREGAR</button>
          </form>
        </div>
      </body>

      <Data email={email} password={password} showData={showData} />
    </>
  )
}

export default Agregar
