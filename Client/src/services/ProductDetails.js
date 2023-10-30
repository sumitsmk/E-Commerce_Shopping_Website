import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function getProductDetails(id) {
  const url = createUrl(`/admin/products/${id}`)

  try {

    const token = sessionStorage.getItem("jwt");
    console.log("jwt: "+token);

    const config = {
      headers:{Authorization:`Bearer ${token}`}
    };

    const response = await axios.get(url, config)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}
