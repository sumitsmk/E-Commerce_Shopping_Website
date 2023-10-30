import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { createUrl, log } from "../../utils/utils";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

function Adminproducts() {
  const [products, setProducts] = useState([]);
  const [File,setFile]=useState([]);
  const [productName, setproductName] = useState([]);
  const [productPrice, setproductPrice] = useState([]);
  const [productUnitstock, setproductUnitstock] = useState([]);
  const [productDescription, setproductDescription] = useState([]);
  const [productCompany, setproductCompany] = useState([]);
  const [productCategory, setproductCategory] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [tempid, settempid] = useState();

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const wrappper=async(id)=>{
    settempid(id);
    await toggleModal();
    console.log("c1:"+id);
    console.log("c2:"+tempid);
  }

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    console.log("tempid updated:", tempid);
  }, [tempid]);

  const loadAllData = async () => {
    try {
      const url = createUrl(`/admin/products/all`);
      const token = sessionStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(url, config);
      setProducts(response.data);
      log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

    const addProduct = async () => {
    
      if (productName.length == "") {
        toast.error("Please enter Product name");
      } else if (productPrice.length == "") {
        toast.error("Please enter Product Price");
      } else if (productUnitstock.length == "") {
        toast.error("Please enter Product Unitstock");
      } else if (productDescription.length == "") {
        toast.error("Please enter Product Description");
      } else if (productCompany.length == "") {
        toast.error("Please enter Product Company");
      } else if (productCategory.length == "") {
        toast.error("Please enter Product Category");
      }
      const url1 = createUrl(`/admin/products`);
      const token = sessionStorage.getItem("jwt");

      const body = {
        productName,
        productPrice,
        productUnitstock,
        productDescription,
        productCompany,
        productCategory,
      };

      const formData = new FormData();
      formData.append("data", body);
      formData.append("Content-Type","application/json");
      formData.append("image", productImage); 

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"multipart/form-data",
        },
      };
      //  console.log("url: "+url);
       console.log("formData: "+formData.data);
       console.log("config: "+config.headers);
      try {
        const response = await  axios({
          method: "post",
          url: url1,
          data: formData,
          headers: { Authorization: `Bearer ${token}`,"Content-Type": "multipart/form-data" },
        })
        // const response = await axios.post(url,formData, config);
        log(response.data);
        loadAllData();
        document.getElementById("updateVenue").hidden = true;
        document.getElementById("productTable").hidden = false;
        log(response);
        return response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
      }
    };

  const[fproduct,setfproduct] = useState([]);
    const editfetchProduct =async (e) => {
      const url = createUrl(`/admin/products/${e}`)
        try{
          const token = sessionStorage.getItem("jwt");
          console.log("jwt: "+token);
          const config = {
            headers:{Authorization:`Bearer ${token}`}
          };
          const response = await axios.get(url,config);
          log(response.data);
          setfproduct(response.data);
          setproductName(response.data.productName);
          setproductPrice(response.data.price);
          setproductUnitstock(response.data.unitStock)
          setproductDescription(response.data.productDescription)
          setproductCompany(response.data.company)
          setproductCategory(response.data.category)
          setProductImage(response.data.productImage)

      }catch(error){
        console.error('Error fetching data: ',error);
        return null;
      }}

      const editProduct =async (e) => {
        toast.success(`Products updated Succefully`)
        const url = createUrl(`/admin/products/${e}`)
          try{
            const token = sessionStorage.getItem("jwt");
            console.log("jwt: "+token);
            const config = {
              headers:{Authorization:`Bearer ${token}`}
            };
            const body = {
              productPrice,productUnitstock,productDescription,productCompany,productCategory,
            };
            const response = await axios.put(url,body,config);
            toast.success(`Product Successfully updated`);
            loadAllData();
          
        }catch(error){
          console.error('Error fetching data: ',error);
          return null;
        }}

  const deleteProduct = async(id) => {
    const url = createUrl(`/admin/products/delete/${id}`)
      try{
        const token = sessionStorage.getItem("jwt");
        console.log("jwt: "+token);
        const config = {
          headers:{Authorization:`Bearer ${token}`}
        };
        const response = await axios.delete(url,config);
        toast.success(`Product Successfully deleted`);
        loadAllData();
      
    }catch(error){
      console.error('Error fetching data: ',error);
      return null;
    }
  }

  return (
    <>
      <center>
        {/* <h1>
    Admin products Page
</h1> */}

        <div
          id="updateProduct"
          hidden="true"
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center", margin: 10 }}>Add Product</h1>

          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="form">
                <div className="mb-3">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setproductName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      setproductPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Unit Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      setproductUnitstock(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Product Description</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setproductDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setproductCompany(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setproductCategory(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image">Product Image:</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    //  onChange={(e) => {
                    //   setProductImage(e.target.files[0]);
                    // }}
                    required
                  />
                </div>
             
                <div style={{ display: "flex" }}>
                  <div className="mb-3">
                    <button
                      onClick={() => {
                        addProduct();
                      }}
                      className="btn btn-success"
                    >
                      Back
                    </button>
                  </div>
                  &nbsp;
                  <div className="mb-3">
                    <button
                      onClick={() => {
                        addProduct();
                      }}
                      className="btn btn-success"
                    >
                      Add product
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>



        <div
          id="editProduct"
          hidden="true"
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center", margin: 10 }}>Edit Product</h1>

          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="form">
                <div className="mb-3">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    className="form-control"
                    onChange={(e) => {
                      setproductName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Price</label>
                  <input
                    type="number"
                    value={productPrice}
                    className="form-control"
                    onChange={(e) => {
                      setproductPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Unit Stock</label>
                  <input
                    type="number"
                    value={productUnitstock}
                    className="form-control"
                    onChange={(e) => {
                      setproductUnitstock(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Product Description</label>
                  <input
                    type="text"
                    value={productDescription}
                    className="form-control"
                    onChange={(e) => {
                      setproductDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Company</label>
                  <input
                    type="text"
                    value={productCompany}
                    className="form-control"
                    onChange={(e) => {
                      setproductCompany(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Category</label>
                  <input
                    type="text"
                    value={productCategory}
                    className="form-control"
                    onChange={(e) => {
                      setproductCategory(e.target.value);
                    }}
                  />
                </div>
             
                <div className="mb-3">
                <div style={{className:"d-flex"}}>
                <img  src={`http://localhost:8000/images/${productImage}`}
                style={{ maxHeight: "100px" }}
                />
                </div>
                  <label htmlFor="">Product Image</label>
                  <input
                    type="file"
                    // value={productImage}
                    className="form-control"
                    onChange={(e) => {
                      setProductImage(e.target.files[0]);
                    }}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <div className="mb-3">
                    <button
                      // onClick={() => {
                      //   addProduct();
                      // }}
                      
                      onClick={()=>{document.getElementById("updateProduct").hidden=true
                      document.getElementById("productTable").hidden=false
                      document.getElementById("editProduct").hidden=true
                  }}
                      className="btn btn-success"


                    >
                      Back
                    </button>
                  </div>
                  &nbsp;
                  <div className="mb-3">
                    <button
                  
                      onClick={(w)=>{editProduct(w.target.value);}} 
                      className="btn btn-success"
                    >
                      Edit product
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>




        <div id="productTable">
          <div>
            <button
              type="button"
              className="btn btn-warning"
              style={{ margin: "10px" }}
              onClick={() => {
                document.getElementById("updateProduct").hidden = false;
                document.getElementById("productTable").hidden = true;
              }}
            >
              Add Products
            </button>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col" style={{ width: "200px" }}>
                  Product Name
                </th>
                <th scope="col">Price</th>
                <th scope="col">Unit Stock</th>
                {/* <th scope="col">Company</th> */}
                <th scope="col">Category</th>
                <th scope="col">View</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((a) => (
                <tr>
                  <th scope="row">{a.id}</th>
                  <td>{a.productName}</td>
                  <td>{a.price}</td>
                  <td>{a.unitStock}</td>
                  {/* <td>{e.company}</td> */}
                  <td>{a.category}</td>
                  <td>
                    <Button
                      style={{ height: 35, width: 75 }}
                      variant="contained"
                      value={a.id}
                      color="info"
                      startIcon={<RemoveRedEye />}
                      onClick={(q)=>wrappper(q.target.value)}
                      // onClick={()=>toggleModal()}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{ height: 35, width: 75 }}
                      variant="contained"
                      color="primary"
                      value={a.id}
                      startIcon={<Edit />}
                      onClick={() => {
                        editfetchProduct(a.id);
                        document.getElementById("editProduct").hidden = false;
                        document.getElementById("productTable").hidden = true;
                      }}
                      
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{ height: 35, width: 90 }}
                      variant="contained"
                      value={a.id}
                      onClick={(e) => deleteProduct(e.target.value)}
                      color="error"
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
      <Modal isOpen={modal} toggle={toggleModal}>
      {products.filter((temp)=>temp.id==tempid).map((a) => (
        <>
          <ModalBody>
            <div className="card">
              <div className="card-header"><h3>Product Details</h3></div>
              <div className="card-body">
                <div style={{display:"flex"}}>
                <div>
                <h6 className="card-title">Id : {a.id}</h6>
                <h6 className="card-title">Category : {a.category}</h6>
                <h6 className="card-title">Company : {a.company}</h6>
                <h6 className="card-title">Product Name : {a.productName}</h6>
                <h6 className="card-title">Price : {a.price}</h6>
                </div>
                <div style={{className:"d-flex"}}>
                <img  src={`http://localhost:8000/images/${a.productImage}`}
                style={{ maxHeight: "100px" }}
                />
                </div>
                </div>
                <p className="card-text">Descriptption : {a.productDescription}</p>
                <p className="card-text">unitstock : {a.unitStock}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
        </>
 
      )
   )
   } 
</Modal>
      
    </>
  );
}

export default Adminproducts;
