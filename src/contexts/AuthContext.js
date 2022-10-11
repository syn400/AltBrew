import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext(); 

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {


    const [currentUser, setCurrentUser] = useState()

    useEffect (() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])


    const value = {
        currentUser
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
