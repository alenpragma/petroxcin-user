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

const FormSchema = z.object({
  wallet: z.string().nonempty({message : "Enter your wallet"}),
  network: z.string().nonempty({message : "Enter your network"}),
  amount: z.string().nonempty({message : "Enter amount"}),
});

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  wallet: "",
  network: "",
  amount: "",
};
const WithdrawComponents = () => {
  const [selectedId, setSelectedId] = useState(0);
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
    formRef.current?.reset();
  };

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
