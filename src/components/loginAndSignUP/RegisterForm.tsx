"use client";

import type React from "react";

import { useRef, useState } from "react";
import Link from "next/link";
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
import { z } from "zod";
import { TextField } from "@/src/components/form copy/fields/TextField";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { MdSmartphone } from "react-icons/md";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";

import { CiUser } from "react-icons/ci";
import { registerFormSchema } from "@/src/schema/loginAndSignUp/loginAndSignUp";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Images } from "@/src/lib/store/image/image";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";
import { IoMdShareAlt } from "react-icons/io";
import { PhoneNumberField } from "../form copy/fields/PhoneNumberField";

export default function RegisterForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePass = () => {
    setShowPass(!showPass);
  };
  const searchParams = useSearchParams();
  const referCode = searchParams.get("refer");
  const formRef = useRef<GenericFormRef<FormType>>(null);
  type RegisterPayload = Omit<FormType, "confirm_password">;

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: RegisterPayload | React.FormEvent<HTMLFormElement>
    ) => {
      const response = await axiosInstance.post(`/register`, data);
      return response;
    },
    onSuccess: (data: any) => {
      // Cookies.set("yeldoToken", data?.data?.data?.token, { expires: 3 });
      // router.push("/dashboard");
      showSuccessModal("Success", "Register successfully, please check your email");
    },
    onError(err: any) {
      console.log('Full error:', err);
      const mobileError = err?.message?.errors?.mobile?.[0];
      const emailField = err?.message?.errors?.email;
      const emailError = Array.isArray(emailField) ? emailField[0] : emailField;
    
      if (mobileError || emailError) {
        showErrorModal("Oops!", mobileError || emailError);
      }
    }
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { confirm_password, referCode, ...rest } = data;
    const finalData = {
      ...rest,
      ...(referCode ? { referCode } : {}),
    };

    mutate(finalData);
  };

  type FormType = z.infer<typeof registerFormSchema>;

  const initialValues: FormType = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    referCode: referCode || "",
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
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenericForm
              schema={registerFormSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="space-y-3 mb-5">
                <div className="relative">
                  <TextField
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter name"
                    inputClass="pl-8"
                  />
                  <CiUser className="absolute top-[42px] size-4 text-[#898989] left-1" />
                </div>
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
                  <PhoneNumberField
                    name="mobile"
                    label="Mobile"
                    inputClass="pl-8"
                  />
                  {/* <TextField
                    name="mobile"
                    label="Mobile"
                    placeholder="Mobile Number"
                    type="number"
                    inputClass="pl-8"
                  /> */}
                  {/* <MdSmartphone className="absolute top-[42px] size-4 text-[#898989] left-1" /> */}
                </div>
                <div className="relative">
                  <TextField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type={!showPass ? "password" : "text"}
                    inputClass="pl-8"
                  />
                  <CiLock className="absolute top-[42px] size-4 text-[#898989] left-1" />
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
                <div className="relative">
                  <TextField
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="Enter your confirm password"
                    type="password"
                    inputClass="pl-8"
                  />
                  <CiLock className="absolute top-[42px] size-4 text-[#898989] left-1" />
                </div>

                <div className="relative">
                  <TextField
                    name="referCode"
                    label="Refer Code"
                    placeholder="refer code"
                    type="text"
                    inputClass="pl-8"
                    readOnly={!!referCode}
                  />
                  <IoMdShareAlt className="absolute top-[42px] size-4 text-[#898989] left-1" />
                </div>
              </div>
              <SubmitButton
                width="full"
                label="Register"
                isLoading={isPending}
                loadingLabel="Processing.."
              />
            </GenericForm>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
