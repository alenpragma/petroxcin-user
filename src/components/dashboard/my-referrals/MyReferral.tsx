"use client";
import Form from "@/src/components/Form/Form";
import FormInputField from "@/src/components/Form/FormInputField";
import FormSelectField from "@/src/components/Form/FormSelectField";
import Status from "@/src/components/shared/Status/Status";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  days: z.string().optional(),
  text: z.string().optional(),
});
const options = [
  { label: "7 days", value: "7" },
  { label: "14 days", value: "14" },
  { label: "1 month", value: "30" },
];

type searchField = z.infer<typeof validationSchema>;

const MyReferralComponents = () => {
  const headers = [
    "Username",
    "Email",
    "Invest",
    "Lavel",
    "Status",
    "Joined At",
  ];
  const formSubmit: SubmitHandler<searchField> = async (data) => {};

  return (
    <div className="bg-white ">
      <div className="p-4">
        <DashboardTitle title="My Team" />
        <div className="mt-8">
          <Form<searchField>
            onSubmit={formSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              days: "",
              text: "",
            }}
          >
            <div className="md:w-5/12 w-full flex items-center justify-between  gap-3">
              <div className="flex-1">
                <FormSelectField name="method" options={options} />
              </div>{" "}
              <FormInputField
                name="text"
                type="text"
                className="input-style"
                placeholder="Search"
              />
            </div>
          </Form>
        </div>
      </div>
      <div>
        <UseTable headers={headers} className="rounded-md">
          <tr className="">
            <TData>New Username 1</TData>
            <TData>newuser@gmail.com</TData>
            <TData>200</TData> 
            <TData>2</TData>
            <TData>
              <Status title="Active" />
            </TData>
            <TData>24/01/2025 - 11.12 AM</TData>
          </tr>
          <tr className="">
            <TData>New Username 1</TData>
            <TData>newuser@gmail.com</TData> <TData>200</TData>
            <TData>2</TData>
            <TData>
              <Status title="InActive" />
            </TData>
            <TData>24/01/2025 - 11.12 AM</TData>
          </tr>
        </UseTable>
      </div>
    </div>
  );
};

export default MyReferralComponents;
