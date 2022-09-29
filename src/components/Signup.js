import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setcredentials] = useState({email: "", password: "", cpassword: ""})
  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const {name, email, password}= credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}) 
        });
        const json = await response.json(); 
        if(json.success){
            localStorage.setItem("token", json.authtoken)
            navigate("/")
            props.showAlert("Account Created Successfully", "success")
        }
        else{
          props.showAlert("Invalid Credentials" , "danger")
        }
    }

const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className='container mt-2'>
      <h2 className='my-2'> Create an account to use CC-Notebok</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword"  name="cpassword" placeholder="Confirm Password" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup