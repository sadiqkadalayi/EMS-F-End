import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';

function Login() {

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const handleSubmit= async (e)=>{
      e.preventDefault(); 
        alert("ok")
        try {
            const res = await axios.post('http://localhost:7001/api/auth/login', {email,password})
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <>
      <div className="container-fluid bg-danger">
        <div className="row">
          <div className="d-flex align-items-center justify-content-center col-main">
            <div className="col-md-4 p-5 border rounded">
              <div className="login-container">
                <h2 className="mb-3 text-light">Login</h2>

                <form onSubmit={handleSubmit}>
                <div className="form-group text-light"> 
                  <label htmlFor="email">email</label>
                  <input type="text" id="email"  name="email" onChange={(e)=>setEmail(e.target.value)}  className="form-control"  placeholder="Enter email"   required  />
                </div>
                <div className="form-group text-light">
                  <label htmlFor="password">Password</label>
                  <input  type="text" name="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="*********"  required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>
                </form>


                <div className="row mt-md-5">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                      <label
                        className="form-check-label text-decoration-none forg"
                        for="flexCheckDefault" >
                        Default checkbox
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                   <a href="" className="forg"><strong>Forgot Password ?</strong></a>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-light">
                <p>
                  if yor are not register an account ! Please go through the
                  <u>Sign Up </u>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
