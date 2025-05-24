"use client";
import type React from "react";
import { useRef } from "react";
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
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/src/lib/store/image/image";
import {
  showErrorModal,
  showMailModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";

const FormSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
});
type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  email: "",
};

export default function ForgotPassComponents() {
  const router = useRouter();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post(`/login`, data);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success === true) {
        Cookies.set("yeldoToken", data?.data?.data?.token, { expires: 3 });
        router.push("/dashboard");
        showSuccessModal("Success", data?.data?.message);
      } else {
        const mainMessage = data?.data?.message || "Something went wrong";
        const emailError = data?.data?.errors?.email;

        showMailModal(
          "Oops!",
          emailError ? `${mainMessage}: ${emailError}` : mainMessage
        );
      }
    },
    onError() {
      showErrorModal("!Opps", "Something went wrong");
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
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
              Enter your email and reset password
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
                  <AiOutlineMail className="absolute top-[42px] size-5 text-[#898989] left-1" />
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
