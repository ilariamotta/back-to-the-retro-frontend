import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import './index.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Videogames from './pages/Videogames'
import Consoles from './pages/Console'
import Accessories from './pages/Accessories'
import { CartProvider } from './context/CartContext'
import { StripeProvider } from './context/StripeContext'
import Cart from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import SearchPage from './pages/SearchPage'
import SuccessPage from './pages/SuccessPage'
import ProductsPage from './pages/ProductsPage'


function App() {
  return (
    <>
      <CartProvider>
        <StripeProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route element={<Home />} path="/" />
                <Route element={<ProductsPage />} path="/products" />
                <Route element={<ProductDetail />} path="/products/:slug" />
                <Route element={<Videogames />} path="/categories/videogames" />
                <Route element={<Consoles />} path="/categories/consoles" />
                <Route element={<Accessories />} path="/categories/accessories" />
                <Route element={<Cart />} path="/carrello" />
                <Route element={<CheckoutPage />} path="/checkout" />
                <Route element={<SearchPage />} path="/search" />
                <Route element={<SuccessPage />} path="/success" />
              </Route>
            </Routes>
          </BrowserRouter>
        </StripeProvider>
      </CartProvider>
    </>
  )
}

export default App
