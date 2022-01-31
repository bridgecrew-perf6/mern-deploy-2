import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config';
import axios from 'axios';

const EditUser = () => {
    const {id} =useParams();
    const [username,setusername] = useState();
    const [lastname,setlastname] = useState();
    const [school,setschoolData] = useState();
    const [newschool,newsetschoolData] = useState();

    console.log("school",school)
    // const [userphoto,setphoto] = useState();

    const [selectedFile, setSelectedFile] = useState();


    console.log("selected file",selectedFile)

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }



    const getschool = async () =>{
        const {data} = await axios.get("http://137.184.197.212:5000/api/users/school");
        console.log(data);
        setschoolData(data)

    }
    

    useEffect( async () => {
        const {data} = await axiosInstance.get(`/api/users/${id}`);
        console.log("data",data)
        getschool();
        setusername(data.username)
        setlastname(data.lastname)
        setSelectedFile(data.photo)
        // setschoolData(data.school[0].schoolname)
        
        // setlastname(data.lastname)
        // /setphoto(data.photo)
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
        // console.log("photo",userphoto)
        alert(id)
        

        try {
            await axios.put(`http://137.184.197.212:5000/api/users/updateuser/${id}`, {
                username:username,
                lastname:lastname,
                // photo:userphoto,
            })


        } catch (err) {
            console.log(err)
        }
        
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("clicked")
        console.log("newschool",newschool)
       
        const userFormData = new FormData();
        userFormData.append("username", username)
        userFormData.append("lastname", lastname)
        userFormData.append("school", newschool)
        userFormData.append("photo", selectedFile)

        // alert(id)
        // alert(username)
        // alert(lastname)
        // alert(userphoto)
        // console.log(userphoto)
        // alert()
        try {
            const response = await axios({
                method: "put",
                url: "http://137.184.197.212:5000/api/users/updateuser/"+id,
                data: userFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
        alert("User Updated");
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
            <div>
            <select value={newschool} onChange={e => newsetschoolData(e.target.value)}  >
                     <option value="">Select School</option>
                     {
                         school && school?.map((s) => (
                             <>
                                 <option key={s.schoolname} value={s._id}>{s.schoolname}</option>

                             </>
                         ))
                     }

                 </select>

            </div>
            {/* <input type="file" onChange={e=>setphoto(e.target.files[0])} /> */}
            <input type="file" onChange={handleFileSelect} />
            {/* <img className='mt-3' src={`http://137.184.197.212:5000/images/${userphoto}`} height={80} width={80} /> */}
            <div  style={{ padding: "5px" }}>
                <div >
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </form>
  </>;
};

export default EditUser;
