import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heading1, Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import axios from "../api/axios";
import { loginSchema } from "../utils/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LOGIN_URL = "/user/login";

const Login = () => {
  const { setAuth } = useAuth();
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
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post(
        `${LOGIN_URL}`,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include"
        }
      );

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const roles = response?.data?.roles;

      setAuth((prev) => ({ ...prev, accessToken, roles, refreshToken }));

      navigate(from, { replace: true });
    } catch (error) {
      // console.log(error);
      if (error?.response?.status === 404) {
        setError("root", {
          type: "manual",
          message: "Account does not exist. Please sign up",
        });
      } else if (error?.response?.status === 401) {
        setError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Something went wrong. Please try again",
        });
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-primary-black grid grid-cols-3 overflow-hidden">
        <div className="bg-primary-red col-span-2 rounded-tr-[80px] rounded-br-[80px] shadow-xl shadow-primary-red/30 overflow-hidden">
          <img
            src="/login.jpg"
            alt="movie banner background"
            className="w-full h-full object-cover opacity-95 hover:opacity-100 transition "
          />
        </div>

        <div className=" col-span-1 w-full h-full">
          <div className="flex flex-col gap-4 p-12 text-black">
            <Heading1
              title="Welcome to KGPLAY"
              subtitle="Sign In"
              className={"text-white text-4xl"}
            />
            {errors.root && (
              <p className="text-red-300">{errors.root.message}</p>
            )}
            <form
              id="login-form"
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <Input
                id="email"
                label="Email"
                type="text"
                register={register}
                errors={errors}
                required
              />
              <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                required
              />
              <Button
                label={isSubmitting ? "Loading..." : "Login"}
                type="submit"
                disabled={isSubmitting}
              />
            </form>

            <hr />
            <div className="text-center">
              <span className="text-neutral-500 font-normal">
                Don{"'"}t have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-primary-red font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
