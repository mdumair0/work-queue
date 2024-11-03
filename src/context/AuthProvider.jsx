import React, { createContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setLocalStorage()
    }, []);

    useEffect(() => {
        const {empData, adminData} = getLocalStorage()
        setUserData({empData, adminData})
    }, [])

    return <div>
        <AuthContext.Provider value={userData}>
            {children}
        </AuthContext.Provider>
    </div>;
};

export default AuthProvider