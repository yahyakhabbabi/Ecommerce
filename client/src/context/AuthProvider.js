<<<<<<< HEAD
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children}) =>{
    const [auth, setAuth] = useState({});
    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
=======
import React from 'react'
import {createContext,useState} from "react";

const AuthContext = createContext({});

export const  AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({});
  return (
    <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}
 export default AuthContext;




>>>>>>> 13903c1940524485a32f8fb8a0d9b8a214f185f7
