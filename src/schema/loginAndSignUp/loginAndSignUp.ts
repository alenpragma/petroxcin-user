import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(30, "Name must be at most 30 characters"),
    email: z.string().email({ message: "Please enter your email" }),
    mobile: z.string().nonempty({ message: "Enter your phone number" }),
    password: z.string().nonempty({ message: "Please enter your password" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Please enter your confirm password" }),
    referCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
