import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  gender,
  mobile
) {
  const url = createUrl('/auth/register')
  const body = {
    first_name:firstName,
    last_name:lastName,
    email,
    password,
    gender,
    mob_no:mobile,
  }

  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return ex;
  }
}

export async function updatePass(email,password) {
  const url = createUrl('/auth/changepass')
  const body = {email,password}

  const token = sessionStorage.getItem("jwt");
  const config = {
    headers:{Authorization:`Bearer ${token}`}
  };

  try {
    const response = await axios.post(url, config, body);
    log("RESPONSE");
    log(response);
    log(response.data);
    return response.data
  } catch (ex) {
    log(ex)
    return ex;
  }
}

export async function loginUser(email, password) {
  // const url = createUrl('/user/login')
  // const [token, settoken] = useState(sessionStorage.getItem('jwt'));
  const token = sessionStorage.getItem('jwt')
  
  const url = createUrl('/auth/login')
  // http://localhost:3000/auth/login
  const body = {
    email,
    password,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log("EX")
    log(ex)
    return ex;
  }
}
