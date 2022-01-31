import React,{useState,useEffect} from 'react';
import axios from "axios"
import { axiosInstance } from '../config';

const Data = () => {
    const [data, setdata] = useState();
    const [firstname, setfirstname] = useState();
    useEffect(() => {
        const fetchdata = async () => {
            // const {data} = await axiosInstance.get("api/db/getdata");
            const {data} = await axios.get("http://137.184.197.212:5000/api/db/getdata");
            console.log(data)
            console.log(data.email)
            console.log(data.firstname)
            setdata(data)
            
            // const{ email,firstname,lastname} = data;

            // setdata(Object.entries(data))
            // console.log(res.data.person.eventsAttended.title)
            // setdata(res.data.person.eventsAttended);
            
        }
        fetchdata();

    }, [])
    return (
        <div>
            <h1>hii</h1>
            <h3>{data?.firstname}</h3>
            <h3>{data?.lastname}</h3>
            <h3>{data?.eventsAttended[0]?.title}</h3>            
            
        </div>
    )
}

export default Data
