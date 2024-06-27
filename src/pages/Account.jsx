import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import DeleteAccount from "../components/account/DeleteAccount";
import { sha256 } from "js-sha256";

const getRoleLabel = (role) => {

  switch (role) {
    case "admin": return "Admin"
    case "tier1": return "Premium"
    case "tier2": return "Standard"
    case "tier3": return "Basic"
    case "tier4": return "Free"
  }
}

const UserCard = ({ user }) => {
  let userRoles = user.role
  const IMG_URL =
    "https://gravatar.com/avatar/" +
    sha256(String(user.email).trim().toLowerCase()) +
    "?d=robohash&s=256";
  if (user.role.length > 1){
    userRoles = user.role.filter((item) => getRoleLabel(item) !== "Free")
  }
  return (
    <div className="p-6 font-lg text-white flex flex-col items-center justify-center bg-gray-800 rounded-lg">
      <div className=" flex justify-center items-center">
        <img
          src={IMG_URL}
          alt={`${user.name}`}
          className="w-32 h-32 rounded-full border-4 border-gray-700"
        />
      </div>

        <div className="mt-2">
          <p className="text-4xl font-bold mt-2">{user.name}</p>
        </div>
        <div>
      <p className="text-gray-300 ">{user.email}</p>
      </div>
        <div className = "flex item-center justify-center">
          <p className="text-lg font-medium mt-4">Active Plan:</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {userRoles.map((role) => (
              <span
                key={role}
                className="px-3 text-lg font-semibold"
              >
                {getRoleLabel(role)}
              </span>
            ))}
          </div>
        </div>
      </div>

  );
};

const getActivePlanColor = (activePlan) => {
  switch (activePlan) {
    case "Basic":
      return "text-brown-500";
    case "Standard":
      return "text-slate-200";
    case "Premium":
      return "text-yellow-700";
    default:
      return "";
  }
};

const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        if (!err.name === "AbortError") {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className=" w-full h-screen bg-gray-900 text-white flex items-center justify-center ">
      {users && (
        <div className=" w-1/4 h-4/5 bg-gray-800 shadow-lg rounded-lg p-8 mt-4 border-2 border-red-500 shadow-red-500">
          <UserCard user={users} />
          <div className="mt-6 flex flex-col justify-center items-center">
            <Button
              className="w-auto h-auto bg-blue-500 hover:bg-blue-600 text-white mb-4"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </Button>
            <DeleteAccount className={"ml-4 p-4 "} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
