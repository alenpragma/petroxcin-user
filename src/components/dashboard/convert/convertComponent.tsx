"use client";
import { ResetButton } from "@/src/components/form copy/fields/ResetButton";
import { SelectField } from "@/src/components/form copy/fields/SelectField";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { TextField } from "@/src/components/form copy/fields/TextField";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { z } from "zod";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";

const FormSchema = z.object({
  wallet: z.string().nonempty(),
  amount: z.string().nonempty({ message: "Enter amount" }),
});

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  wallet: "profit wallet",
  amount: "",
};

const ConvertComponent = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  type RegisterPayload = Omit<FormType, "wallet">;

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: RegisterPayload | React.FormEvent<HTMLFormElement>
    ) => {
      const response = await axiosInstance.post(`/convert`, data);
      return response;
    },
    onSuccess: (data: any) => {
      console.log(data?.data?.message);
      console.log(data?.data?.status);
      if (data?.data?.status === true) {
        showSuccessModal("Success", data?.data?.message);
      }
      if (data?.data?.status === false) {
        showErrorModal("!Opps", data?.data?.message);
      }
    },
    onError() {
      showErrorModal("!Opps", "Something wrong");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { wallet, ...rest } = data;
    const finalData = {
      ...rest,
    };

    mutate(finalData);
  };
  return (
    <div className="md:w-1/2 w-full mx-auto">
      <div className="">
        <DashboardTitle title="Convert" />
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
              name="wallet"
              label="Wallet"
              type="text"
              placeholder=""
              readOnly
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
            label="Convert"
            isLoading={isPending}
            loadingLabel="Processing.."
          />{" "}
        </GenericForm>
      </div>
    </div>
  );
};
export default ConvertComponent;
