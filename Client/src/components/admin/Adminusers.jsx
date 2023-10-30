// import { Delete, Edit} from "@mui/icons-material";
// import { Button  } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
// import { createUrl, log } from "../utils/utils";
import { createUrl,log } from "../../utils/utils";
// import { create } from "@mui/material/styles/createTransitions";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

function Adminusers(){
    const [users,setUsers] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [modal, setModal] = useState(false);
  const [tempid, settempid] = useState();

           
  const toggleModal = () => {
    setModal(!modal);
  };

  const wrappper=async(id)=>{
    settempid(id);
    await toggleModal();
    console.log("c1:"+id);
    console.log("c2:"+tempid);
  }

    useEffect( ()=>{
         loadAllData();
    },[])

    useEffect(() => {
      console.log("tempid updated:", tempid);
    }, [tempid]);
    
    const loadAllData=async ()=>{
        try{
            const url = createUrl(`/user/get`)
            const token = sessionStorage.getItem("jwt");
            const config = {
                headers:{Authorization:`Bearer ${token}`}
              };
    
            const response =await axios.get(url,config)
            setUsers(response.data)
            log(response.data)
            console.log(response)
            }catch(error){
                console.error('Error fetching data: ',error);
            }
    }

    const addUser = async  ()=>{
      if (firstName.length == '') {
        toast.error('Please enter first name')
      } else if (lastName.length == '') {
        toast.error('Please enter last name')
      } else if (email.length == '') {
        toast.error('Please enter email')
      } else if (mobile.length == '' ) {
        toast.error('Please enter mobile')
      } else if (password.length == '') {
        toast.error('Please enter password')
      } else if (confirmPassword.length == '') {
        toast.error('Please confirm password')
      } else if (password !== confirmPassword) {
        toast.error('Password does not match')
      }
        const url = createUrl(`/auth/register`)
    
        const body = {
          first_name:firstName,last_name: lastName, email, password, gender, mob_no:mobile
           };
      
        try{
            const response = await axios.post(url,body);
            // loadAllData();
            // document.getElementById("updateUser").hidden=true
            // document.getElementById("userTable").hidden=false
            // log(response);
            setUsers(response);
            toast.success(`User Added Successfully`);
            return response.data;
           
        }catch(error){
            console.error('Error fetching data: ',error);
            return null;
        }
    }

    const[fuser,setfuser] = useState([]);
    const editfetchUser =async (e) => {
      const url = createUrl(`/user/getUser/${e}`)
        try{
          const token = sessionStorage.getItem("jwt");
          console.log("jwt: "+token);
          const config = {
            headers:{Authorization:`Bearer ${token}`}
          };
          const response = await axios.get(url,config);
          log(response.data);
          setfuser(response.data);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setEmail(response.data.email)
          setGender(response.data.gender)
          setMobile(response.data.mobno)
          setPassword(response.data.password)

 

        
      }catch(error){
        console.error('Error fetching data: ',error);
        return null;
      }}

      const editUser =async (e) => {
        const url = createUrl(`/user/update?uuid=${e}`)
          try{
            const token = sessionStorage.getItem("jwt");
            console.log("jwt: "+token);
            const config = {
              headers:{Authorization:`Bearer ${token}`}
            };
            const body = {
              first_name:firstName,last_name: lastName, email, password, gender, mob_no:mobile
               };
            const response = await axios.put(url,body,config);
            toast.success(`User Successfully updated`);
            loadAllData();
          
        }catch(error){
          console.error('Error fetching data: ',error);
          return null;
        }}


    const deleteUser =async (e) => {
      const url = createUrl(`/user/delete?uuid=${e}`)
        try{
          const token = sessionStorage.getItem("jwt");
          console.log("jwt: "+token);
          const config = {
            headers:{Authorization:`Bearer ${token}`}
          };
          const response = await axios.delete(url,config);
          toast.success(`User Successfully deleted`);
          loadAllData();
        
      }catch(error){
        console.error('Error fetching data: ',error);
        return null;
      }}

  return(
<>
<center>
{/* <h1>
    Admin products Page
</h1> */}

<div id="updateUser" hidden="true" style={{justifyContent:"center", textAlign:"center"}}>
          <h1 style={{ textAlign: 'center', margin: 10 }}>Add User</h1>
          <div className='row'>
            <div className='col-12 d-flex justify-content-center'>
              <div className='form'>
                <div className='mb-3'>
                  <label htmlFor=''>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>

                <div className='mb-3'>
              <label htmlFor=''>Gender</label>&nbsp;&nbsp;<br/>
              <input type="radio" value="Male" name="gender" onChange={(e) => {setGender(e.target.value)}}/> Male&nbsp;&nbsp;
              <input type="radio" value="Female" name="gender" onChange={(e) => {setGender(e.target.value)}}/> Female&nbsp;&nbsp;
              <input type="radio" value="Other" name="gender" onChange={(e) => {setGender(e.target.value)}}/> Other
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='tel'
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>

<div style={{display:"flex"}}>
<div className='mb-3'>
                  <button 
                    onClick={()=>{document.getElementById("updateUser").hidden=true
                    document.getElementById("userTable").hidden=false
                }}
                  className='btn btn-success'>
                   Back
                  </button>
                </div>&nbsp;

<div className='mb-3'>
                  <button onClick={()=>{addUser();}} className='btn btn-success'>
                    Add User
                  </button>
                </div>
                </div>
              </div>
            </div>
            <div className='col'></div>
            </div>
        </div>



        <div id="editUser" hidden="true" style={{justifyContent:"center", textAlign:"center"}}>
          <h1 style={{ textAlign: 'center', margin: 10 }}>Edit User</h1>
          <div className='row'>
            <div className='col-12 d-flex justify-content-center'>
              <div className='form'>
                <div className='mb-3'>
                  <label htmlFor=''>First Name</label>
                  <input
                    type='text'
                    value={firstName}
                    className='form-control'
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Last Name</label>
                  <input
                    type='text'
                    value={lastName}
                    className='form-control'
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Email</label>
                  <input
                    type='email'
                    value={email}
                    className='form-control'
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>

                <div className='mb-3' >
              <label htmlFor=''>Gender</label>&nbsp;&nbsp;<br/>
              <input type="radio"  value={gender} name="gender" onChange={(e) => {setGender(e.target.value)}}/> Male&nbsp;&nbsp;
              <input type="radio" value={gender} name="gender" onChange={(e) => {setGender(e.target.value)}}/> Female&nbsp;&nbsp;
              <input type="radio" value={gender} name="gender" onChange={(e) => {setGender(e.target.value)}}/> Other
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='number'
                value={mobile}
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                value={password}
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

<div style={{display:"flex"}}>
<div className='mb-3'>
                  <button 
                    onClick={()=>{document.getElementById("updateUser").hidden=true
                    document.getElementById("userTable").hidden=false
                    document.getElementById("editUser").hidden=true
                }}
                  className='btn btn-success'>
                   Back
                  </button>
                </div>&nbsp;

<div className='mb-3'>
                  <button value={fuser.id} onClick={(w)=>{editUser(w.target.value);}} className='btn btn-success'>
                    Edit User
                  </button>
                </div>
                </div>
              </div>
            </div>
            <div className='col'></div>
            </div>
        </div>






              <div id="userTable">
              <div> 
              <button type="button" class="btn btn-warning" style={{margin:"10px"}}
                onClick={()=>{document.getElementById("updateUser").hidden=false
                document.getElementById("userTable").hidden=true
            }}
              >Add Users</button>
              </div>

          <table className="table table-hover">
          <thead>
              <tr>
              <th scope="col">id</th>
              <th scope="col" style={{width:"200px"}} >Name</th>
              <th scope="col">email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">View</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th> 

              </tr>
          </thead>
          <tbody>

              { users.map(e=>
              <tr>
              <th scope="row">{e.id}</th>
              <td>{e.first_name}</td>
              <td>{e.email}</td>
              <td>{e.mobno}</td>
              {/* <td>{e.company}</td> */}
              {/* <td>{e.category}</td> */}
              <td><button variant='contained' className="btn btn-primary"  value={e.id} color="primary"  onClick={(q)=>wrappper(q.target.value)}>View</button></td>
              <td><button variant='contained' className="btn btn-info" color="primary" value={e.id} onClick= {() => {editfetchUser(e.id);
              document.getElementById("editUser").hidden=false;
              document.getElementById("userTable").hidden=true;}
            }
              
              >Edit</button></td>
              <td><button variant='contained' className="btn btn-danger" value={e.id} 
              onClick= {() => deleteUser(e.id)}
              color="error" >Delete</button></td>
              </tr>)}
          </tbody>
          </table>
          </div>
          </center>
          <Modal isOpen={modal} toggle={toggleModal}>
      {users.filter((temp)=>temp.id==tempid).map((a) => (
        <>
          <ModalBody>
            <div className="card">
              <div className="card-header"><h3>User Details</h3></div>
              <div className="card-body">
                <div style={{display:"flex"}}>
                <div>
                <h6 className="card-title">User Id : {a.id}</h6>
                <h6 className="card-title">First Name : {a.first_name}</h6>
                <h6 className="card-title">Last Name : {a.last_name}</h6>
                <h6 className="card-title">Email : {a.email}</h6>
                <h6 className="card-title">Mobile No : {a.mobno}</h6>
                </div>
                {/* <div style={{className:"d-flex"}}>
                <img  src={`http://localhost:8000/images/${a.productImage}`}
                style={{ maxHeight: "100px" }}
                />
                </div> */}
                </div>
                
                {/* <p className="card-text">unitstock : {a.unitStock}</p> */}
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

export default Adminusers;

