import { useEffect, useState } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { getCartItems as getCartItemsApi } from '../services/cart'
import CartItem from './cartItem'
import { CheckOutlined, ShoppingCartCheckout } from '@mui/icons-material'
import { Delete, Edit, RemoveRedEye} from "@mui/icons-material";
import { Button  } from "@mui/material";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'
import { createUrl, log } from '../utils/utils'

function Cart(product) {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [tempid, settempid] = useState();
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const[total,setTotal] = useState(0);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddressSelection = async(addid) => {
    await setSelectedAddress(addid);
  };
  const loadAddress = async () => {
    try {
      const id = sessionStorage.getItem("id");
      const url = createUrl(`/address/get?uuid=${id}`)
      const token = sessionStorage.getItem("jwt");
      const config = {
      headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(url, config);
      setAddress(response.data);
  
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };


const navigate = useNavigate();

   
      const getCartItems = async () => {
        const response = await getCartItemsApi(sessionStorage.getItem('id'));
        console.log(response);
        setItems(response.productsList);
        setTotal(response.total.toFixed(2));
        sessionStorage["total"]=response.total;
      };


      const gotopayement = async()=>{
          //  navigate('/payment');
          // settempid(id);
           await toggleModal();
      }

      useEffect(() => {
        console.log("tempid updated:", tempid);
        sessionStorage['selectedaddress']=selectedAddress;
      }, [selectedAddress]);
      

  useEffect(() => {
    getCartItems()
    loadAddress();
  }, [])


  return (
  <>
<div>
<h1 style={{ textAlign: 'center', margin: 20 }}>My Cart</h1>

{items === undefined ? (
  <div>Loading...</div>
) : items.length === 0 ? (
  <div style={{ textAlign: 'center' }}>
    <h5>
      Sorry!! Your cart is empty at the moment. Please add a few products to
      place an order.
    </h5>
    <Link to='/product-gallery'>Browse Products</Link>
  </div>
) : (
  <div className='' style={{ marginTop: 50}}>
    <div className='' style={{display:"flex",justifyContent:"flex-end"}}>
    <Button className='' variant='contained' color="primary" onClick={toggleModal} startIcon={<ShoppingCartCheckout/>}>Checkout</Button>
    </div>
    <table class="table table-striped">
<thead>
    <tr>
      {/* <th scope="col">S.No</th> */}
      <th scope="col">Product Name</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total</th>
      <th scope="col">Action</th>
    
    </tr>
  </thead>
  <tbody>

    {items.map((item) => (
      <CartItem key={item.id} getCartItems={getCartItems} item={item}  />
       
      ))}
      <tr>
      <th scope="col">Total</th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">{total}</th>
      <th scope="col"></th>
    </tr>
      </tbody>
      </table>
  </div>
)}
</div>
<Modal isOpen={modal} toggle={toggleModal}>
      
      <>
      <ModalBody>    
          <div class="card">
            <div class="card-header">Choose Address &nbsp;&nbsp;&nbsp;
            <Link to="/myaddress" style={{width:120,height:35}} class="col-4 btn btn-primary">
                Add address
              </Link>
            </div>
            {address.map((a) => (
                <div className="card-body" key={a.id}>
                  <input
                    type="radio"
                    name="address"
                    value={a.id}
                    checked={selectedAddress === a.id}
                    onChange={() => handleAddressSelection(a.id)}
                  />
                  <label htmlFor={a.id}>
                  <p className="card-title">&nbsp;&nbsp;{a.house_no}&nbsp;{a.landmark}&nbsp;{a.city}&nbsp;{a.pincode}&nbsp;{a.country}</p>
                     {/* <p className="card-title">{a.house_no}</p> */}
                  </label>
                </div>
              ))}
            <Link to="/payment" class="btn btn-primary">
              Proceed to checkout
              </Link>
          </div>
      </ModalBody>
      <ModalFooter>
        {/* <Button color="primary" onClick={toggleModal}>
          Do Something
        </Button>{' '} */}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
      </>
    </Modal> 
</>
);
}

export default Cart;


