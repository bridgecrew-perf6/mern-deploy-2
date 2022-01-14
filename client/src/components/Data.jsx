import React,{useState,useEffect} from 'react';
import axios from "axios"

const Data = () => {
    const [data, setdata] = useState();
    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get("http://localhost:5000/api/db/getdata");
            
        
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
