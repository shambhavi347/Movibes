import React  from 'react';
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
    if (res.status !== 200 ) {
      window.alert("not  logout Successfully!!");   
       } else {
        console.log("Successfull logout ");
        routeChange();
    }
     
    return(
        <>
            <h1>logout page</h1> 
        </>
    );
};

export default Logout;
