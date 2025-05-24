"use client";
import type React from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/src/lib/store/image/image";
import {
  showErrorModal,
  showMailModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosForPass";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { CiLock } from "react-icons/ci";

const FormSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
  code: z
    .string()
    .length(6, { message: "Code must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "Code must contain only digits" }),
  password: z.string().nonempty({ message: "Please enter your password" }),
  confirm_password: z
    .string()
    .nonempty({ message: "Please enter your confirm password" }),
  referCode: z.string().optional(),
});
type FormType = z.infer<typeof FormSchema>;

export default function ForgorPassWithOtp() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePass = () => {
    setShowPass(!showPass);
  };
  const email = Cookies.get("petroxcinEmail");
  const initialValues: FormType = {
    email: email || "",
    code: "",
    password: "",
    confirm_password: "",
  };
  const router = useRouter();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  type forgotType = Omit<FormType, "confirm_password">;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: forgotType | React.FormEvent<HTMLFormElement>) => {
      console.log(data);
      const response = await axiosInstance.post(`/reset-password`, data);
      return response;
    },
    onSuccess: (data: any) => {
      showSuccessModal("Success", data?.data?.message);
      router.push("/login");
    },
    onError(err: any) {
      showErrorModal("!Opps", err?.message?.message);
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { confirm_password, ...rest } = data;
    const finalData = {
      ...rest,
    };

    mutate(finalData);
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
              Forgot your passowrd
            </CardTitle>
            <CardDescription className="text-center">
              Enter your confirmation here
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
                    name="code"
                    label="Code"
                    placeholder="Enter your otp"
                    type="number"
                    inputClass="pl-8"
                  />
                  <CiLock className="absolute top-[42px] size-5 text-[#898989] left-1" />
                </div>
                <div className="relative">
                  <TextField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type={!showPass ? "password" : "text"}
                    inputClass="pl-8"
                  />
                  <CiLock className="absolute top-[42px] size-5 text-[#898989] left-1" />
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
                  <CiLock className="absolute top-[42px] size-5 text-[#898989] left-1" />
                </div>
              </div>
              <SubmitButton
                width="full"
                label="Submit"
                isLoading={isPending}
                loadingLabel="Processing.."
              />
            </GenericForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
