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
import { ResetButton } from "@/src/components/form copy/fields/ResetButton";
import { CheckboxField } from "@/src/components/form copy/fields/CheckboxField";

const FormSchema = z.object({
  payment: z.enum(["USDT"]),
  amount: z.string().nonempty({ message: "Enter amount" }),
  // tnc: z.boolean(),
});

const selectOptions = [{ value: "USDT", text: "USDT" }];
const paymentData = [
  {
    id: 1,
    image: PaymentImage.binance,
    name: "Binance",
    title: "Send form your payment gateway.",
  },
  {
    id: 2,
    image: PaymentImage.three20pay,
    name: "320 Pay",
    title: "Send form your payment gateway.",
  },
];

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  payment: "USDT",
  amount: "",
  // tnc: false,
};
const AddFund = () => {
  const [selectedId, setSelectedId] = useState(0);
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
    formRef.current?.reset();
  };

  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex-1">
          <div className="space-y-3">
            <DashboardTitle title="How would you like to pay" />
            <div className="flex flex-col gap-3">
              {paymentData.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-1 rounded-md border cursor-pointer transition-all ${
                    selectedId === item.id
                      ? "bg-[#487FFF] text-white border-[#487FFF]"
                      : "bg-white text-black border-gray-200"
                  }`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="size-12 rounded-md"
                  />
                  <div>
                    <h6
                      className={`text-lg font-semibold ${
                        selectedId === item.id ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </h6>
                    <p
                      className={`text-sm ${
                        selectedId === item.id
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

                {/* <CheckboxField name="tnc" label="Terms and Conditions" /> */}
              </div>
              <SubmitButton width="full" label="Submit" />
            </GenericForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFund;
