import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import AlertBox from "../components/AlertBox/AlertBox";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function Login() {

  const {login} =useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [alertMessage, setAlertMessage] = useState(null)
  const [clssName , setClssName] = useState('')
  const navigate = useNavigate();

  

  var API_URL = process.env.REACT_APP_API_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {email,password,});
      // const res = await axios.post(`http://localhost:7001/api/auth/login`, {email,password,});
      console.log(res);
      
      if(res.data.success){
        setAlertMessage(`${res.data.user.name}  Logined...`)
        setClssName('alert-success')
        setTimeout(() => {
          setAlertMessage(null)
        },3000);
        login(res.data.success)
        localStorage.setItem('token',res.data.token)
        if(res.data.user.role === 'admin'){
          navigate('/admin-dashboard')
        }else{
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      console.log(error);
      
      if(error.response.data.success){
        setAlertMessage(error.response.data.message)
        setClssName('alert-danger')
        setTimeout(() => {
          setAlertMessage(null)
        },3000);
      }else{
        setAlertMessage("Server Error")
        setClssName('alert-danger')
        setTimeout(() => {
          setAlertMessage(null)
        },3000);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row">
        {alertMessage && <AlertBox alertMsg={alertMessage} clssName={clssName}></AlertBox>}
          <div className="d-flex align-items-center justify-content-center col-main">
            <div className="col-xl-3 p-5">
              <div className="login-container">
                <h2 className="mb-3 text-light text-center">Panda_EMS</h2>
                <h5 className="mb-5 text-light text-center">
                  Log in to your Account
                </h5>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group text-light">
                    {/* <label htmlFor="email">email</label> */}
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control mb-3"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-group text-light">
                    <div className="input-group">
                      <input
                        type={passwordType}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="*********"
                        required
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={togglePasswordVisibility}>{passwordType === "password" ? "Show" : "Hide"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="form-control btn btn-primary mt-3"
                  >
                    Login
                  </button>
                </form>

                <div className="row mt-md-5">
                  <div className="col-xl-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label text-decoration-none forg"
                        htmlFor="flexCheckDefault"
                      >
                        Default checkbox
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <a href="" className="forg">
                      <strong>Forgot Password ?</strong>
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-light">
                <p>
                  <u>Register an account</u>
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
