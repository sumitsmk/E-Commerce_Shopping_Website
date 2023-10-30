import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function getProductList() {
  const url = createUrl('/admin/products/all')
  try {
    const token = sessionStorage.getItem("jwt");
    console.log("jwt: "+token);
    const header = {
      headers: {
        token,
      },
    }
    const config = {
      headers:{Authorization:`Bearer ${token}`}
    };
    const response = await axios.get(url, config)
    log(response.data)
    console.log(response.data);
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function getProductCategoryList(productType) {
  const url = createUrl(`/admin/products/category/${productType}`)
  try {
    const token = sessionStorage.getItem("jwt");
    console.log("jwt: "+token);
    const config = {
      headers:{Authorization:`Bearer ${token}`}
    };
    const response = await axios.get(url, config)
    log(response.data)
    console.log(response.data);
    console.log(response.data);
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}
