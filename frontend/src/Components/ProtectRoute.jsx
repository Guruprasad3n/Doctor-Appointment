import { Navigate } from "react-router-dom"

function ProtectRoute({children}){
    if(localStorage.getItem("token")){
        return children
    }else{
        return <Navigate to={"/login"}/>
    }
}