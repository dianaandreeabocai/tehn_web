import React, { useState } from "react";


export const LoginContext = React.createContext()


const LoginCtxWrapper = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return(
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginCtxWrapper;