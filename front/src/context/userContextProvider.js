import { useState } from "react"
import UserContext from "./userContext"

const UserProvider = ({children}) => {
    const [token, setToken] = useState('')

    const createToken = (token) => {
        setToken(token)
        sessionStorage.setItem('token', token)
    }

    const deleteToken = () => {
        setToken('')
        sessionStorage.removeItem('token')
    }

    const value = {
        token,
        createToken,
        deleteToken
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider