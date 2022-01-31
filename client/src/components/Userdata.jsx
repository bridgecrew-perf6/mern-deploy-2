import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Userdata = () => {
    const [user, setuserdata] = useState();

    const userdatas = async () => {
        const { data } = await axiosInstance.get("/api/users/");
        // const { data } = await axios.get("http://localhost:5000/api/users/");
        console.log("userdata",data)
        setuserdata(data)
    }
    // const deleteuser=()=>{
    //     const { data } = await axiosInstance.delete("/api/users/");

    // }
    useEffect(() => {
        userdatas();
    }, []);

    const deletdata = async (Id) => {
        console.log("id",Id)
        var answer = window.confirm("Are you sure To delete?");
        
        
        if (answer) {

            const res = await axios.delete(`http://137.184.197.212:5000/api/users/deletedata/${Id}`);
            
        }
        

    }

    return <>
        <h1>User data</h1>
        <div className="users-data">
            <Link to="/createuser" style={{fontSize:"22px",marginBottom:"100px"}}>Create User </Link>
            <div style={{display:"flex"}}>
            </div>

            {
                user?.map((e) => (
                    <>
                        <div className="user-data" style={{ display: "flex",justifyContent:"space-between",alignItems:"center",width:"100vw" }}>
                            
                            <h2>{e.username}</h2> <h2 style={{marginleft:"50px"}}>{e.lastname}</h2><h2 style={{marginleft:"50px"}}>{e.school[0].schoolname}</h2>
                            <img src={`http://137.184.197.212:5000/images/${e.photo}`} alt="" height={100} width={100} />
                             <Link to={`/edit/${e._id}`}>Edit</Link>
                            <button onClick={() =>deletdata(e._id)} > Remove </button> 
                            
                        </div>

                    </>
                ))
            }

        </div>



    </>;
};

export default Userdata;
