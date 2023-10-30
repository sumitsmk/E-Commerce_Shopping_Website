import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { removeFromCart as removeFromCartAction } from '../features/cartSlice'
import {
  removeItemFromCart as removeItemFromCartApi,
  updateItemQuantity as updateItemQuantityApi,
} from '../services/cart'
import { createUrl } from '../utils/utils'
import { Button, CardActionArea } from '@mui/material'
import { RemoveCircle } from '@mui/icons-material'
import { useState } from 'react'

function CartItem({ item, getCartItems}) {
  const [cartItems, setCartItems] = useState([]);
 
  return (
    <tr>
      <td style={{width:250}}>{item['product']['productName']}</td>
      <td style={{width:200}}>{item['product']['price']}</td>
      <td>{item['product']['quantity']}</td>
      <td>{item['product']['total']}</td>
      <td><Button variant='contained' color="error" startIcon={<RemoveCircle/>}>Remove</Button></td>
    </tr>
  )
}

export default CartItem

