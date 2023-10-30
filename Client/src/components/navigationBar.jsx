import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { cartUpdate } from "../features/cartCountSlice";

var test='';
function NavigationBar() {
  const [searchedItems, setSearchedItems] = useState('');
  
  const [username, setusername] = useState(
    sessionStorage.getItem("first_name")
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemCount = useSelector((state) => state.cartCount.itemCounter);

  useEffect(() => {
    dispatch(cartUpdate({ quantity: cartItemCount }));
    },[cartItemCount]);

  const logoutUser = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("mobile");
    sessionStorage.removeItem("profileImage");

    dispatch(logout());

    navigate("/");
  };

  const searchByName = async(e)=>{
    test=e;
    // console.log("check : "+e);
    // const url = createUrl(`/admin/products/search?name=${e}`)
    // const token = sessionStorage.getItem("jwt");
    // const config = {
    //   headers:{Authorization:`Bearer ${token}`}
    // };

    // const response = await axios.get(url, config)
    // console.log(response.data);
    // setSearchedItems(response.data);
    // sessionStorage['searchedItemss'] = searchedItems;
  }

  const  gotomyaddress = () => {
    navigate("/myaddress");
  };

  const gotoprofile = () => {
    navigate("/profile");
  };

  const gotomyorders = () => {
    navigate("/my-orders");
  };

  const gotocart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <nav className=" navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 fw-bold" style={{cursor:"pointer"}} onClick={()=>navigate("/product-gallery")}>E-Shopping</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <form
                  class="form-inline my-2 my-lg-0"
                  style={{ display: "inline-flex" }}
                >
                  <input
                    style={{ width: "600px" }}
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={((e)=>searchByName(e.target.value))}
                  ></input>
                  &nbsp;
                  <button
                    class="btn btn-outline-primary my-2 my-sm-0"
                    type="submit"
                    // onClick={((e)=>searchByName(e.target.value))}
                  >
                    Search
                  </button>
                </form>
              </li>

              <li className="nav-item">
                <Button
                style={{position:"relative",marginLeft:10}}
                  className=""
                  variant="outlined"
                  onClick={gotocart} 
                  endIcon={<ShoppingCart/>}
                >
                  Cart {cartItemCount}&nbsp;
                </Button>
              </li>
            </ul>
          </div>

          <div className="d-flex">
            <div class="dropdown">
              <button
                class="btn btn dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {username}&nbsp;
                <img
                  width="30"
                  height="30"
                  src="https://ik.imagekit.io/major/images/usernameimg.png?updatedAt=1692701128252"
                  alt="userimage"
                />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={gotoprofile}
                >
                  Profile
                </button>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={gotomyaddress}
                >
                  My Address
                </button>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={gotomyorders}
                >
                  My Orders
                </button>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={logoutUser}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          {/* &nbsp;&nbsp; */}
          {/* <div className='d-flex'>
            <button onClick={logoutUser} className='btn btn-primary'>
              Logout
            </button>
          </div> */}
        </div>
      </nav>
    </div>
  );
}

export {test};
export default NavigationBar;