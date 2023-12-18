import Axios from "axios"
import React, {useEffect, useState} from 'react'

const [data,setData] = useState("");
  const getData = async() =>{
    const response = await Axios.get("https://localhost:3000/getData")
    setData(response.data);
  }
useEffect(()=>{
    getData()   

},[]);
return(
    <div>{data}</div>
)
export default Integration;