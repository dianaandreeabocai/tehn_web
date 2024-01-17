import React, {useEffect, useState} from "react";


export const LoginContext = React.createContext()


const LoginCtxWrapper = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log(sessionStorage.getItem('token') != null);
        setIsLoggedIn(sessionStorage.getItem('token') != null);
    }, []);

    return(
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginCtxWrapper;
