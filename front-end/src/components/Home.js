import React , { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge} from 'react-bootstrap';
import axios from 'axios'
import { MDBBtn} from 'mdb-react-ui-kit';

const Home = () => {
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
    console.log("yes run after few second ")
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

return(
    <>
     {
     (setJwt === null)
            ?
            <center><MDBBtn disabled className='mt-5'>
           <Badge bg="danger" style={{"fontSize":"20px"}}>Home without login</Badge>
            </MDBBtn></center>
            :
            <center><MDBBtn disabled className='mt-5'>
           <Badge bg="success" style={{"fontSize":"20px"}}>You are loggedIn</Badge>
            </MDBBtn></center>
     }
   </>
);
};

export default Home;