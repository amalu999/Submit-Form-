import React, { useEffect, useState } from 'react'
import "../layout.css"
import axios from "axios"
import { Link } from 'react-router-dom'

const Layout = () => {
    const [userinput,setuserinput] =useState([])
    
    const deleteme=async(id)=>{
      await axios.delete(`http://localhost:3005/user/${id}`)
      .then(response=>{
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
      })
      Users();
    }
    const Users=async ()=>{
       const resp= await axios.get("http://localhost:3005/user")
        console.log(resp.data);
        setuserinput(resp.data)
    }
    useEffect(()=>{
        Users();
        
        
    },[])

  
  return (
    <div  style={{textAlign:'center'}}>
      <Link to={"add"} >
      <button type="button" className="btn btn-info">Add User</button>
      </Link>
      
        <div className='tableclass'>
        <table className="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">Index</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
      
     {
            userinput.map((e)=>{
                return(
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.username}</td>
                      <td>{e.email}</td>
                      <td>{e.contact}</td>
                      <td className='buttonclass'>
                      <button style={{marginRight:"16px"}} type="button" className="btn btn-outline-info">
                        <Link to={`edit/${e.id}`}>Edit</Link>
                        </button>
                      <button style={{marginRight:"16px"}} type="button" className="btn btn-outline-danger"
                      onClick={()=>deleteme(e.id)}>Delete</button></td>
                    </tr>
                )


            })
        } 
 </tbody>
</table>
        </div>
        
    </div>
  )
}

export default Layout