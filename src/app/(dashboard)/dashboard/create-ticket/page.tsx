"use client";

import { TextareaField } from "@/src/components/form copy/fields/TextAreaField";
import { TextField } from "@/src/components/form copy/fields/TextField";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import FormSelectField from "@/src/components/Form/FormSelectField";
import { supportTicketSchema } from "@/src/schema/supportTicket/supportTicket";
import { useRef } from "react";
import { z } from "zod";

// ✅ Define FormType outside the component
type FormType = z.infer<typeof supportTicketSchema>;

const options = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const CreateTicketPage = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const initialValues: FormType = {
    subject: "",
    priority: "high",
    message: "",
  };

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log("Form Submitted:", data);
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

          <div>
            <label className="block font-medium mb-1">Priority</label>
            <FormSelectField
              name="priority"
              options={options}
            />
          </div>

          <TextareaField
            name="message"
            label="Message"
            placeholder="Enter your message here..."
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </div>
      </GenericForm>
    </div>
  );
};

export default CreateTicketPage;
