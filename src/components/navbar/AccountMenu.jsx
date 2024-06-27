import React from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

const LOGOUT_URL = "refresh-token"; // delete request
const AccountMenu = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosPrivate.delete(LOGOUT_URL, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
        credentials: "include",
      });
      setAuth({});
      navigate("/login");
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="absolute shadow-md w-36 right-6 top-4 text-xs">
          <div
            className="
            flex
            flex-col gap-1
            z-40
          "
          >
            <MenuItem
              onClick={() => {
                navigate("/me");
                handleClose();
              }}
              label="Profile"
              className={"text-primary-red"}
            />

            {/* get all users only access for admin */}
            {auth && auth.roles.includes("admin") && (
              <MenuItem
                onClick={() => {
                  navigate("/get-users");
                }}
                label={"All users"}
                className={"text-primary-red"}
              />
            )}

            <MenuItem
              onClick={() => {
                handleClose();
              }}
              label="Change Password"
              className={"text-primary-red"}
            />

            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
              label="Log out"
              className={"text-primary-red"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
