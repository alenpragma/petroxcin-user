"use client";
import { ResetButton } from "@/src/components/form copy/fields/ResetButton";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { TextField } from "@/src/components/form copy/fields/TextField";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";

import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { z } from "zod";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";

const FormSchema = z.object({
  receiver: z.string().email({ message: "Enter your valid email" }),
  amount: z.string().nonempty({ message: "Emter your amount" }),
});

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  receiver: "",
  amount: "",
};

const TransferComponents = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post(`/transfer`, data);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.data?.status === true) {
        showSuccessModal("Success", data?.data?.message);
        formRef.current?.reset();
      } else if (data?.data?.status === false) {
        showErrorModal("Error", data?.data?.message);
      }
    },
    onError(err: any) {
      showErrorModal("Error", err?.message?.receiver);

    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data);
  };

  return (
    <div className="md:w-1/2 w-full mx-auto">
      <div className="">
        <DashboardTitle title="Transfer" />
      </div>
      <div className="p-5 bg-white mt-3 rounded-lg">
        <GenericForm
          schema={FormSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="space-y-3 mb-5">
            <TextField
              name="receiver"
              label="Email"
              placeholder="Enter user email"
              type="email"
            />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              placeholder="0.00"
            />
          </div>
          <SubmitButton
            width="full"
            label="Transfer"
            isLoading={isPending}
            loadingLabel="Processing.."
          />{" "}
          <ResetButton
            onReset={() => formRef.current?.reset()}
            resetLabel="Cancel"
            className="bg-[#FA0000] w-full mt-3 hover:bg-[#FA0000]"
          />
        </GenericForm>
      </div>
    </div>
  );
};
export default TransferComponents;
