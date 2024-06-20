import './App.css'
import {Routes, Route} from 'react-router-dom'
import Inicio from "./pages/Inicio.tsx"
import Contacto from "./pages/Contacto.tsx"
import MenuPrincipal from './pages/MenuPrincipal.tsx'

const jwt = undefined
const isLogged = () => {
  return true;
}

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/contacto" element={<Contacto/>} />
        {
          isLogged() && <Route path="menu-principal" element={<MenuPrincipal/>}/>
        }
        
        </Routes>  
    </main>
  )
}

export default App
