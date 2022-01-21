import React,{useEffect,useState} from 'react';
// import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    let navigate = useNavigate();
    const [data, setdata] = useState()

    async function showdata(){
        const response = await fetch("http://137.184.197.212:5000/api/users/all",{
        headers:{
            'x-access-token':localStorage.getItem("token")
        },
        }
        )
        const data = await response.json();
        setdata(data)
        console.log("all user",data)


    }

    useEffect(() => {
        // const token = localStorage.getItem("token");
        // if(token){
        //     // const user = jwt.decode(token)
        //     const user = null
        //     if(!user){
        //         localStorage.removeItem("token");
        //         navigate("/")   
        //     }else{
        //         showdata();
        //     }
        // }
        showdata();
         
    }, [])
    return (
        <div>
            <h1>Your can see only your username</h1>
            {
                data && data.map((d)=>(
                    <>
                    <h1>{d.username}</h1>
                    </>
                ))

            }
            
        </div>
    )
}

export default Profile
