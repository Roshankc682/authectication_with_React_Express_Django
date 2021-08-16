import React , { useState } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Alert , Form , Button} from 'react-bootstrap';
import './Form.css';
import { MDBSpinner , MDBCard,MDBBtn, MDBCardText, MDBCardBody, MDBCardHeader } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [setJwt, UpdatesetJwt] = useState(null);
    
    const [AfterSubmit, UpdateAfterSubmit] = useState(null);
    const [setresponse, Updatesetresponse] = useState("");
    const [errorsetresponse, Updateerrorsetresponse] = useState("");
    const backend_url = "http://localhost:8000";

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const firstname = evt.target.elements.firstname.value;
        const lastname = evt.target.elements.lastname.value;
        const email = evt.target.elements.email.value;
        const password = evt.target.elements.password.value;
        const confirm_pass = evt.target.elements.confirm_pass.value;
        UpdateAfterSubmit(Math.floor(Math.random() * 101))
        if(AfterSubmit === null){     
            document.getElementById("__hide_after_request_").style.display = 'none';
            // return
        }
        // console.log(firstname + ','  + lastname+ ',' + email+ ',' + password+ ',' + confirm_pass)
        if(firstname === "" || lastname === "" || email === "" || password === "" || confirm_pass === "")
	    {	
	    	Updateerrorsetresponse("Did you type all fields !!!");
            Updatesetresponse(null)
            return
	    }
        if(password.localeCompare(confirm_pass))
        {
            Updateerrorsetresponse("Password and repeat password doesn't match");
            Updatesetresponse(null)
            return
        }
        axios.post(backend_url+'/api/register/',{
            first_name:firstname,
            last_name:lastname,
            email:email,
            password:password
          })
          .then((response) => {
                   try{
                        Updateerrorsetresponse(null);
                        Updatesetresponse(response.data.message);
                        document.getElementById("hide__after").style.display = 'none';
                        evt.target.elements.firstname.value = '';
                        evt.target.elements.lastname.value = '';
                        evt.target.elements.email.value = '';
                        evt.target.elements.password.value = '';
                   }catch(e){            
                      Updatesetresponse("something went wrong");
                      Updateerrorsetresponse(null);
                   }
              })
              .catch(err =>{
              try{
                  if(err.response.data.message)
                      {
                          Updatesetresponse(null);
                          Updateerrorsetresponse(err.response.data.message)
                      }
              }catch(e){
                  Updateerrorsetresponse(null);	
                  Updateerrorsetresponse("something went wrong");
               }
              }).finally(() => {
                  try{
                    _unhide__the_hide_after_request_()
                   
                  }catch(e){
                      Updateerrorsetresponse("something went wrong");
                      _unhide__the_hide_after_request_()
                  }
                });
    }
function _unhide__the_hide_after_request_(){
    UpdateAfterSubmit(null)
    if(AfterSubmit === null){     
        document.getElementById("__hide_after_request_").style.display = 'block';
    }
}
return(
    <>
     <div className="alert_center">{
     AfterSubmit?
        <center><MDBBtn disabled>
            <MDBSpinner grow size='sm' role='status' tag='span' className='me-2' />
            <p>Wait for second ..</p><p>Creating account</p>
        </MDBBtn></center>
     : 
     null
     }
    </div>
     {
     (setJwt === null)
            ?
            <div id="__hide_after_request_">
            <div className="Form_div" >
                {setresponse?
                <>
                <MDBCard background='success' className='text-white mb-6' style={{ maxWidth: '25rem' }}>
                    <MDBCardHeader><center>Succesfully Created account</center></MDBCardHeader>
                    <MDBCardBody>
                    {/* <MDBCardTitle></MDBCardTitle> */}
                    <MDBCardText>
                    <center>{setresponse}<br></br><br></br>
                         
                        <Link to="/login">
                            {/* <h6> */}
                            <MDBBtn>Now you can login</MDBBtn>
                            {/* </h6> */}
                        </Link> </center>
                    </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            <br />
                </>
                :null} 
 	            {errorsetresponse?<Alert variant="danger">{errorsetresponse}</Alert>:null} 
                    
                    <div id="hide__after">
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstname" type="text" placeholder="Enter First name" required/>
                    </Form.Group>

                    <Form.Group controlId="lastname">
                        <Form.Label>last Name</Form.Label>
                        <Form.Control  name="lastname" type="text" placeholder="Enter last name" required/>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  name="email" type="email" placeholder="Enter email"required />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control  name="password" type="password" placeholder="Password" required/>
                    </Form.Group>
                    <Form.Group controlId="confirm_pass">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control  name="confirm_pass" type="password" placeholder="Password" required/>
                    </Form.Group>
                    <br></br>
                    <Button id="" className="btn btn-primary" variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                </div>
            </div>
            </div>
            :
    <p><center>Welcome to Home</center></p>
     }
   </>
);
};


export default Signup;