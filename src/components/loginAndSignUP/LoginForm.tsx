"use client";
import type React from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { TextField } from "@/src/components/form copy/fields/TextField";
import { z } from "zod";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/src/lib/store/image/image";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";

const FormSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
  password: z.string().min(6, { message: "Input valid password" }),
});
type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  email: "",
  password: "",
};

export default function LoginFormComponent() {
  const router = useRouter();

  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post(`/login`, data);
      return response;
    },
    onSuccess: (data: any) => {
      console.log(data?.data?.message);
      if (data?.success === true) {
        Cookies.set("yeldoToken", data?.data?.data?.token, { expires: 3 });
        router.push("/dashboard");
        showSuccessModal("Success", data?.data?.message);
      } else {
        const mainMessage = data?.data?.message || "Something went wrong";
        const emailError = data?.data?.errors?.email;

        showErrorModal(
          "Oops!",
          emailError ? `${mainMessage}: ${emailError}` : mainMessage
        );
      }
    },
    onError(err: any) {},
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data);
  };
  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-5 w-full">
          <Link href="/">
            <Image className="w-44" src={Images.logo} alt="img" />
          </Link>
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenericForm
              schema={FormSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="space-y-3 mb-5">
                <div className="relative">
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="xyz@gmail.com"
                    inputClass="pl-8"
                  />
                  <AiOutlineMail className="absolute top-[42px] size-4 text-[#898989] left-1" />
                </div>
                <div className="relative">
                  <TextField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type={!showPass ? "password" : "text"}
                    inputClass="pl-8"
                  />
                  <CiLock className="absolute  top-[42px] size-4 text-[#898989] left-1" />
                  {!showPass ? (
                    <GoEyeClosed
                      onClick={handlePass}
                      className="absolute top-[42px] size-5 text-[#898989] right-1 cursor-pointer"
                    />
                  ) : (
                    <GoEye
                      onClick={handlePass}
                      className="absolute top-[42px] size-5 text-[#898989] right-1 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <SubmitButton
                width="full"
                label="Login"
                isLoading={isPending}
                loadingLabel="Processing.."
              />
            </GenericForm>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm mt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
