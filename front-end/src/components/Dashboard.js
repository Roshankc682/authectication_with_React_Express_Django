import React , { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge} from 'react-bootstrap';
import axios from 'axios'
import { MDBSpinner,MDBBtn} from 'mdb-react-ui-kit';
const Dashboard = () => {

  const [setJwt, UpdatesetJwt] = useState(null);
  const backend_url = "http://localhost:8000";

  useEffect(() => {
      axios.get(backend_url+'/api/token/refresh',{ withCredentials: true })
   .then((respose) => {
     // console.log(res.data)
     try{
       UpdatesetJwt(respose.data["access"]);
      //  _call_with_response_(respose.data["access"])
     }catch(e)
     {
        UpdatesetJwt(null);
     }
   })
   .catch((error) => {
     UpdatesetJwt(null);
     // window.location.href = '/login';
   })

},[]);

useEffect(() => {
    if(setJwt != null){
    const interval = setInterval(() => {
      axios.get(backend_url+'/api/token/token_refresh',{ headers: {'Authorization': `Bearer ${setJwt}`},withCredentials: true})
          .then((respose) => {
            // console.log(respose.data)
            try{
            UpdatesetJwt(respose.data["access"]);
            }catch(e)
            {
               UpdatesetJwt(null);
            }
            
          })
          .catch((error) => {
              // console.log(error)
              UpdatesetJwt(null);
          })
    }, 270000);
    return () => clearInterval(interval);
  }
  
  }, [setJwt]);

return (
  <>
   {
  (setJwt === null)
  ? 
  
       <center><MDBBtn disabled className='mt-5'>
           <MDBSpinner grow size='lg' role='status' tag='span' className='me-2' />
           <p style={{"fontSize":"18px"}}>Wait for second ...</p>
           <Badge bg="danger" style={{"fontSize":"20px"}}>Refresh the page</Badge>
       </MDBBtn></center>
   
  :
  <center><MDBBtn disabled className='mt-5'>
           <Badge bg="success" style={{"fontSize":"20px"}}>Welcome to dashboard </Badge>
       </MDBBtn></center>
   }

  </>
  );
};

export default Dashboard;