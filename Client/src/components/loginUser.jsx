import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, logout } from '../features/authSlice'
import { loginUser as loginUserApi } from '../services/user'
import backgroundImageUrl from '../components/images/back1.jpg'
import { addjwt } from '../features/jwtslice'
import { getCartItems as getCartItemsApi } from '../services/cart'
import { cartUpdate } from '../features/cartCountSlice'

function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [jwtvar, setjwtvar] = useState(0);
  const [items, setItems] = useState([]);
  const[total,setTotal] = useState(0);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getCartItems = async () => {
    const response = await getCartItemsApi(sessionStorage.getItem('id'));
    console.log(response);
    console.log(response.productsList.length);
    const itemsCount = response.productsList.length;
    dispatch(cartUpdate({ quantity: itemsCount }));
    setItems(response.productsList);
    setTotal(response.total);
  };

  const st = useSelector((state) => state.auth.status);
  useEffect(() => {
    logoutUser();
    console.log("hello check : "+st);
    // console.log("select : "+useSelector((state) => state.auth.status));
  });

  const logoutUser = () => {
    // sessionStorage.removeItem("jwt");
    // sessionStorage.removeItem("name");
    // sessionStorage.removeItem("mobile");
    // sessionStorage.removeItem("profileImage");
    
    dispatch(logout());
    
  };

  const loginUser = async () => {
    if (email.length == '') {
      toast.error('Please enter email')
    } else if (password.length == '') {
      toast.error('Please enter password')
    } else {
      const response = await loginUserApi(email, password)
        if (response.status === "success" && response['jwt'].length > 0) {

        const {first_name,last_name,email,mob_no,gender,id,jwt }= response
        
        sessionStorage['first_name'] = first_name
        sessionStorage['last_name'] = last_name
        sessionStorage['email'] = email
        sessionStorage['mob_no'] = mob_no
        sessionStorage['id'] = id
        sessionStorage['jwt'] = jwt
        sessionStorage['gender'] = gender
        dispatch(addjwt({jwtc:jwt}));
        dispatch(login())
        const respitems = await getCartItems();
      
        toast.success(`Welcome ${first_name} to store application`)
        
        navigate('/product-gallery')
      }else if(response.response.data.success === false){
        toast.error('Invalid user name or password')
      } else if(response.response.data.token === null){
        toast.error('Invalid Request')
      }
    }
  }

  return (
    <div style={{height:"100%"}}>
    <div >
      <h1 style={{ textAlign: 'center', margin: 10}}>Login</h1>
      {/* backgroundImage:'url("https://img.freepik.com/free-photo/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-63622.jpg?w=1380&t=st=1693389246~exp=1693389846~hmac=17abaa008eda85e2c7df78f9ba407eb87c4ab8fb09c5019fbfdba3f4d4881a48 */}
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
              <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
    </div>
  )
}

export default LoginUser
