import axios from "axios" 
 
 export const axiosInstance = axios.create({
     baseURL : "http://137.184.197.212:5000"
 })