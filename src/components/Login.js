import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {

    const [credentials, setcredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
            const response = await fetch("http://localhost:5000/api/auth/login", {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}) 
            });
            const json = await response.json(); 

            if(json.success) 
            {
                //Save the auth-token and redirect
                localStorage.setItem("token", json.authtoken)
                props.showAlert("Logged in Successfully", "success")
                //console.log("Ho gya")
                navigate("/")
            }
            else props.showAlert("Invalid Details", "danger")
    }

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <h2 className='my-2 mt-3'> Login to continue to CC-Notebok</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3" >
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email" onChange={onChange} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} placeholder="Password" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}
