"use client";

import type React from "react";
import { useRef } from "react";
import { z } from "zod";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import {
  GenericForm,
  type GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { TextField } from "@/src/components/form copy/fields/TextField";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";
import { CopyToClipboard } from "../../shared/copyClipboard/copyClipboard";
import { Button } from "../../ui/button";
import { FaRegCopy } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import QRCode from "react-qr-code";

const FormSchema = z.object({
  amount: z.string().nonempty({ message: "Enter amount" }),
  transaction_id: z.string(),
});

const selectOptions = [{ value: "USDT", text: "USDT" }];

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  amount: "",
  transaction_id: "",
};

const WALLET_ADDRESS = "0xbC526405276a660046E43284463013447DDC7C07";

const AddFundComponent = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post(`/deposit`, data);
      return response;
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.data?.success === true) {
        showSuccessModal("Success", data?.data?.message);
        // window.open(data.data.payment_url, "_blank");
        // formRef.current?.reset();
      } else {
        showErrorModal("Opps!", data?.data?.message);
      }
    },
    onError() {
      showErrorModal("!Opps", "Something went wrong");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    mutate(data);
  };

  const { copy, copied } = CopyToClipboard();

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
              <div className="space-y-4 mb-5">
                {/* Wallet Address Section */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h6 className="font-medium text-[14px] mb-3">
                    Wallet Address (BEP20):
                  </h6>

                  {/* QR Code and Address Container */}
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {/* QR Code */}
                    <div className="flex-shrink-0">
                      <div className="bg-white p-3 rounded-lg border">
                        <QRCode
                          size={150}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={WALLET_ADDRESS}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </div>

                    {/* Address and Copy Button */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-white border rounded-lg p-3">
                        <p className="text-sm font-mono break-all mb-3">
                          {WALLET_ADDRESS}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto"
                          onClick={() => copy(WALLET_ADDRESS)}
                        >
                          {!copied ? (
                            <>
                              <FaRegCopy className="mr-2 h-4 w-4" />
                              Copy Address
                            </>
                          ) : (
                            <>
                              <IoCheckmarkDoneOutline className="mr-2 h-4 w-4 text-green-500" />
                              Copied!
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Instructions:</strong>
                    </p>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>
                        • Send USDT to the above address using BEP20 network
                      </li>
                      <li>• Enter the exact amount and transaction ID below</li>
                      <li>
                        • Your deposit will be processed after confirmation
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Form Fields */}
                <TextField
                  name="amount"
                  label="Amount (USDT)"
                  type="number"
                  placeholder="0.00"
                />
                <TextField
                  name="transaction_id"
                  label="Transaction ID"
                  type="text"
                  placeholder="Enter transaction ID"
                />
              </div>

              <SubmitButton
                width="full"
                label="Submit Deposit"
                isLoading={isPending}
                loadingLabel="Processing..."
              />
            </GenericForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFundComponent;
