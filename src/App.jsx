
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound';
import Global from './pages/Global';
import Logout from './pages/Logout';
import Login from './pages/Login';
import { useInitializeDatabase } from './store/database';
import Layout from './components/Layout';
import PrivateRoutes from './utils/PrivateRoutes';
import { initFirebaseBackend } from './helper/firebase_helper';



const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASEURL,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
}


// init firebase backend
initFirebaseBackend(firebaseConfig);


function App() {
  useInitializeDatabase();
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/globals" element={<Global/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
