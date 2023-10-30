import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './components/cart'
import LoginUser from './components/loginUser'
import MyOrders from './components/myOrders'
import NavigationBar from './components/navigationBar'
import ProductGallery from './components/product-gallery'
import RegisterUser from './components/registerUser'
import Item from './components/item'
import Footer from './components/footer'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login, logout } from './features/authSlice'
import Profile from './components/profile'
import FAQ from './components/footer/FAQ'
import Aboutus from './components/footer/aboutus'
import Contactus from './components/footer/contactus'
import Help from './components/footer/Help'
import Careers from './components/footer/Careers'
import Books from './components/categories/books'
import Electronics from './components/categories/Electronics'
import Clothing from './components/categories/Clothing'
import Mobiles from './components/categories/Mobiles'
import Sports from './components/categories/Sports'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import Adminproducts from './components/admin/Adminproducts'
import Adminusers from './components/admin/Adminusers'
import Adminorders from './components/admin/Adminorders'
import { Myaddress } from './components/myaddress'
import NavBar from './components/reviews'
import Adminqueries from './components/admin/Adminqueries'
import PaymentPage from './components/Payment'
import ProductForm from './components/admin/TestProducts'
import { Myaddressreg } from './components/myaddressreg'

function App() {

  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const cartItemCount = useSelector((state) => state.cart.itemCounter)


  useEffect(() => {
    if (sessionStorage['jwt'] && sessionStorage['jwt'].length > 0) {
      dispatch(login())   
    }
  })

  return (
    <div className=''>
      {loginStatus && <NavigationBar />}
     
      <div className=''>
        <Routes>
          <Route path='/' element={<LoginUser />}/>
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/product-gallery' element={<ProductGallery />} />
          <Route path='/item/:id' element={<Item />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mobiles' element={<Mobiles />} />
          <Route path='/clothing' element={<Clothing />} />
          <Route path='/electronics' element={<Electronics />} />
          <Route path='/sports' element={<Sports />} />
          <Route path='/books' element={<Books />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/help' element={<Help />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/adminproducts' element={<Adminproducts />} />
          <Route path='/adminusers' element={<Adminusers />} />
          <Route path='/adminorders' element={<Adminorders />} />
          <Route path='/adminqueries' element={<Adminqueries />} />
          <Route path='/myaddress' element={<Myaddress />} />
          <Route path='/myaddressreg' element={<Myaddressreg />} />
          <Route path='/navbar' element={<NavBar />} />
          <Route path='/payment' element={<PaymentPage/>} />
          <Route path='/test' element={<ProductForm/>} />

        </Routes>
      </div>
      {loginStatus && <Footer />}
      <ToastContainer />
      
    </div>
    
  )
}

export default App
