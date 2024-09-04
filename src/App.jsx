import './App.css'
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom';
import Home from './components/Generics/Home';
import { Header, Footer, CustomError } from './components/Generics/genericsModules'
import { Login, Profile, Register, UsersList, UploadDocs } from './components/Users/userModulo'
import { Products, MyProducts, ProductDetails, AddProducts } from './components/Products/modulosProducts'
//import UpdateProduct from './components/Products/updateProduct.jsx';
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx';
import MyProductDetails from './components/Products/MyProductDetails.jsx';
import UserCarts from './components/Carts/UserCarts.jsx';
import EditItemCart from './components/Carts/EditItemCart.jsx';
import Checkout from './components/Carts/Checkout.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx';
export default function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <main id='divCustomBody'>
              <Routes>
                <Route path='/' element={<Home />} />
                {/* Rutas para usuarios */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='/api/users' element={<UsersList />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/users/upload' element={<UploadDocs />} />
                  {/* Rutas de productos */}
                  <Route path='/addproducts' element={<AddProducts />} />
                  <Route path='/myproducts' element={<MyProducts />} />
                  <Route path='/api/products' element={<Products />} />
                  <Route path='/api/products/:pid' element={<ProductDetails />} />
                  <Route path='/api/products/myproductdetails/:pid' element={<MyProductDetails />} />

                  {/* Rutas del carrito */}
                  <Route path='/api/carts/usercarts/' element={<UserCarts />} />
                  <Route path='/api/carts/usercarts/:uid/checkout' element={<Checkout />} />
                  <Route path='/api/carts/usercarts/updated/:cid/products/:pid' element={<EditItemCart />} />

                  {/* Ruta inexistente */}
                </Route>
                  <Route path='*' element={<CustomError />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider >
    </>
  )
}

