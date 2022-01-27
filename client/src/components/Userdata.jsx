import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config';
import { Link } from 'react-router-dom';

const Userdata = () => {
    const [user, setuserdata] = useState();

    const userdatas = async () => {
        const { data } = await axiosInstance.get("/api/users/");
        console.log("userdata",data)
        setuserdata(data)
    }
    // const deleteuser=()=>{
    //     const { data } = await axiosInstance.delete("/api/users/");

    // }
    useEffect(() => {
        userdatas();
    }, []);

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
                            
                            <h2>{e.username}</h2> <h2 style={{marginleft:"100px"}}>{e.lastname}</h2>
                            <img src={`http://137.184.197.212:5000/images/${e.photo}`} alt="" height={100} width={100} />
                            {/* <Link to={`/edit/${e._id}`}>Edit</Link>
                            <button className="col-md-1 btn btn-primary" onClick={() =>
                                            deletdata(e._id)} > Remove </button> */}
                            
                        </div>

                    </>
                ))
            }

        </div>



    </>;
};

export default Userdata;
