import React, { useEffect, useState } from "react";

export const AlertContext = React.createContext()

export const AlertProvider = ({
    children
}) => {
    const [message, setMessage] = useState('')
    const[show, setShow] = useState(false)
    

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)   
    }, [show])


    return (
        <AlertContext.Provider value={{message, setMessage, show, setShow}}>
            {children}
        </AlertContext.Provider>
    )
}
