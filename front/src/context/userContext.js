import React, { useContext } from "react"

const UserContext = React.createContext()
UserContext.displayName = 'user'

export const useUserContext = () => {
    const context = useContext(UserContext)

    if(!context)
        throw new Error('erro doido')

    return context
}

export default UserContext
