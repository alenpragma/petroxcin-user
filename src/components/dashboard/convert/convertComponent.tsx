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
import { useRef } from "react";
import { z } from "zod";

const FormSchema = z.object({
  wallet: z.enum(["binance", "bnb", "btc"]),
  user_name: z.string().nonempty(),
  amount: z.string(),
});

const selectOptions = [
  { value: "binance", text: "Binance" },
  { value: "bnb", text: "BNB" },
  { value: "btc", text: "BTC" },
];
type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  wallet: "binance",
  user_name: "",
  amount: "",
};

const ConvertComponent = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
    formRef.current?.reset();
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
            <SelectField name="wallet" options={selectOptions} label="Wallet" />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              placeholder="0.00"
            />
            <TextField
              name="user_name"
              label="Fee"
              placeholder="0.00"
              type="number"
            />
        
          </div>
          <SubmitButton width="full" label="Confirm & Continue" />
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
export default ConvertComponent;
