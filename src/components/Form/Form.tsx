import './Form.css'
import { useState, useEffect } from 'react'
import Data from './Data'

const API_URL = "http://localhost:3010/"

function Form () {
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [showData, setShowData] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userInStorageString = window.localStorage.getItem("user")
    const userInStorage = JSON.parse(userInStorageString)
    console.log(userInStorage)
    setUser(userInStorage)
  }, [])

  useEffect(() =>{
    if(email === 'Marco@gmail.com'){
      alert("Easter egg");
    }
  },[email]);

  const loginData = {
    email: "marco@gmail.com",
    password: "asd123"
  }
  
  const handleInputChange = (stateUpdate) => {
    return (event) => {
      stateUpdate(event.target.value)
    }
  }

  const handleOnClick = () => {
    logIn({email, password})
    /*setShowData(!showData)
    
    if(email === loginData.email && password === loginData.password){
        alert("Inicio de sesion Exitoso!!")
    }*/
    //se llama toogle the flag
    //setShowData(!showData)
  }

  const logIn = async ({email, password}: {email:String, password:string}) => {
    
    try{
      const response = await fetch(API_URL + "api/v1/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password}),
      })

        if(response.status === 200){
          const data = await response.json()
          setUser(data)
          window.localStorage.setItem("user", JSON.stringify(data))
        } else {
          alert("Usuario y contraseña incorrecta")
        }

    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <>  {
            user && (
              <section className='dataContainer'>
                {
                    <>
                      <p>Email: {user.user.email} </p>
                      <p>Name: {user.user.name}</p>
                      <p>Id: {user.user.id}</p>
                    </>
                }
                </section>
            )
        }
        <Data email={email} password={password} showData={showData}/>
        <section className="formContainer">
          <span className='inputContainer'>
            <label htmlFor="name">Email:</label>
            <input type="text" id="name" name="name"  value={email}
            onChange={handleInputChange(setEmail)}/>
          </span>
          <span className='inputContainer'>
            <label htmlFor="email">Password:</label>
            <input type="password" id="email" name="email" value={password} 
            onChange={handleInputChange(setPassword)}/>
          </span>
          <button onClick={handleOnClick}>
            {
              showData ? "Ocultar datos" : "Mostrar datos"
            }
          </button>
        </section>
    </>
      
  )
}

export default Form