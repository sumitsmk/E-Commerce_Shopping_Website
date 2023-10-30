import React, { useState } from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { Link, useNavigate } from 'react-router-dom';
import { Login, PersonAdd } from '@mui/icons-material';
import {Button} from '@mui/material';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

 function NavBar(){
  const Navigator = useNavigate();
  function toLogin(){
      Navigator("/ulogin");
  }
  function toAdmin(){
    Navigator("/alogin");
}
  const [modal,setModal] = useState(false);

  const toggleModal = () =>{
    setModal(!modal);
  };
 return (
  <>
  <div class="container">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom:5}}>
  <div class="container-fluid">
    <a class="navbar-brand" href="##">EventGuru</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" href="##" to={"/"}>Home</Link>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="##" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Events
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><h6 style={{color:"coral",marginLeft:10,textAlign:"center"}}>Cultural Events</h6></li>
            <li><Link class="dropdown-item">Navratri</Link></li>
            <li><Link class="dropdown-item">Ganesh Utsav</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><h6 style={{color:"coral",marginLeft:10,textAlign:"center"}}>Ceremony</h6></li>
            <li><Link class="dropdown-item" style={{color:"black"}} >Ring Ceremony</Link></li>
            <li><Link class="dropdown-item" >Namimg Ceremony</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><h6 style={{color:"coral",marginLeft:10,textAlign:"center"}}>Social Events</h6></li>
            <li><Link class="dropdown-item" >Blood Donation</Link></li>
            <li><hr class="dropdown-divider"/></li>
          </ul>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/booking"}>Booking</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/gallery"}>Gallery</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/about"}>About Us</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/contact"}>Contact Us</Link>
        </li>
      </ul>
      
        <Button variant="contained"  style={{marginRight:10}} endIcon={<Login/>} onClick={toAdmin} >Admin Login</Button>
        <Button variant="contained"  style={{marginRight:10}} endIcon={<Login/>} onClick={toLogin} >User Login</Button>
        <Button variant="contained" endIcon={<PersonAdd/>} onClick={toggleModal}>Register</Button>
    </div>
  </div>
</nav>
</div>
<Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
            <section class="vh-50">
              <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                  <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12">
                      <div class="card" style={{borderRadius: "15px"}}>
                        <div class="card-body p-2">
                          <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                          <form>

                            <div class="form-outline mb-4">
                              <input type="text" id="form3Example1cg" class="form-control form-control-lg" />
                              <label class="form-label" for="form3Example1cg">Your Name</label>
                            </div>

                            <div class="form-outline mb-4">
                              <input type="email" id="form3Example3cg" class="form-control form-control-lg" />
                              <label class="form-label" for="form3Example3cg">Your Email</label>
                            </div>

                            <div class="form-outline mb-4">
                              <input type="password" id="form3Example4cg" class="form-control form-control-lg" />
                              <label class="form-label" for="form3Example4cg">Password</label>
                            </div>

                            <div class="form-outline mb-4">
                              <input type="password" id="form3Example4cdg" class="form-control form-control-lg" />
                              <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                            </div>

                            <div class="form-check d-flex justify-content-center mb-5">
                              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                              <label class="form-check-label" for="form2Example3g">
                                I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                              </label>
                            </div>

                            <div class="d-flex justify-content-center">
                              <button type="button"
                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                            </div>

                            <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                class="fw-bold text-body"><u>Login here</u></a></p>

                          </form>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggleModal}>
            Do Something
          </Button>{' '} */}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
  </Modal>
  
  </>
 );
}

export default NavBar;
