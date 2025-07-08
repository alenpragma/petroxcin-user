"use client";

import { useRef } from "react";
import { z } from "zod";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { TextareaField } from "@/src/components/form copy/fields/TextAreaField";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import {
  SupportTicket,
  TicketMessage,
} from "@/src/types/dashboard/supportTicket/singleSupportTicket";
import Loadingcomponents from "@/src/components/shared/loadingComponents/LoadingComponents";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";
import { TextField } from "@/src/components/form copy/fields/TextField";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { cn } from "@/src/lib/utils";

const messageSchema = z.object({
  message: z.string().nonempty("Please enter your message"),
  images: z.instanceof(File).optional(),
});

type FormType = z.infer<typeof messageSchema>;

const SingleTicketPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const initialValues: FormType = {
    message: "",
    images: new File([], ""),
  };

  const {
    data: singleTicket,
    isLoading,
    refetch,
  } = useGetData(["singleTicket"], `tickets/${slug}`);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      if ("preventDefault" in data) return;
      const finalData = new FormData();
      finalData.append("message", data.message);

      if (data.images && data.images) {
        if (data.images instanceof File) {
          finalData.append("images[]", data.images);
        }
      } else {
        finalData.append("images", "");
      }

      const response = await axiosInstance.post(
        `/tickets/${slug}/reply`,
        finalData
      );
      return response;
    },

    onSuccess: (data: any) => {
      if (data?.status === 200) {
        showSuccessModal("Success", "Message sent successfully");
        refetch();
      }
    },

    onError() {
      showErrorModal("Oops!", "Something went wrong");
    },
  });

  // Form submit handler
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    mutate(data as FormType);
  };

  const handleResolveTicket = async () => {
    if (singleTicket?.status === "closed") {
      return;
    }
    const response = await axiosInstance.post(`/tickets/${slug}/resolve`);
    if (response?.data?.success === true) {
      showSuccessModal("Success", "Ticket marked as resolved");
      refetch();
      return response;
    }
  };

  if (isLoading) return <Loadingcomponents />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-blue-900">Support ticket</h1>
      <p className="text-sm text-gray-500 mb-6">
        Support Portal &raquo; Tickets &raquo; Ticket {singleTicket?.ticket_id}
      </p>

      {/* Content Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <GenericForm
            schema={messageSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-4">
              <TextareaField
                name="message"
                placeholder="Type your reply here..."
                className="min-h-[150px]"
              />{" "}
              <TextField
                name="images"
                label="Images"
                type="file"
                inputClass="bg-white"
                placeholder="Enter the image"
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="w-[150px]">
                <SubmitButton
                  disabled={singleTicket?.status === "closed"}
                  className={cn(
                    "w-full",
                    singleTicket?.status === "closed"
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  )}
                  width="full"
                  label="Send Reply"
                  isLoading={isPending}
                  loadingLabel="Processing.."
                />
              </div>{" "}
              <div
                onClick={handleResolveTicket}
                className={cn(
                  "px-5 py-2 rounded text-white cursor-pointer",
                  singleTicket?.status === "closed"
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-700 "
                )}
              >
                Mark as Resolved
              </div>
            </div>
          </GenericForm>
        </div>

        {/* Right: Ticket Details */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <div className="text-sm space-y-4">
            <div>
              <p className="text-gray-500">Ticket Id</p>
              <p className="font-medium">{singleTicket?.ticket_id}</p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p className="font-medium">Technical Support</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded capitalize">
                {singleTicket?.status}
              </span>
            </div>
            <div>
              <p className="text-gray-500">Subject</p>
              <span className="inline-block text-xs px-2 py-1 rounded">
                {singleTicket?.subject}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Message History */}
      <div className="mt-10 md:col-span-2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Message History</h2>
        <div className="space-y-4">
          {singleTicket?.messages.map((msg: TicketMessage, idx: number) => (
            <div
              key={idx}
              className="bg-blue-500 px-4 py-2 rounded-lg shadow-sm w-fit"
            >
              <p className="text-sm font-semibold mb-1 text-white">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleTicketPage;
