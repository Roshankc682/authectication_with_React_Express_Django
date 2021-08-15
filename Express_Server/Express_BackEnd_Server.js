// =========================
// npm init
// npm install express
// npx nodemon
// =========================
import Express, { response , request } from "express";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require("node-fetch");
// var cookie = require('cookie');
const app = Express();
const port = 1337;
app.use(Express.json());
// app.use(Express.urlencoded({ extended: true}))
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.post("/api/login",(req, res)=> {
  // console.log(req)
    if(req.method)
    {  
        const backend_url_for_login = "http://localhost:8000/api/token/api_hide/"
        const email = req.body.email
        const password = req.body.password
        if(!email)
          return res.status(400).json({"message": "email missing !!"})
        if(!password)
          return res.status(400).json({"message": "password missing !!"})
        
        try{
            const data = { email: email, password: password };
            fetch(backend_url_for_login, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
              .then(response => response.json())
              .then(data => {
                // console.log(data.refresh);                
                // console.log(data.access);
                if(data.refresh)
                {
                // samesite="none", secure=True, httponly=True)
                  // res.cookie('refresh',data.refresh, { maxAge: 900000 ,sameSite: true,secure: true ,httpOnly: true,path:"/"})
                  res.cookie('refresh',data.refresh, { sameSite: "none",secure: true,httpOnly: true})
                }else{
                  return res.status(401).json({"message": "There was no credentials found !!! "})
                }
                return res.status(200).json({"access": data.access})
              })
              .catch((error) => {
                 return res.status(500).json({ "message": 'Are you sure you sending valid data !!! '})
              });   
           }catch(err){
               return res.status(500).json({ "message": 'Something went wrong !!!'});
           }
    }else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({"message": `Method ${req.method} not allowed`})
    }

    // console.log(req.body);
    // res.sendStatus(401);
})


// app.use(cors({
//   credentials: true,
//   origin: "http://localhost:3000"
// }));
// app.post("/api/token/refresh",(req, res)=> {
//   // console.log(req)
//     if(req.method)
//     {  
//       if(!req.cookies){
//         return res.status(400).json({ "message": 'Something went wrong !!!'});
//       }else
//       {
//         console.log("test")
//         return res.status(200).json({ "message": 'Awsome'});
//       }
//     }else{
//       res.setHeader('Allow',['POST']);
//       return res.status(405).json({"message": `Method ${req.method} not allowed`})
//   }
// })

app.listen(port, ()=> 
{
    console.log("listening on port " + port)
})