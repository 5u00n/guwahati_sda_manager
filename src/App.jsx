
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound';
import Global from './pages/Global';
import { useInitializeDatabase } from './store/database';
function App() {

  useInitializeDatabase();

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Global />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
