import { getProductDetails } from "../services/ProductDetails";
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./item.css";
import { toast } from 'react-toastify'
import { addToCart as addToCartAction } from '../features/cartSlice'
import { addToCart as addToCartApi } from '../services/cart'
import { removeFromCart } from '../features/cartSlice'
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "@mui/material";
import axios from 'axios'
import { createUrl, log } from '../utils/utils'
import { useNavigate } from "react-router-dom";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { cartUpdate } from '../features/cartCountSlice'

function Item(product) {
  const [itemdetails, setitemdetails] = useState([]);
  const [count, setcount] = useState(1); 
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [tempid, settempid] = useState();
  const [address, setAddress] = useState([]);
  console.log("item id : " + id);

  const dispatch = useDispatch();
  

  const toggleModal = () => {
    setModal(!modal);
  };

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelection = async(addid) => {
    await setSelectedAddress(addid);
    console.log("hello");
    console.log(addid);
  };

  const buynow = async() => {
    settempid(id);
    await toggleModal();
    console.log("c1:"+id);
    console.log("c2:"+tempid);
  };

  useEffect(() => {
    console.log("tempid updated:", tempid);
  }, [tempid]);

  useEffect(() => {
    console.log("tempid updated:", tempid);
    sessionStorage['selectedaddress']=selectedAddress;
  }, [selectedAddress]);
  let excartCount = useSelector((state) => state.cartCount.itemCounter);
  const addToCart = async () => {
    dispatch(addToCartAction({quantity:count}));
    const response = await addToCartApi(sessionStorage.getItem('id'),itemdetails['id'],count)
    
    excartCount += 1;
    dispatch(cartUpdate({ quantity: excartCount }));  
      toast.success('Successfully added this product to your cart')
  }

  useEffect(() => {
    wrapperfunction();
  }, []);

const wrapperfunction=()=>{
  loadProductsDetails();
  console.log("before")
  loadAddress();
  console.log("after")
}

  const loadProductsDetails = async () => {
    const response = await getProductDetails(id);
    console.log(response);
    setitemdetails(response);
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
      console.log("address details : ")
      setAddress(response.data);
      log(response);
      log("che")
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const inc = () => {setcount(count + 1);}

  const dec = () => {
    if(count>1){
    setcount(count - 1);
    dispatch(removeFromCart({quantity:count}))
    sessionStorage.setItem['cartcount']=count;
  }
  };


  return (
    <>
    <div className="maindiv">
      <div className="imgdiv">
      <img
        src={`http://localhost:8000/images/${itemdetails["productImage"]}`}
        alt="productimage"
        className="card-img-top p-3"
      />
      </div>

      <div className="itemdiv">
        <h4>{itemdetails["company"]}</h4>
        <h3>{itemdetails["productName"]}</h3>
        <hr />
        <h5>M.R.P ₹&nbsp; {itemdetails["price"]}</h5>
        <h5 style={{ display: "flex" }}>
          Add quantity &nbsp;
          <div className="incdec">
            <button className="dec" onClick={dec}>
              -
            </button>
            <div className="mid">{count}</div>
            <button className="inc" onClick={inc}>
              +
            </button>
          </div>
        </h5>
        
        <h6>Description About this product:-</h6>
        <p>{itemdetails["productDescription"]}</p>
        <p>
          Solid color polyester/linen full blackout thick sunscreen floor
          curtain Type: General Pleat Applicable Window Type: Flat Window
          Format: Rope Opening and Closing Method: Left and Right Biparting Open
          Processing Accessories Cost: Included Installation Type: Built-in
          Function: High Shading(70%-90%) Material: Polyester / Cotton Style:
          Classic Pattern: Embroidered Location: Window Technics: Woven Use:
          Home, Hotel, Hospital, Cafe, Office Feature: Blackout, Insulated,
          Flame Retardant Place of Origin: India Name: Curtain Usage: Window
          Decoration Keywords: Ready Made Blackout Curtain
        </p>
        <button className="btn btn-primary" onClick={buynow}>
          Buy Now
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={addToCart}>
          Add to Cart
        </button>
      </div>

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

export default Item;
