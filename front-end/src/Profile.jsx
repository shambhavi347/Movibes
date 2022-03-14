import React, { useState, useEffect } from "react";
//import  React, { useEffect } from "react";
import NavBar2 from "./NavBar2";
import { profilepic } from "./Image/Images";
import { useNavigate } from "react-router-dom";

const Profile = () =>{
const [userData, setUserData] = useState("");
let navigate = useNavigate();

  const routeChange = () => {
   let path = "/";
    navigate(path);
  };  

    const callProfilePage= async ()=>{
     try{
       const res= await fetch('/profile',{
         method: "GET",
         headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
         },
         credentials: "include"
       });
        const data = await res.json();
        console.log(data);
        setUserData(data);
        if(!res.status === 200)
        {
          const error = new Error(res,error);
          throw error;
        } 
     } catch(err)
     {
        console.log(err);
        routeChange();
     }
    
    }
    useEffect(()=>{
      callProfilePage()
    }, []);

    return(<>
     <NavBar2/>
     <div className="body">
     <div className="main">
       <h1 className="regHead"><h1>Profile</h1></h1>
       <div className="proBox">
       <form method="GET" className="proForm">
             <h2>Username &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userData.name} </h2>
             <h2>Age &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userData.age}  </h2> 
             <h2>Gender &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userData.gender} </h2>  
             </form>
        </div>
       <div className="Img">
         <img className="proImg" src={profilepic} alt="singninimg" />
        </div>            
     </div>   
     </div>
    </>);
};

export default Profile;