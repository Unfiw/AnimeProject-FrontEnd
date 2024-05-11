import './Form.css'
import { useState, useEffect } from 'react'
import Data from './Data'

function Form () {
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [showData, setShowData] = useState<boolean>(false)

  useEffect(() =>{
    if(email === 'Marco@gmail.com'){
      alert("Easter egg");
    }
  },[email]);

  const loginData = {
    email: "marco@gmail.com",
    password: "12345"
  }
  
  const handleInputChange = (stateUpdate) => {
    return (event) => {
      stateUpdate(event.target.value)
    }
  }

  const handleOnClick = () => {
    setShowData(!showData)
    
    if(email === loginData.email && password === loginData.password){
        alert("Inicio de sesion Exitoso!!")
    }
    //se llama toogle the flag
    setShowData(!showData)
  }
  
  return (
    <>
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