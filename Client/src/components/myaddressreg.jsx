import axios from 'axios'
import { createUrl, log } from '../utils/utils'
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

export function Myaddressreg(){
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [houseNo, setHouseno] = useState('')
    const [landmark, setLandmark] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState([]);

    const navigate = useNavigate();

    const registerAddress = async () => {
        if (city.length == '') {
          toast.error('Please enter City')
        } else if (country.length == '') {
          toast.error('Please enter Country')
        } else if (houseNo.length == '') {
          toast.error('Please enter House No')
        } else if (landmark.length == '' ) {
          toast.error('Please enter Landmark')
        } else if (pincode.length == '') {
          toast.error('Please enter Pincode')
        } else {

            
            const userid = sessionStorage.getItem("id");
            const url = createUrl(`/address/add/uuid/${userid}`)
            const body = {city,country,houseNo,landmark,pincode};
            
            const token = sessionStorage.getItem("jwt");
            const config = {
                headers:{'Authorization':`Bearer ${token}`,
                        'Content-Type': 'application/json', }
              };

          try{
            const response = await axios.post(url, body,config);
            toast.success('Successfully registered a new address')
        }catch(error){
            console.error('Error fetching data: ',error);
            toast.error('Error while registering a new address, please try again')
            return null;
        } 
          }
        }

    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
       <h1 style={{ textAlign: 'center', margin: 10 }}>Register Address</h1>
    
    <div className='row'>
      <div className='col-12 d-flex justify-content-center'>
        <div className='form'>
          <div className='mb-3'>
            <label htmlFor=''>City</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Country</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => {
                setCountry(e.target.value)
              }}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>House No</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => {
                setHouseno(e.target.value)
              }}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Landmark</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => {
                setLandmark(e.target.value)
              }}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Pin Code</label>
            <input
              type='number'
              className='form-control'
              onChange={(e) => {
                setPincode(e.target.value)
              }}
            />
          </div>
     
          <div className='mb-3'>
 <button type="button" onClick={() => {navigate('/myaddress')}} className="btn btn-success">
                    Back
                  </button>&nbsp; &nbsp;
            <button onClick={registerAddress} className='btn btn-success'>
              Register Address
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
      );
}