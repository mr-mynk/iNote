import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const host = "http://localhost:5000";
    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate(); 
    const handleSubmit=async(e) =>{ 
        e.preventDefault();
        const {email,password} = credentials;
        const response = await fetch(`${host}/userLogin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email,password})
        });
        const json = await response.json();
        if (json.token){
            localStorage.setItem('token',json.token);
            navigate("/home")
            props.showAlert('success','User logged in successfully.!')
            
        }else{
            props.showAlert('danger','Invalid credentials.!')
            setCredentials({email:"",password:""})
        }
        // console.log(json);
        // console.log('----:-',localStorage.getItem('token'));
    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }


  return (
    <form className='my-5' onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange} required/>
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} minLength={8} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login
