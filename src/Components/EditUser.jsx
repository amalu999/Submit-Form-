import React, { useEffect, useState } from 'react'
import "./addUser.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const {id}=useParams();
  {console.log("id is",id);}
  const [upinput,setupinput]=useState({})
  const navigate = useNavigate();
  const [focus,setFocus]=useState({
    errusername:"false",
    erremail:"false",
    errcontact:"false"
  })
  
  const getusertoupdate =async()=>{
    const resp=await axios.get(`http://localhost:3005/user/${id}`)
    console.log("response data",resp.data);
    setupinput(resp.data)
  }
  useEffect(()=>{
    getusertoupdate()
  },[])
  {console.log("upinput",upinput);}
  const handleuser=(e)=>{

    
    const name=e.target.name
    const value=e.target.value 
    setupinput((values)=>({...values,[name]:value}))
 
  }
  const updateuser=async(e)=>{
    e.preventDefault();
    const resp=await axios.patch(`http://localhost:3005/user/${id}`,{
      username:upinput.username,
      email:upinput.email,
      contact:upinput.contact

    })
    navigate("/")




  }
  return (
    <div className="formcss">
      <h2 style={{textAlign:"center"}}>Update User</h2>
       <form onSubmit={updateuser}>
        <div className="mb-3">
          <label
            htmlFor="Username1"
            className="form-label"
            style={{ textAlign: "left" }}
          >
            Username
          </label>
          <input
            type="username"
            className="form-control"
            id="EmUsername1"
            aria-describedby="Usernamehelp"
            placeholder="Enter your Name"
            name="username"
            value={upinput.username}
            onChange={handleuser}
            required
            pattern='^[0-9A-Za-z ]{6,16}$'
            onBlur={()=>{
              setFocus({...focus,errusername:"true"})
            }}
            focus={focus.errusername.toString()}
          />
          <span >
          Username must be atleast 10 characters
        </span>
        </div>
        

        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email1"
            aria-describedby="emailHelp"
            placeholder="Enter your Email"
            name="email"
            value={upinput.email}
            onChange={handleuser}
            required
            onBlur={()=>{
              setFocus({...focus,erremail:"true"})
            }}
            focus={focus.erremail.toString()}
          />
          <span>Email must be valid</span>
        </div>
        
        <div className="mb-3">
          <label htmlFor="Contact" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            className="form-control"
            id="Contact1"
            aria-describedby="contacthelp"
            placeholder="Enter your Contact"
            name="contact"
            value={upinput.contact}
            onChange={handleuser}
            required
            pattern='^\d{10}$'
            onBlur={()=>{
              setFocus({...focus,errcontact:"true"})
            }}
            focus={focus.errcontact.toString()}
          />
          <span>contact at least 10 numbers</span>
        </div>
        
        <div>
          <button type="submit" className="btn btn-success" >Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditUser