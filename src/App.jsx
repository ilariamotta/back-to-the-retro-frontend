import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import './index.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail' 


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<Home />} path="/" />
            <Route element={<ProductDetail />} path="/products/:id"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
