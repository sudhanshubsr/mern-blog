import { createContext, useContext } from "react";
import { useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {

    // Can be used to define global state variables
    const [userInfo, setUserInfo] = useState();

    return(
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}

const useGlobalState = () => useContext(UserContext);
export { useGlobalState };
export default UserContextProvider;
