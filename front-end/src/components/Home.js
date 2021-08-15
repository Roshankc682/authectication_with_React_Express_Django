import React , { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [setJwt, UpdatesetJwt] = useState(null);
return(
    <>
     {
     (setJwt === null)
            ?
            <center><p>You are not logge in</p></center>
            :
            <center><p>Welcome to Home</p></center>
     }
   </>
);
};

export default Home;