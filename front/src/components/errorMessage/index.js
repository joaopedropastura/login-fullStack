import { Button } from "react-bootstrap"
import { useContext, useState } from "react";
import { AlertContext } from "../../context/alertContext";


const ErrorMessage = () => {
        const {message} = useContext(AlertContext)
        
        return (
            <>
                <span> {message} </span>    
            </>
        )
}

export default ErrorMessage