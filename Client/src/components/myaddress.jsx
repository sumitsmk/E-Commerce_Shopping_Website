import axios from 'axios'
import { createUrl, log } from '../utils/utils'
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

export function Myaddress(){
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [houseNo, setHouseno] = useState('')
    const [landmark, setLandmark] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState([]);

    const navigate = useNavigate();

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

    useEffect(() => {
     loadAddress();
    }, []);

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
            const url = createUrl(`/address/add?uuid=${userid}`)
            const body = {city,country,houseNo,landmark,pincode};
            
            const token = sessionStorage.getItem("jwt");
            const config = {
                headers:{Authorization:`Bearer ${token}`}
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
        <div style={{margin:"20px"}}>
          {address.map((a) => (
          <div class="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">Address</h5>
    <p className="card-text">{a.house_no}&nbsp;{a.landmark}&nbsp;{a.city}&nbsp;{a.pincode}&nbsp;{a.country}</p>
    <Link to="#" class="btn btn-primary">Update Address</Link>
  </div>
</div>))}

<div class="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title"></h5>
    <Link to='/myaddressreg' className="card-text">Add new Address</Link>
  </div>
</div>

</div>
      );
}