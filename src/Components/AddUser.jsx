import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addUser.css";

const AddUser = () => {
  const [input, setinput] = useState({});
  const [focus ,setFocus]=useState({
    errusername:"false",
    erremail:"false",
    errcontact:"false"
  })
  const navigate = useNavigate();


  function handlesubmit(e) {
    e.preventDefault();

    const submitteddata = axios
      .post("http://localhost:3005/user", {
        username: input.username,
        email: input.email,
        contact: input.contact,
      })
      .then((response) => {
        console.log(response.status, response.data.token);
      });
    navigate("/");
  }
  function handleme(e) {
    const name = e.target.name;
    const value = e.target.value;
    setinput((values) => ({ ...values, [name]: value }));
  }

  return (
    <div className="formcss">
      <h2 style={{ textAlign: "center" }}>ADD USER</h2>
      <form onSubmit={handlesubmit}>
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
            value={input.username}
            onChange={handleme}
            required
            pattern="^[0-9A-Za-z ]{6,16}$"
            
            onBlur={()=>setFocus({...focus,errusername:"true"})}
            focus={focus.errusername.toString()}
          />
             <span >
          Username must be 8-20 characters
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
            value={input.email}
            onChange={handleme}
            required
            onBlur={()=>setFocus({...focus,erremail:"true"})}
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
            value={input.contact}
            onChange={handleme}
            required
            pattern="^\d{10}$"
            onBlur={()=>setFocus({...focus,errcontact:"true"})}
            focus={focus.errcontact.toString()}
          />
          <span>contact at least 10 numbers</span>
        </div>
        
        <div>
          <input type="submit" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
