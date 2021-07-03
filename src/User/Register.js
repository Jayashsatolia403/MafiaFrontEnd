import React, {useState} from 'react';
import './Register.css';
import { withRouter } from "react-router-dom";

function Register(props) {
    const [state , setState] = useState({
        username: "",
        email : "",
        password : "",
        confirmPassword: "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendRegistrationDetails = () => {
        if (state.email.length && state.password.length) {
            // props.showError(null)
            const information = {
                "username": state.username,
                "email": state.email,
                "password": state.password,
                "password2": state.confirmPassword
            }
            fetch("http://127.0.0.1:8000/register/", {
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
            props.showError('Please enter valid username and password')    
        }
    }
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendRegistrationDetails()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <>
            <h1>Welcome to Registration Page!</h1>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Enter Username" 
                            value={state.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email" 
                            value={state.email}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={handleChange} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default withRouter(Register);