"use client";

import { PaymentImage } from "@/src/lib/store/image/image";
import Image from "next/image";
import { useRef, useState } from "react";
import { z } from "zod";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { SelectField } from "@/src/components/form copy/fields/SelectField";
import { TextField } from "@/src/components/form copy/fields/TextField";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  payment: z.enum(["USDT"]),
  amount: z.string().nonempty({ message: "Enter amount" }),
  network: z.string().optional(),
  // tnc: z.boolean(),
});

const selectOptions = [{ value: "USDT", text: "USDT" }];

type FormType = z.infer<typeof FormSchema>;
type depositType = Omit<FormType, "payment">;

const initialValues: FormType = {
  payment: "USDT",
  amount: "",
  network: "",
  // tnc: false,
};
const AddFundComponent = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: depositType | React.FormEvent<HTMLFormElement>
    ) => {
      const response = await axiosInstance.post(`/deposit`, data);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.data?.status === true) {
        showSuccessModal("Success", "Please payment");
        window.open(data.data.payment_url, "_blank");
        formRef.current?.reset();
      }
    },
    onError() {
      showErrorModal("!Opps", "Something went wrong");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { payment, network, ...rest } = data;
    const finalData = {
      ...rest,
    };
    mutate(finalData);
  };

  return (
    <>
      <div className="md:w-3/6 w-full mx-auto">
        <div className="flex-1">
          <div className="">
            <DashboardTitle title="Payment Info" />
          </div>
          <div className="p-3 bg-white mt-3">
            <GenericForm
              schema={FormSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="space-y-3 mb-5">
                <SelectField
                  name="payment"
                  options={selectOptions}
                  label="Payment"
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
                  type="text"
                  placeholder="BEP-20"
                  readOnly
                />

                {/* <CheckboxField name="tnc" label="Terms and Conditions" /> */}
              </div>
              <SubmitButton
                width="full"
                label="Deposit"
                isLoading={isPending}
                loadingLabel="Processing.."
              />{" "}
            </GenericForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFundComponent;
