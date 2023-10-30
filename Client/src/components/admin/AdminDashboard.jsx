import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Adminorders from './Adminorders';
import Adminproducts from './Adminproducts';
import Adminusers from './Adminusers';
import { Button } from '@mui/material';
import { Login, Logout } from '@mui/icons-material';
import Adminqueries from './Adminqueries';
import ProductForm from './TestProducts';


function AdminDashboard(){
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [activeComponent, setActiveComponent] = useState(null);
  
  const logoutUser = () => {
    sessionStorage.removeItem('jwt' )
    navigate('/admin')
  }

    const handleProductsClick = () => {
        setActiveComponent('products');
      };
    
      const handleOrdersClick = () => {
        setActiveComponent('orders');
      };

      const handleUsersClick = () => {
        setActiveComponent('users');
      };
      
      const handleQueriesClick = () => {
        setActiveComponent('queries');
      };
  
    const loadProducts = async () => {

    }
  
    return (
        <div style={{display:""}}>
        {/* <div> */}
        <div class="" style={{paddingLeft:"0"}}>
      <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                      <span class="fs-5 d-none d-sm-inline">Quick Links</span>
                  </a>
                  <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                      <li class="nav-item">
                          <a href="#" class="nav-link align-middle px-0">
                              <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                          </a>
                      </li>
                      <li>
                          <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                              <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Menu</span> </a>
                          <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                              <li class="w-100">
                              <button className='nav-link px-0' onClick={handleUsersClick}>Users</button>
                              </li>
                              <li>
                              <button className='nav-link px-0' onClick={handleProductsClick}>Products</button>
                              </li>
                              <li>
                              <button className='nav-link px-0' onClick={handleOrdersClick}>Orders</button>
                              </li>
                              <li>
                              <button className='nav-link px-0' onClick={handleQueriesClick}>Queries</button>
                              </li>
                          </ul>
                      </li>
                      
                  </ul>
                  <hr/>
                  {/* <div class="dropdown pb-4">
                      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                          <span class="d-none d-sm-inline mx-1">loser</span>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                          <li><a class="dropdown-item" href="#">New project...</a></li>
                          <li><a class="dropdown-item" href="#">Settings</a></li>
                          <li><a class="dropdown-item" href="#">Profile</a></li>
                          <li>
                              <Link class="dropdown-divider"/>
                          </li>
                          <li><a class="dropdown-item" href="#">Sign out</a></li>
                      </ul>
                  </div> */}
              </div>
          </div>
          <div class="col py-3" style={{paddingLeft:"0",paddingTop:"0", border:"1px solid"}}>
          {/* <div> */}
        <nav className='navbar navbar-expand-lg bg-body-tertiary' style={{border:"1px solid",marginTop:"0"}}>
          <div className='' style={{display:"flex"}}>
          <div>
            <a className='navbar-brand' >
              <h3>E-Shopping Admin Panel</h3>
              </a>
            </div>
          <form
                  class="form-inline my-4 my-lg-0"
                  style={{ position:"relative",display: "inline-flex",left:20 }}
                >
                  <input
                    style={{ width: "400px" }}
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  ></input>
                  &nbsp;
                  <button
                    class="btn btn-outline-primary my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
           
        
            <div className='col-3 d-flex' style={{display:"flex",justifyContent:"flex-end"}}>
          <Button variant='contained' startIcon={<Logout/>} onClick={logoutUser} >Log out</Button>      
            </div>
            
          </div>
        </nav>
        {/* </div> */}
        <div id='content' style={{height:"90%",width:"100%"}}>
      {/* {activeComponent === 'products' && <Adminproducts />} */}
      {activeComponent === 'products' && <ProductForm />}
      {activeComponent === 'orders' && <Adminorders />}
      {activeComponent === 'users' && <Adminusers />}
      {activeComponent === 'queries' && <Adminqueries />}
        </div>
  
          </div>
      </div>
  </div>
  
        {/* </div> */}
       
      </div>
    );
}


export default AdminDashboard