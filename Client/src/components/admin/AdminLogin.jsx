import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { login } from '../features/authSlice'
import { loginAdmin as loginAdminApi } from '../../services/admin'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  // const dispatch = useDispatch()

  const loginAdmin = async () => {
    if (email.length == '') {
      toast.error('Please enter email')
    } else if (password.length == '') {
      toast.error('Please enter password')
    } else {
      // call register api
      const userRole = "admin";
      const response = await loginAdminApi(email, password, userRole)
      console.log("data1 : "+ response);
      // parse the response
      // if (response['status'] === 'success') {
        if (response['jwt'].length > 0) {
          console.log("check")
        // parse the response's data and extract the token
        // const { token, name, mobile, profileImage } = response['data']
        console.log("data : "+response);
        const {first_name,email,id,jwt }= response
        // const  jwt = response['data']
        // store the token for making other apis
        // sessionStorage['token'] = token
        // sessionStorage['name'] = name
        // sessionStorage['mobile'] = mobile
        // sessionStorage['profileImage'] = profileImage

        sessionStorage['first_name'] = first_name
        sessionStorage['email'] = email
        sessionStorage['id'] = id
        sessionStorage['jwt'] = jwt

        // update global store's authSlice with status = true
        // dispatch(login())

        toast.success(`Welcome Admin to Admin Dashboard`)

        // go back to login
        navigate('/admindashboard')
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Admin Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
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
            </div>
            <div className='mb-3'>
              {/* <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div> */}
              <button onClick={loginAdmin} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default AdminLogin
