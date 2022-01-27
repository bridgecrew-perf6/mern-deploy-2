import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config';
import axios from 'axios';

const EditUser = () => {
    const {id} =useParams();
    const [username,setusername] = useState();
    const [lastname,setlastname] = useState();
    const [userphoto,setphoto] = useState();
    useEffect( async () => {
        const {data} = await axiosInstance.get(`/api/users/${id}`);
        setusername(data.username)
        setlastname(data.lastname)
        setlastname(data.lastname)
        setphoto(data.photo)
        // console.log("userdetails",data)
        // console.log("username",data.username)
        // console.log("username",data.lastname)
        // console.log("username",data.photo)
        
    }, []);

    // console.log("iiiiiiiddddddd",id)
    //     console.log("iiiiiiiddddddd",username)
    //     console.log("iiiiiiiddddddd",lastname)
    //     console.log("photo",userphoto)


    const updateUser = async () => {
        console.log(" inside div",id)
        console.log("iiiiiiiddddddd",username)
        console.log("iiiiiiiddddddd",lastname)
        console.log("photo",userphoto)
        alert(id)
        

        try {
            await axios.put(`http://localhost:5000/api/users/updateuser/${id}`, {
                username:username,
                lastname:lastname,
                photo:userphoto,
            })


        } catch (err) {
            console.log(err)
        }
        
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("clicked")
       
        
        const userFormData = new FormData();
        userFormData.append("username", username)
        userFormData.append("lastname", lastname)
        userFormData.append("photo", userphoto)
        alert(id)
        alert(username)
        alert(lastname)
        alert(userphoto)
        // console.log(userphoto)
        // alert()
        try {
            const response = await axios({
                method: "put",
                url: "http://localhost:5000/api/users/updateuser/"+id,
                body: userFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
        alert("Edit User")
    }
    const handleFileSelect = (event) => {
        setphoto(event.target.files[0])
    }
    
  return <>
  <h1>Edit User</h1>
  <form style={{marginTop:"34px"}}>
            <div >
                <label>UserName</label>
                <input  type="text" value={username} onChange={e => setusername(e.target.value)}  />
            </div>
            <div >
                <label>lastname</label>
                <input  type="text"  value={lastname} onChange={e => setlastname(e.target.value)}  />
            </div>
            {/* <input type="file" onChange={e=>setphoto(e.target.files[0])} /> */}
            <input type="file" onChange={handleFileSelect} />
            {/* <img className='mt-3' src={`http://137.184.197.212:5000/images/${userphoto}`} height={80} width={80} /> */}
            <div  style={{ padding: "5px" }}>
                <div >
                    <button onClick={handleSubmit}  >Submit</button>
                </div>
            </div>
        </form>
  </>;
};

export default EditUser;
