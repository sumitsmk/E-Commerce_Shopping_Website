import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from 'axios'
import { createUrl, log } from '../utils/utils'
import { registerUser as registerUserApi } from "../services/user";
import { Height } from "@mui/icons-material";

function Paymentpage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAddress();
  }, []);

  const wrapper =()=>{
    // pay();
    finalpay();
  }

  const finalpay=async()=>{
    const token = sessionStorage.getItem("jwt");
    const totalamt = sessionStorage.getItem("total");
    // const url = createUrl(`/api/payments/pay?amt=${totalamt}`);
    const url = createUrl(`/api/payments/pay?amt=10`);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body={
         
    }

    const response = await axios.post(url,body,config);
      // setProducts(response.data);
      log("checkkk"); 
      log(response.data);
      log("checkkk"); 
      log(response.data.id);  


      const options = {
        key: 'rzp_test_z7JhiLJcnUGB2J', // Replace with your Razorpay API key
        amount: '50000', // Replace with your desired amount
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        image: 'https://example.com/your_logohttps://www.simicart.com/blog/wp-content/uploads/eCommerce-logo.jpg',
        order_id: `${response.data.id}`, // Replace with your order ID
        handler: function (response) {
          setPaymentSuccess(true);
          // toast.success(`${response.razorpay_signature}`)
          // toast.success(`${response.razorpay_order_id}`)
          // toast.success(`${response.razorpay_payment_id}`)
          toast.success(`Order Succefully placed`)
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
   
  }
  // document.getElementById('rzp-button1').onclick = function fn (e) {
  //   rzp1.open();
  //   e.preventDefault();
  // };

  

  const pay=async() => {
    try {
      const token = sessionStorage.getItem("jwt");
      console.log("hello : "+token);
      // "/addFromCart/{userId}/{userPaymentId}/{addressId}"
      const userId = sessionStorage.getItem("id");
      const addressId = sessionStorage.getItem("addressid");
      const url = createUrl(`/order/addFromCart/${userId}/1/1`);
     
      console.log("token : "+token);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const body={

      }
      const response = await axios.post(url, body,config);
      // setProducts(response.data);
      log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    toast.success(`Order Succefully placed`)
    navigate('/my-orders');
  }


  const loadAddress = async () => {
    try {
      const id = sessionStorage.getItem("selectedaddress");
      const url = createUrl(`/address/getById?uuid=${id}`)
      const token = sessionStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(url, config);
      console.log("address details : ")
      setAddress(response.data);
      sessionStorage['addressId']=response.id;
      log("check1");
      log(response.id);
      log("check2")
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };



  return (
    <div style={{border:"" ,height:"100%",width:"100%"}}>
        <div style={{border:"", backgroundColor:"#3B71CA",height:"7%",width:"100%"}}>
        <h3 style={{ margin: 10 }}>Payment Page</h3>
        </div><br/>
    <div style={{border:""}}>
      
   <div >
   <div class="card" style={{width:500,height:250,textAlign:"center",marginLeft:"400"}}>
  <h5 class="card-header">Selected Address</h5>
  <div class="card-body">
    {/* <h5 class="card-title">Special title treatment</h5> */}
    <p class="card-text">House No : {address.house_no}</p>
    <p class="card-text">Landmark : {address.landmark}</p>
    <p class="card-text">City : {address.city}</p>
    <p class="card-text">Pincode : {address.pincode}</p>
    <p class="card-text">Country : {address.country}</p>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>&nbsp;

   </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <label><h5>Card Number</h5></label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label><h5>Name on Card</h5></label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label><h5>CVV Number</h5></label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setCVV(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label><h5>Expiry Date</h5></label>
                  </td>
                  <td>
                    <div style={{display:"flex",position:"relative"}}>
                    {/* Dropdown for Month */}
                    <div className="dropdown">
                      <button
                        className="btn btn-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Month
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            January
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            February
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            March
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            April
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            May
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            June
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            July
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            August
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            September
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            October
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            November
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Decemeber
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Dropdown for Year */}
                    <div className="dropdown" style={{position:"relative",left:20}}>
                      <button
                        className="btn btn-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Year
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            2023
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2024
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2025
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2026
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2027
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2028
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2029
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            2030
                          </a>
                        </li>
                      </ul>
                    </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mb-3">
              <div className="mb-3">
                {/* <Link to="/"><h6>Add Bank Details</h6></Link> */}
              </div>
              <button id="rzp-button1" onClick={wrapper} className="btn btn-primary">Pay Now</button>
            </div>
            {/* <div>
      <button id="rzp-button1">Pay with Razorpay</button>
    </div> */}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
    </div>
  );
}

export default Paymentpage;
