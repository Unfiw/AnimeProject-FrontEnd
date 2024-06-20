import './App.css';
import { Routes, Route } from 'react-router-dom';
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";
import MenuPrincipal from './pages/MenuPrincipal';
import LogIn from './pages/LogIn';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/menu-principal" element={<ProtectedRoute element={<MenuPrincipal />} />} />
        </Routes>
      </main>
    </HelmetProvider>
  );
}

export default App;
