import React,{ useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = ()=>{

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/";
        navigate(path);
    };
    
          const res = fetch("/logout", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
      
        if (res.status === 200 ) {
            window.alert("Successfull logpu Selection!!");
            console.log("Successfull Preference Selection");
            routeChange();
          } else {
            window.alert("ot Successfull logpu Selection!!");
            console.log("not Successfull Preference Selection");
         
          }
   
    
    return(
        <>
            <h1>gout page</h1> 
        </>
    );
};

export default Logout;
