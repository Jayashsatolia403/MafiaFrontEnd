import React, {useState} from 'react';
import './Login.css';
import { withRouter } from "react-router-dom";

function Login(props) {
    const [state , setState] = useState({
        username: "",
        password : "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendRegistrationDetails = () => {
        if (state.username.length && state.password.length) {
            const information = {
                "username": state.username,
                "password": state.password,
            }
            fetch("http://127.0.0.1:8000/login/", {
                method: 'POST', 
                body: JSON.stringify(information),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                return res.json()
              })
              .then(data => console.log(data))
              .catch(error => console.log("Error"))
        } else {
            console.log("Error")  
        }
    }
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendRegistrationDetails()
    }
    return(
        <>
            <h1>Welcome to Login Page!</h1>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="email" 
                            className="form-control" 
                            id="username" 
                            placeholder="Enter Username" 
                            value={state.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >
                        Login
                    </button>
                </form>            
            </div>
        </>
    )
}

export default withRouter(Login);