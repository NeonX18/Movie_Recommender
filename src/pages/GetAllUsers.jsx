import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const GET_ALL_USERS = "/admin/get-users";

const GetAllUsers = () => {
  const AxiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await AxiosPrivate.get(GET_ALL_USERS, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data.users);
      } catch (error) {
        console.log(error);
        if (!error.name === "AbortError") {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      {users && (
        <div>
          {Object.values(users).map((user) => (
            <div key={user._id}>
              <hr />
              {Object.entries(user).map(([key, value], i) => (
                <div className="grid grid-cols-3 w-[700px]" key={i}>
                  <span className="">{key}</span>:<span>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;
