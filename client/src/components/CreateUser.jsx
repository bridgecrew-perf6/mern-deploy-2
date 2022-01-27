import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const CreateUser = () => {
    const [username, setusername] = useState();
    const [lastname, setlastname] = useState();
    const [selectedFile, setSelectedFile] = useState();


    console.log("selected file",selectedFile)

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("clicked")
       
        const userFormData = new FormData();
        userFormData.append("username", username)
        userFormData.append("lastname", lastname)
        userFormData.append("photo", selectedFile)

        try {
            
            const response = await axios({
                method: "post",
                url: "http://137.184.197.212:5000/api/users/post",
                data: userFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
        alert("user created")
    }
    return <>
    <h1>Add user with image</h1><Link to="/userdata" style={{fontSize:"22px",marginBottom:"100px"}}>View User</Link>
        <form style={{marginTop:"34px"}}>
            <div >
                <label>UserName</label>
                <input  type="text" value={username} onChange={e => setusername(e.target.value)}  />
            </div>
            <div >
                <label>lastname</label>
                <input  type="text"  value={lastname} onChange={e => setlastname(e.target.value)}  />
            </div>
            <input type="file" onChange={handleFileSelect} />
            <div  style={{ padding: "5px" }}>
                <div >
                    <button onClick={handleSubmit}  >Submit</button>
                </div>
            </div>
        </form>

    </>;
};
