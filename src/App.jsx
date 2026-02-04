import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import './index.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail' 
import Videogames from './pages/Videogames'
import Consoles from './pages/Console'
import Accessories from './pages/Accessories'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<Home />} path="/" />
            <Route element={<ProductDetail />} path="/products/:slug"/>
            <Route element={<Videogames />} path="/videogames"/>
            <Route element={<Consoles />} path="/console"/>
            <Route element={<Accessories />} path="/accessories"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
