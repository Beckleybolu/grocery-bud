import React, { useEffect } from 'react'

const Alert = ({type,msg,displayAlert,list}) => {
  
useEffect(()=>{
  const timeOut = setTimeout(()=>{
      displayAlert();
  },3000);

 return ()=> clearTimeout(timeOut);
},[list]);
    return <p className={`alert alert-${type}`}>{msg}</p>
  }
  
  export default Alert