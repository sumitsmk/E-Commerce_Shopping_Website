import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser as registerUserApi } from '../services/user'

function RegisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const registerUser = async () => {
    if (firstName.length == '') {
      toast.error('Please enter first name')
    } else if (lastName.length == '') {
      toast.error('Please enter last name')
    } else if (email.length == '') {
      toast.error('Please enter email')
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error('Please enter a valid email');
    }else if (mobile.length == '' ) {
      toast.error('Please enter mobile')
    } else if (password.length == '') {
      toast.error('Please enter password')
    }  else if (!/^\d+$/.test(mobile)) {
      toast.error('Mobile number must contain numbers only');
    } else if (mobile.length !== 10) {
      toast.error('Mobile number must be exactly 10 digits');
    }  else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password) || password.length <= 7) {
      toast.error('Please Enter Valid Password');
    } else if (confirmPassword.length == '') {
      toast.error('Please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('Password does not match')
    } else {
      const response = await registerUserApi(
        firstName,
        lastName,
        email,
        password,
        gender,
        mobile
      )
      console.log("duplication");
      //  console.log(response.response.data.success);
      if (response['status'] == 'success') {
        toast.success('Successfully registered a new user')
        navigate('/')
      }else if(response.response.data.success==false) 
      {toast.error('Email Id already exists.');}
      else {
        toast.error('Error while registering a new user, please try again')
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Register User</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>First Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Last Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Gender</label>&nbsp;&nbsp;<br/>
              <input type="radio" value="Male" name="gender" onChange={(e) => {setGender(e.target.value)}}/> Male&nbsp;&nbsp;
              <input type="radio" value="Female" name="gender" onChange={(e) => {setGender(e.target.value)}}/> Female&nbsp;&nbsp;
              <input type="radio" value="Other" name="gender" onChange={(e) => {setGender(e.target.value)}}/> Other
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='text' minLength={10} maxLength={10}
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>
          

            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <h6 style={{fontSize:"10px"}}>*The password must be at least 7 characters long and include a lowercase letter, an uppercase letter, a number, and a special character.</h6>
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <div className='mb-3'>
                Already got an account? <Link to='/'>Login here</Link>
              </div>
              <button onClick={registerUser} className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default RegisterUser
