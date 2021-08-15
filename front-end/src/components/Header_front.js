import React , { useState , useEffect  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import {Navbar, Nav, Container } from 'react-bootstrap';
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Logout from "./Logout";

const Header_front = () => {
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
       // console.error(error)
       UpdatesetJwt(null);
       // window.location.href = '/login';
     })
 
},[]);


    const _image_name_ = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=612x612&w=0&h=NGxdexflb9EyQchqjQP0m6wYucJBYLfu46KCLNMHZYM="
    return (
        <>
            {
            (setJwt === null)
            ?
            <BrowserRouter>
                <Navbar bg="light" expand="sm">
                <Container>
                <Nav>
                    <Link className="" to="/home"><img src="/favicon.ico" alt='Opps something went wrong' widht='40px' height='40px;'/></Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav><Link  style={{"textDecoration": "none"}} className="m-2" to="/home">Home</Link></Nav>
                    <Nav><Link   style={{"textDecoration": "none"}} className="m-2" to="/login">Login</Link></Nav>
                    <Nav ><Link  style={{"textDecoration": "none"}} className="m-2"  to="/Signup">Signup</Link></Nav>
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/Signup">
                            <Signup />
                        </Route>
                    </Switch>
            </BrowserRouter>
            
            :
            <BrowserRouter>
                <Navbar bg="light" expand="sm">
                <Container>
                <Nav><Link className="" to="/home"><img className="avatar" src={_image_name_} alt='Opps something went wrong' widht='50px' height='50px;'/></Link></Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav><Link  style={{"textDecoration": "none"}} className="m-2" to="/home">Home</Link></Nav>
                    <Nav><Link  style={{"textDecoration": "none"}} className="m-2"  to="/Dashboard">Dashboard</Link></Nav> 
                    <Nav ><Link  style={{"textDecoration": "none"}} className="m-2"  to="/logout">logout
                    </Link></Nav>
                    
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>

                        <Route path="/Dashboard">
                            <Dashboard />
                        </Route>

                        <Route path="/logout">
                            <Logout />
                        </Route>

                    </Switch>
                </BrowserRouter>
            }
        </>
    )
};

export default Header_front;