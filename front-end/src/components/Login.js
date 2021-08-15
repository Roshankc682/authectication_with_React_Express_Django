import React , { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Form , Button } from 'react-bootstrap';
import './Form.css';
import axios from 'axios'
import { MDBSpinner,MDBBtn} from 'mdb-react-ui-kit';

const Login = () => {
    const backend_url = "http://localhost:1337"
    const [errorsetresponse, Updateerrorsetresponse] = useState(null);
    const [setJwt, UpdatesetJwt] = useState(null);
    const [AfterSubmit, UpdateAfterSubmit] = useState(null);

    const loginsubmit = (evt) => {
        evt.preventDefault();
        const email = evt.target.elements.email.value;
        const password = evt.target.elements.password.value;
        UpdateAfterSubmit(Math.floor(Math.random() * 101))
        Updateerrorsetresponse(null)
        if(AfterSubmit === null){     
            document.getElementById("__hide_after_request_").style.display = 'none';
            // return
        }

        // console.log(email + ',' + password)
        axios.post(backend_url+'/api/login',{
            email:email,
            password:password,
          })
          .then((response) => {
            try{
               Updateerrorsetresponse(null)
               UpdatesetJwt(response.data["access"]);
            //    console.log(response.data["access"])
              //  window.location.href = '/home';
            }catch(e){
              Updateerrorsetresponse("something went wrong")
            }
            })
            .catch(err =>{
             // console.log(err.response.data.detail)
             try{
             UpdatesetJwt(null);
             Updateerrorsetresponse(err.response.data.message)    
            }catch(e){
              Updateerrorsetresponse("something went wrong")
            }
            }).finally(() => {
              try{
                __hide_after_request_()
              }catch(e){
                __hide_after_request_() 
              }
              });
    }

    function __hide_after_request_(){
        try{
            UpdateAfterSubmit(null)
            if(AfterSubmit === null){     
                document.getElementById("__hide_after_request_").style.display = 'block';
            }
          }catch(e){
            
          }
        
    }
return(
    <>
     <div className="alert_center">{errorsetresponse?<Alert variant="danger">{errorsetresponse}</Alert>: null}
    </div>
    <div className="alert_center">{
     AfterSubmit?
        <center><MDBBtn disabled>
            <MDBSpinner grow size='sm' role='status' tag='span' className='me-2' />
            <p>Wait for second ...</p>
            <p style={{"color":"#ffc107"}}>!!! Checking provided data valid or not !!!</p>
        </MDBBtn></center>
     : 
     null
     }
    </div>
     {
     (setJwt === null)
            ?
            <div className="Form_div" id="__hide_after_request_">
            <Form onSubmit={loginsubmit}>
        
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>
        
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>
                <br></br>
                <Button id="" className="btn btn-primary" variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </div>
            :
        <div>
            <center><MDBBtn disabled>
                <MDBSpinner grow size='sm' role='status' tag='span' className='me-2' />
                Loading ...
             </MDBBtn></center>
        </div>
     }
   </>
);
};


export default Login;