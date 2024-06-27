import React from 'react'
import { createContext, useState } from "react";
export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  

  const contextValues = {
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
