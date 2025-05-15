"use client";

import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { CurrectImage } from "@/src/lib/store/image/image";
import { IPlan } from "@/src/types/dashboard/package/package";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { useRef } from "react";
import { GenericForm, GenericFormRef } from "../../form copy/GenericForm";
import { TextField } from "../../form copy/fields/TextField";
import { AiOutlineMail } from "react-icons/ai";
import { SubmitButton } from "../../form copy/fields/SubmitButton";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "../../shared/toastAlert/ToastSuccess";

const FormSchema = z.object({
  amount: z.string().nonempty({ message: "Enter amount" }),
});
type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  amount: "",
};

const PlanListComponents = ({ packageList }: { packageList: IPlan[] }) => {
  console.log(packageList);
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [selectedPlan, setSelectedPlan] = React.useState<IPlan>();
  const [open, setOpen] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const finalData = {
        ...data,
        package_id: selectedPlan?.id,
      };
      const response = await axiosInstance.post(`/buy-package`, finalData);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.data?.status === true) {
        showSuccessModal("Success", data?.data?.message);
        setOpen(false);
      } else if (data?.data?.status === false) {
        showErrorModal("!Opps", data?.data?.message);
      }
    },
    onError() {
      showErrorModal("!Opps", "Something wrong");
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data);
  };

  const color = ["#FAEDCA", "#FFE1E0", "#FFF5E4"];
  return (
    <div>
      <DashboardTitle title="Package" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {packageList.map((plan, index) => (
          <Dialog.Root open={open} onOpenChange={setOpen} key={index}>
            <div
              className="bg-white mt-5 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-[#CFD0D2]"
              style={{ backgroundColor: color[index % color.length] }}
            >
              <div className="p-3 py-10">
                <div className="text-center">
                  <h2 className="text-[24px] font-medium">{plan.name}</h2>
                  <p className="text-slate my-4">
                    ${Number(plan.min_amount).toLocaleString()} - $
                    {Number(plan.max_amount).toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4" />
                <div className="pt-4">
                  <ul className="space-y-1">
                    <li className="text-slate text-[14px] flex justify-between items-center py-3">
                      <p>Capital Back</p>
                      <Image
                        className="size-5"
                        src={CurrectImage.right}
                        alt="img"
                      />
                    </li>
                    <li className="text-slate text-[14px] flex justify-between items-center py-3">
                      <p>Revenue Return</p>{" "}
                      <p className="text-black capitalize">
                        {plan.return_type}
                      </p>
                    </li>
                    <li className="text-slate text-[14px] flex justify-between items-center py-3">
                      <p>Duration</p>{" "}
                      <p className="text-black">
                        {plan.duration === "0"
                          ? "Unlimited"
                          : `${plan.duration} Days`}{" "}
                      </p>
                    </li>
                    <li className="text-slate text-[14px] flex justify-between items-center py-3">
                      <p>Profit Ratio</p>{" "}
                      <p className="text-black">{plan.interest_rate}%</p>
                    </li>
                    <li className="text-slate text-[14px] flex justify-between items-center py-3">
                      <p>Canellation </p>
                      <p className="text-green-500">Yes</p>
                      {/* <Image
                        className="size-5"
                        src={CurrectImage.wrong}
                        alt="img"
                      /> */}
                    </li>
                  </ul>
                </div>

                <Dialog.Trigger asChild>
                  <button
                    className="w-full mt-5 mx-auto bg-[#487FFF] text-white font-medium py-2 rounded transition duration-300"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    Invest Now
                  </button>
                </Dialog.Trigger>
              </div>
            </div>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
              {selectedPlan && (
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
                  <Dialog.Title className="text-lg font-medium">
                    {selectedPlan.name} Investment
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-600 mt-2">
                    Confirm your investment for the{" "}
                    <strong>{selectedPlan.name}</strong> plan.
                  </Dialog.Description>

                  <GenericForm
                    schema={FormSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    ref={formRef}
                  >
                    <div className=" my-8">
                      <div className="relative">
                        <TextField
                          name="amount"
                          label="Amount"
                          type="number"
                          placeholder="0.00"
                          inputClass="pl-8"
                        />
                        <AiOutlineMail className="absolute top-[42px] size-4 text-[#898989] left-1" />
                      </div>
                    </div>
                    <SubmitButton
                      width="full"
                      label="Invest"
                      isLoading={isPending}
                      loadingLabel="Processing.."
                    />
                  </GenericForm>
                  <Dialog.Close className="absolute top-3 right-3 text-gray-500 hover:text-black">
                    ✕
                  </Dialog.Close>
                </Dialog.Content>
              )}
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
    </div>
  );
};

export default PlanListComponents;
