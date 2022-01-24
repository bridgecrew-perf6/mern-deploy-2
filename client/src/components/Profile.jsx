import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config"

const Profile = () => {
    let navigate = useNavigate();
    const [data, setdata] = useState()
    const [del, setdel] = useState()
    const [username, setusername] = useState()
    
    const[isput,setisput] = useState(false);
    const[updateditem,setupdateditem] = useState()

    async function showdata() {
        const response = await fetch("http://137.184.197.212:5000/api/users/all", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            },
        }
        )
        const data = await response.json();
        setdata(data)
        setusername(data.username)
        console.log(data.username)
        // console.log("all user",data)

    }
    const deletdata = async (Id) => {
        var answer = window.confirm("Are you sure To delete?");
        if (answer) {

            const res = await axios.delete(`http://137.184.197.212:5000/api/users/deleteuser/${Id}`);
            // const res = await axios.delete(`http://localhost:5000/api/users/deleteuser/${Id}`);
            // setTimeout(() => {
            //     setdel(!del);
            // }, 100);
        }
        

    }

    // const Editdata = (e) =>{
    //     e.preventDefault();
    //     const newdata = {
    //         "username":username
    //     }

    //     const {data} = await axiosInstance.put(`http://137.184.197.212:5000/api/users/${Id}`,newdata);

    // }

    const updateUser = async (Id) => {
        

        try {
            await axios.put(`http://137.184.197.212:5000/api/users/update/${Id}`, {
                username:username
            })


        } catch (err) {
            console.log(err)
        }
        setisput(false);
    }


    const EditUser = () =>{
        setisput(true);

    }

    useEffect(() => {
       
        showdata();

    }, [!del])
    return (
        <div>
            <h1>Your can see only your username</h1>
            {
                data && data.map((d) => (
                    <>
                        
                            <input className="form-control" type="text" value={d.username} onChange={e => setusername(e.target.value)} placeholder="User Name" />
                            {isput? <input className="form-control" type="text" defaultvalue={username} onChange={e => setusername(e.target.value)} placeholder="Enter New User Name" />:null}

                        

                        {/* <button className="col-md-1 btn btn-primary" onClick={() =>
                            deletdata(d._id)} > Remove </button> */}

                            {
                                isput?<button className="col-md-1 btn btn-primary" onClick={() =>
                                    updateUser(d._id)} > Update </button>:(<><button className="col-md-1 btn btn-primary" onClick={() =>
                                        EditUser(d._id)} > Edit </button>
                                        <button className="col-md-1 btn btn-primary" onClick={() =>
                                            deletdata(d._id)} > Remove </button>
                                            </>
                                        )
                            }

                        
                    </>
                ))

            }

        </div>
    )
}

export default Profile
