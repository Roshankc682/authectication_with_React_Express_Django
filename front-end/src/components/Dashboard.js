import React , { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const Dashboard = () => {

  const backend_url = "http://localhost:8000";
  const [setJwt, UpdatesetJwt] = useState(null);

  useEffect(() => {
    axios.post(backend_url+'/api/access/refresh/',{payload:null},{ withCredentials: true })
        .then((respose) => {
        // console.log(res.data)
              try{
                    UpdatesetJwt(respose.data["access"]);
                }catch(e){
                    UpdatesetJwt(null);
                }
        })
        .catch((error) => {
                try{
                    UpdatesetJwt(null);
                }catch(e){}
        })
},[]);
useEffect(() => {
  
  if(setJwt != null){
  const interval = setInterval(() => {
    axios.get(backend_url+'/api/token/new/',{ headers: {'Authorization': `Bearer ${setJwt}`},withCredentials: true})
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
  <p><center>Something went wrong</center></p>
  :
  <p><center>Welcome to Dashboard</center></p>
   }

  </>
  );
};

export default Dashboard;