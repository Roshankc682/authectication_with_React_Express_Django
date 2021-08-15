import React , { useState , useEffect } from "react";
import {Badge} from 'react-bootstrap';
import axios from 'axios'
import { MDBSpinner,MDBBtn} from 'mdb-react-ui-kit';
import './Form.css';

const Logout = () => {
  const backend_url = "http://localhost:8000";
  const front_end = "http://localhost:3000";  
const [setJwt, UpdatesetJwt] = useState(null);

 useEffect(() => {
        axios.get(backend_url+'/api/logout',{ withCredentials: true })
        .then((res) => {
          try{
            UpdatesetJwt(null);
            window.location.href = front_end+"/login";
          }catch(e){
           
            console.log("Errro 1")
          }
        })
        .catch((error) => {
         try{
            UpdatesetJwt(null);
            window.location.href = front_end+"/login";
            // window.location.href = "https://"+window.location.host+"/login";
          }catch(e){
            
            // console.log("Errro 4")
            
          }
        })
  },[]);



return (
  <> 
  {
  (setJwt === null)
  ?  
      <div className="alert_center">
      <center><MDBBtn disabled className='mt-5'>
           <MDBSpinner grow size='lg' role='status' tag='span' className='me-2' />
           <p style={{"fontSize":"18px"}}>Wait for second ...</p>
           <Badge bg="danger" style={{"fontSize":"20px"}}>Logging Out</Badge>
       </MDBBtn></center>
    </div>
        
   :
   <div>
      
   </div>
 }
  </>
  );
};

export default Logout;