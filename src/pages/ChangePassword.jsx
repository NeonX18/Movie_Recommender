import React, { useEffect, useState } from "react";

import { Heading1, Input } from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updatePasswordSchema } from "../utils/ValidationSchema";
import { Button } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CHANGE_PASSWORD_URL = "/user";
export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleChangePassword = async (data) => {
    const controller = new AbortController();
    const { password, newPassword } = data;

    try {
      await axiosPrivate.patch(
        CHANGE_PASSWORD_URL,
        JSON.stringify({ password, newPassword }),
        {
          signal: controller.signal,
        }
      );

      setIsPasswordUpdated(true);
    } catch (error) {
      // console.log(error);
      if (!error.name === "AbortError") {
        navigate("/login", { state: { from: location }, replace: true });
      }
      if (error?.response?.status === 403) {
        setError("root", {
          type: "manual",
          message: "Token expired. Please login again",
        });
      } else if (error?.response?.status === 401) {
        setError("root", {
          type: "manual",
          message: "Incorrect Password",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Something went wrong. Please try again",
        });
      }
    }

    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    if (isPasswordUpdated) {
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  }, [isPasswordUpdated]);

  return (
    <>
      <div className="flex items-center justify-center flex-col p-4 h-screen w-full sm:w-[80%] md:w-[60%] lg:w-[30%] mx-auto">
        <form
          id="changePassword"
          onSubmit={handleSubmit(handleChangePassword)}
          className="flex flex-col gap-4 w-full text-black"
        >
          <Heading1 title="Change Password" />
          {isPasswordUpdated && (
            <p className="text-green-300">
              Password updated successfully. You will be redirected to the
              previous page...
            </p>
          )}
          {errors.root && <p className="text-red-300">{errors.root.message}</p>}
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="newPassword"
            label="New Password"
            type="password"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="confirmPassword"
            label="New Password"
            type="password"
            register={register}
            errors={errors}
            required
          />
          <Button
            label="Change Password"
            type="submit"
            disabled={isSubmitting}
          />
          
        </form>
      </div>
    </>
  );
}
