// MainPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './components/cart'
import LoginUser from './components/loginUser'
import MyOrders from './components/myOrders'
import NavigationBar from './components/navigationBar'
import Navigation from './components/navigation'
import ProductGallery from './components/product-gallery'
import RegisterUser from './components/registerUser'
import Item from './components/item'
import Footer from './components/footer'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'
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
import cartCountSetter from './features/cartSlice'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminPage from './adminpage'

function MainPage() {
    const loginStatus = useSelector((state) => state.auth.status)
    const dispatch = useDispatch()
    const cartItemCount = useSelector((state) => state.cart.itemCounter)
  
    useEffect(() => {
      if (sessionStorage['jwt'] && sessionStorage['jwt'].length > 0) {
        dispatch(login())   
      }
    }, [])
  return (
    <div className='container-fluid'>

    {loginStatus && <NavigationBar />}
    <div className='container-fluid'>
      <Routes>
        {/* home component  */}
        {/* <Route path='/' element={} /> */}

        {/* login component */}
        <Route path='/' element={<LoginUser />} />

        {/* login component for Admin */} 
        <Route path='/admin' element={<AdminLogin />} />

        {/* Admin Dashboard component */}
        <Route path='/admindashboard' element={<AdminDashboard />} />

        {/* register component */}
        <Route path='/register' element={<RegisterUser />} />

        {/* product-gallery component */}
        <Route path='/product-gallery' element={<ProductGallery />} />

        {/* cart component */}
        <Route path='/item/:id' element={<Item />} />

        {/* cart component */}
        <Route path='/cart' element={<Cart />} />

        {/* my orders component */}
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

      </Routes>
      <Footer />
      {/* <Footer/>   */}
    </div>
    
    <ToastContainer />
    
  </div>

  
    
  );
}

export default MainPage;
