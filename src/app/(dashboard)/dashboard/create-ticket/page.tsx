"use client";

import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { TextareaField } from "@/src/components/form copy/fields/TextAreaField";
import { TextField } from "@/src/components/form copy/fields/TextField";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import {
  showErrorModal,
  showSuccessModal,
} from "@/src/components/shared/toastAlert/ToastSuccess";
import { supportTicketSchema } from "@/src/schema/supportTicket/supportTicket";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { z } from "zod";

// ✅ Define FormType outside the component
type FormType = z.infer<typeof supportTicketSchema>;

const CreateTicketPage = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const initialValues: FormType = {
    subject: "",
    images: new File([], ""),
    message: "",
  };
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      if ("preventDefault" in data) return;

      const formData = new FormData();
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      // Only append image if it's not empty or a placeholder
      if (data.images && data.images.name !== "") {
        formData.append("images", data.images);
      }

      const response = await axiosInstance.post(`/tickets`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    },
    onSuccess: (data: any) => {
      if (data?.data?.success === true) {
        showSuccessModal("Success", "Message sent successfully");
        router.push("/dashboard/all-ticket");
      }
    },
    onError() {
      showErrorModal("Oops!", "Something went wrong");
    },
  });

  const handleSubmit = async (
    data: FormType | React.FormEvent<HTMLFormElement>
  ) => {
    if ("preventDefault" in data) return;
    mutate(data);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>
      <GenericForm
        schema={supportTicketSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="space-y-5">
          <TextField
            name="subject"
            label="Subject"
            type="text"
            inputClass="bg-white"
            placeholder="Enter the subject"
          />
          <TextareaField
            name="message"
            label="Message"
            placeholder="Enter your message here..."
          />
          <TextField
            name="images"
            label="Images"
            type="file"
            inputClass="bg-white"
            placeholder="Enter the image"
          />
          <SubmitButton
            width="full"
            label="Submit Ticket"
            isLoading={isPending}
            loadingLabel="Processing.."
          />
        </div>
      </GenericForm>
    </div>
  );
};

export default CreateTicketPage;
