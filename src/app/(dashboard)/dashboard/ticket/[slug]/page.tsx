"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { TextareaField } from "@/src/components/form copy/fields/TextAreaField";

const messageSchema = z.object({
  message: z.string().nonempty("Message is required"),
});

type FormType = z.infer<typeof messageSchema>;

const SingleTicketPage = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const initialValues: FormType = {
    message: "",
  };

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log("Submitted message:", data);
  };

  const message = [
    {
      actin: "user",
      image: "http/image.com",
      name: "Remon Khan",
      message: "hello sir i want to buy a ticket",
    },
    {
      actin: "admin",
      image: "http/image.com",
      name: "Remon Khan",
      message: "yes, you are successfully buy ticket",
    },
  ];
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-blue-900">Support ticket</h1>
      <p className="text-sm text-gray-500 mb-6">
        Support Portal &raquo; Tickets &raquo; Ticket #SH-9431776
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
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">CC</span> You can CC other people on
              to this ticket by entering email addresses here.
            </p>

            <div className="space-y-4">
              <TextareaField
                name="message"
                placeholder="Type your reply here..."
                className="min-h-[150px]"
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Post Reply
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Mark as Resolved
              </button>
            </div>
          </GenericForm>
        </div>

        {/* Right: Ticket Details */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <button className="flex items-center gap-2 text-sm text-gray-700 border px-3 py-1 rounded mb-4 hover:bg-gray-100">
            🖨️ Print
          </button>
          <div className="text-sm space-y-4">
            <div>
              <p className="text-gray-500">Number</p>
              <p className="font-medium">SH-9431776</p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p className="font-medium">Technical Support</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Open
              </span>
            </div>
            <div>
              <p className="text-gray-500">Priority</p>
              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                High
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Message History */}
      <div className="mt-10 md:col-span-2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Message History</h2>
        <div className="space-y-4">
          {message.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.actin === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-4 shadow-sm ${
                  msg.actin === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm font-semibold mb-1">{msg.name}</p>
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleTicketPage;
