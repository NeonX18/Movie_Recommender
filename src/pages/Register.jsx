import React from "react";
import { useForm } from "react-hook-form";
import { Heading1, Input, Button } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../utils/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const REGISTER_URL = "user/register";

const Register = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const submitRegisterData = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await axios.post(
        `${REGISTER_URL}`,
        JSON.stringify({ name, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include"
        }
      );

      const refreshToken = response?.data?.refreshToken;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ ...auth, roles, accessToken, refreshToken });

      console.log(auth);

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);

      if (error.response.status === 409) {
        setError("email", {
          type: "manual",
          message: "Email is already taken",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <>
      {/* <img
        src="/register.jpg"
        alt="movie banner background"
        className="absolute top-0 left-0 w-full h-full object-cover transition blur-[1px]"
      /> */}
      <div className="bg-gradient-to-r from-black to-transparent w-full h-full absolute top-0 left-0" />

      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="flex flex-col gap-4 p-8 backdrop-blur-[5px] w-[90%] md:w-4/6 lg:w-2/5 rounded-md border-[1px] border-white/30 text-white">
          <Heading1
            title="Welcome to KGPLAY"
            subtitle="Register"
            center
            subTitleStyles="text-neutral-50 text-xl"
          />

          {errors.root && (
            <p className="text-red-300 text-center">{errors.root.message}</p>
          )}

          <form
            id="register-form"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitRegisterData)}
          >
            <Input
              id="name"
              label="Name"
              type="text"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />
            <Input
              id="email"
              label="Email"
              type="text"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              register={register}
              errors={errors}
              inputStyles={"bg-transparent"}
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Loading..." : "Register"}
              type="submit"
            />
          </form>

          <hr />
          <div className="text-center">
            <span className="text-white font-normal">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-red-50 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
