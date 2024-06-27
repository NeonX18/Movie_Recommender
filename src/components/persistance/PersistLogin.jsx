import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";

import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    // verifyRefreshToken()
  }, []);

  useEffect(() => {
    console.log("auth", auth);
  }, [auth, isLoading])

  
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
