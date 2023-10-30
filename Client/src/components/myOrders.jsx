import {Link} from 'react-router-dom'
import axios from 'axios'
import { createUrl, log } from '../utils/utils'
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

function MyOrders() {

 const [orders,setOrders] = useState([]);
 const [prod,setProd] = useState([]);

 const counter = 1;
 const incrementCounter = () => {
  counter+=counter;
 };

 const [status,setStatus] = useState(true);
 const renderOrderStatus = (orderStatus) => {
  if (orderStatus) {
    return "on the way";
  } else {
    return "fulfilled";
  }
};

let totalOrderAmount = 0;
orders.forEach((order) => {
  totalOrderAmount += order.order_total;
});

  useEffect(() => {
    loadAllData();
  }, []);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const loadAllData = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      const userId = sessionStorage.getItem("id");
      const url = createUrl(`/order/get/${userId}`);
     
      console.log("token : "+token);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(url,config);
      setOrders(response.data);
      log(response.data);

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const loadProducts = async (orderId) => {
    try {
      const token = sessionStorage.getItem("jwt");
      const userId = sessionStorage.getItem("id");
      const url = createUrl(`/ordered-products/order/${orderId}`);
      console.log("token : "+token);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(url,config);
      setProd(response.data);
      log(response.data);
      console.log("checking")
      console.log(prod[0].price);
      // console.log(prod.product.productName);
      toggleModal();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };




  return (
    <div>
<center>
      <h2>My Orders</h2></center>
  <hr/>
      <div>
      
      <table class="table table-borderless">
  <thead>
    <tr>
      <th scope="col">Order No</th>
      <th scope="col">Order Date</th>
      <th scope="col">Order Status</th>
      <th scope="col">Order Total</th>
    </tr>
  </thead>
  <tbody style={{border:"2px solid gray", borderRadius:"2px"}}>
  {orders.map((a,incrementCounter)=>( 
    <tr>
      <td>{incrementCounter}</td>
      <td>{a.order_date.substring(0,10)}<br/>
      <Link onClick={()=>loadProducts(a.id)} style={{color:'green'}}>view order </Link> 
      </td>
      <td>{renderOrderStatus(a.order_status)}</td>
      <td>₹ {a.order_total.toFixed(2)}</td>
    </tr>
  ))}
</tbody>
</table>
<table>
<thead>
    <tr>
      <th scope="col">Order Total : {totalOrderAmount.toFixed(2)}</th>
    </tr>
  </thead>
</table>
    </div>
    <Modal isOpen={modal} toggle={toggleModal}>
        <>
          <ModalBody>
            <h4>Order Details</h4>
<table class="table">
  <thead class="thead-light">
    <tr>
    <th scope="col">S.No</th>
      <th scope="col">Company</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
  {prod.map((a,incrementCounter)=>( 
    <tr>
    <td scope="row">{incrementCounter}</td>
      <td scope="col">{a.product.company}</td>
      <td scope="col">{a.product.productName}</td>
      <td scope="col">{a.product.price}</td>
      <td scope="col">{a.quantity}</td>
    </tr>
  ))}
  </tbody>
</table>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </>
</Modal>
    </div>
  )
}

export default MyOrders
