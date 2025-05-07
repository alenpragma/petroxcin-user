"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { TextField } from "@/src/components/form copy/fields/TextField";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "../../shared/toastAlert/ToastSuccess";

const FormSchema = z.object({
  wallet: z.string().nonempty({ message: "Enter your wallet" }),
  network: z.string().nonempty({ message: "Enter your network" }),
  amount: z.string().nonempty({ message: "Enter amount" }),
});

type FormType = z.infer<typeof FormSchema>;
type withdrawPayload = Omit<FormType, "network">;

const initialValues: FormType = {
  wallet: "",
  network: "BEP20",
  amount: "",
};
const WithdrawComponents = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: withdrawPayload | React.FormEvent<HTMLFormElement>
    ) => {
      const response = await axiosInstance.post(`/withdraw`, data);
      return response;
    },
    onSuccess: (data: any) => {
      showSuccessModal("Success", "Succefully Withdraw");
    },
    onError(err: any) {
      showErrorModal("Error", "Something wrong");
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { network, ...rest } = data;
    const finalData = {
      ...rest,
    };
    mutate(finalData);
  };
  // formRef.current?.reset();
  return (
    <>
      <div className="md:w-6/12 w-full mx-auto">
        <div className="">
          <DashboardTitle title="Withdraw" />
        </div>
        <div className="p-3 bg-white mt-3">
          <GenericForm
            schema={FormSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-3 mb-5">
              <TextField
                name="wallet"
                label="Wallet"
                placeholder="Enter your wallet"
                type="text"
              />
              <TextField
                name="amount"
                label="Amount"
                type="number"
                placeholder="0.00"
              />
              <TextField
                name="network"
                label="Network"
                placeholder="Network"
                type="text"
                readOnly
              />
            </div>
            <SubmitButton width="full" label="Submit" />
          </GenericForm>
        </div>
      </div>
    </>
  );
};

export default WithdrawComponents;
