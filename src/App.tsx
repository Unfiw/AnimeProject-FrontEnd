import './App.css'
import {Routes, Route} from 'react-router-dom'
import Inicio from "./pages/Inicio.tsx"
import Contacto from "./pages/Contacto.tsx"
import MenuPrincipal from './pages/MenuPrincipal.tsx'
import LogIn from './pages/LogIn.tsx'

import ProtectedRoute from './components/ProtectedRoute.tsx';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/menu-principal" element={<ProtectedRoute element={<MenuPrincipal />} />} />
      </Routes>
    </main>
  );
}

export default App;
