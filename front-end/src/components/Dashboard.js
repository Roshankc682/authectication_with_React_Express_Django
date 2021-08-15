import React , { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

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


return (
  <>
   {
  (setJwt === null)
  ? 
  <p><center>Something went wrong</center></p>
  :
  <p><center>Welcome to Dashboard</center></p>
   }

  </>
  );
};

export default Dashboard;