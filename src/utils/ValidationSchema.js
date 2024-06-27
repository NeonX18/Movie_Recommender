import { z } from "zod";

const NAME_REGEX = /^[a-zA-Z\s]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .trim()
      .min(3, "Name must be at least 3 characters")
      .regex(NAME_REGEX, {
        message: "Name must only contain letters",
      }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid email",
      })
      .trim()
      .email(),

    password: z
      .string()
      .trim()
      .min(8, "Password too short")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z.string().trim().min(1, "Password is required"),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().trim().min(1, "Password is required"),
    newPassword: z
      .string()
      .trim()
      .min(8, "Password too short")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "Old password and new password cannot be same.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
