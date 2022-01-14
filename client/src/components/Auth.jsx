import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";


const Auth = () => {
    const [username, setusername] = useState();
    const [password, setpassword] = useState(); 
    let navigate = useNavigate();

  

    const submitdata = async(e) => {
        e.preventDefault();
        alert("sbach Gjxzh")
        const response = await fetch("http://localhost:5000/api/users/register",{method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })}
        )
        const res = response.json();
        console.log(res);
        alert("register")

    }

    const loginsubmitdata = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/users/login",{method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })}
        )
        console.log(response.status)
        console.log(response.data)
        console.log(response)
        const res = await response.json();
        console.log(res.user)
        console.log(res)
        if(res.user){
            localStorage.setItem('token', res.user);
            navigate("/profile")

            alert("Login succesfully")
        }else{
            alert("wrong username")
        }
       

    }

    return (
        <div>
            <h1>Register</h1>
            <form  onSubmit={submitdata}>
               <input type="text" value={username} onChange={e=>setusername(e.target.value)} placeholder='name'/><br/>
               <input type="password" value={password} onChange={e=>setpassword(e.target.value)} placeholder='password'/><br/>
                <input type="submit" value="Register"  />

            </form>
            <h1>Login</h1>
            <form  onSubmit={loginsubmitdata}>
               <input type="text" value={username} onChange={e=>setusername(e.target.value)} placeholder='name'/><br/>
               <input type="password" value={password} onChange={e=>setpassword(e.target.value)} placeholder='password'/><br/>
                <input type="submit" value="Register"  />

            </form>

            {/* <div className="col-md-4">
                                    <form className="card" onSubmit={submitdata}>
                                        <div className="input-group">
                                            <input type="text" value={username} className="form-control" onChange={(e) => setusername(e.target.value)} placeholder="Promo code" />
                                            <button type="submit" className="btn btn-danger">Redeem</button>
                                        </div>
                                    </form>

                                </div> */}

        </div>
    )
}

export default Auth
