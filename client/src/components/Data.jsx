import React,{useState,useEffect} from 'react';
import axios from "axios"
import { axiosInstance } from '../config';

const Data = () => {
    const [data, setdata] = useState();
    useEffect(() => {
        const fetchdata = async () => {
            const res = await axiosInstance.get("api/db/getdata");
            console.log(res.data.person.eventsAttended.title)
            setdata(res.data.person.eventsAttended);
        }
        fetchdata();

    }, [])
    return (
        <div>
            <h1>hii</h1>
            
                 {
                    data && data.map((d)=>(
                        <>
                        <h1>{d.title}</h1>
                        </>
                    ))
    
                }
            
            
        </div>
    )
}

export default Data
