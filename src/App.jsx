import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import './index.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Videogames from './pages/Videogames'
import Consoles from './pages/Console'
import Accessories from './pages/Accessories'
import { CartProvider } from './context/CartContext'


function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route element={<Home />} path="/" />
              <Route element={<ProductDetail />} path="/products/:slug" />
              <Route element={<Videogames />} path="/categories/videogames" />
              <Route element={<Consoles />} path="/categories/consoles" />
              <Route element={<Accessories />} path="/categories/accessories" />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
