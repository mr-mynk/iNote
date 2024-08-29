import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
    const host = "http://localhost:5000";
    const [credentials,setCredentials] = useState({name:"",email:"",password:""})
    const navigate = useNavigate(); 
    const handleSubmit = async(e) =>{ 
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch(`${host}/createUser`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        if (json){
            localStorage.setItem('user',json);
            navigate("/")
            props.showAlert('success','User created successfully, Please login with your credentials now.!')
        }else{
            props.showAlert('danger','Some error occured.!');
        }
        // console.log(json);
    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='container my-5'>
      <form className='my-5' onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange} required/>
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} minLength={8} required/>
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
    </form>
    </div>
  )
}

export default SignUp
