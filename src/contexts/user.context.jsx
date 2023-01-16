import { createContext, useState, useEffect } from "react";
import { OnAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    curruntUser: null,
    setCurruntUser : () => null
});

export const UserProvider = ({ children }) => {
    const [curruntUser, setCurruntUser] = useState(null);
    const value = { curruntUser, setCurruntUser };


    useEffect(()=>{
        const unsubscribe  = OnAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            } 

            setCurruntUser(user);
        })
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}