import './Form.css'
import { useState, useEffect, SetStateAction } from 'react'
import Data from './Data'

const API_URL = "http://localhost:3010/"

function Form () {
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [showData, setShowData] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    //localStorage.clear();
    if(localStorage.getItem("token")) fetchCategory();
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
  
  const handleInputChange = (stateUpdate: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void }) => {
    return (event: { target: { value: any } }) => {
      stateUpdate(event.target.value)
    }
  }

  const handleOnClick = () => {
     
     // Fetch desprotegido
    logIn({email, password})
    


    /*setShowData(!showData)
    if(email === loginData.email && password === loginData.password){
        alert("Inicio de sesion Exitoso!!")
    }
    se llama toogle the flag
    setShowData(!showData)*/

    //fetchCategory()
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
          console.log(data.token);
          window.localStorage.setItem("token", data.token)
          fetchCategory();
        } else {
          alert("Usuario y contraseña incorrecta")
        }

    }catch(error){
      console.log(error)
    }
  }

  const fetchCategory = async () => {
    try{
        const response = await fetch(API_URL + "api/v1/categories", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        const data = await response.json()
        //window.localStorage.setItem("user", JSON.stringify(data))
        console.log(data)
        setCategories(data);
    } catch (error){
      console.log(error)
    }
  }
  
  return (
    <>  {
            categories.length !== 0 && categories.map(categorie => (
              <section>
                <p>Categorie</p>
                <p>{categorie.name}</p>
                <p>{categorie.description}</p>
                <p>{categorie._id}</p>
                <p>User:<br></br>{categorie.user.name}</p>
                <p>{categorie.user.email}</p>
              </section>
              ))
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