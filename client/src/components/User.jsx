import React, { useEffect, useState } from 'react';
import axios from "axios"
import { axiosInstance } from '../config';

const User = () => {
    const [user, setuser] = useState();

    // const deleteuser = async(id) =>{
    //     // await axios.delete(`http://localhost:5000/api/users/${id}`);
    //     await axios.delete(`http://localhost:5000/api/users/61dd64a7fa062e4aba4cca49`);
    //     alert("deleted succesfully")
    //     alert(id)
    // }
    const deletedata = async (id)=>{
        await axiosInstance.delete(`http://137.184.197.212:5000/api/users/${id}`);
        alert("deleted");
        alert(id)
       
        
    }

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get("http://137.184.197.212:5000/api/users/");
            console.log(res.data)
            setuser(res.data);
        }
        fetchdata();

    }, [])
    return (
        <div>
            Userdata
            {
               user && user.map((u,key) => (
                    <>

                        <h1 key={u._id}>{u.username}</h1>
                        <img src={`http://137.184.197.212:5000/images/${u.photo}`} alt="" />
                        <button type="button" class="btn btn-primary"  onClick={()=>
                                            deletedata(u._id)}>Delete</button>
                        <h1 >{u._id}</h1>
                    </>



                )

                )
            }

        </div>
    )
}

export default User
