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
import { useState } from "react";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import { SkeletonRow } from "@/src/components/shared/skelton/Skelton";
import { IReferral } from "@/src/types/dashboard/myReferral/myReferral";
import { DateFormate } from "@/src/components/shared/DateFormate/DateFormate";
import Pagination from "@/src/components/pagination/Pagination";

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
    "SL",
    "Joined At",
    "Username",
    "Email",
    "Invest",
    "Status",
  ];
  const formSubmit: SubmitHandler<searchField> = async (data) => {};

  const [page, setPage] = useState(1);
  const queryParams = new URLSearchParams();
  queryParams.append("per_page", "10");
  queryParams.append("page", page.toString());
  const { data: myReferral, isLoading } = useGetData(
    ["myReferral", page],
    `/direct-refer?${queryParams.toString()}`
  );
  const currentPage = myReferral?.current_page ?? 1;
  const lastPage = myReferral?.last_page ?? 1;

  console.log(myReferral);

  return (
    <div className="bg-white ">
      <div className="p-4">
        <DashboardTitle title="My Referral" />
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
        <div className="p-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : (
            <UseTable headers={headers} className="rounded-md">
              {myReferral?.data?.map((item: IReferral, index: number) => (
                <tr key={item.id}>
                  <TData>{(currentPage - 1) * 10 + index + 1}</TData>
                  <TData>{DateFormate(item.created_at)}</TData>

                  <TData>{item.name}</TData>
                  <TData>{item.email}</TData>
                  <TData>${item.investment}</TData>
                  <TData>
                    {item.is_active === "0" ? (
                      <Status title="In Active" />
                    ) : (
                      <Status title="Active" />
                    )}
                  </TData>
                </tr>
              ))}
            </UseTable>
          )}
        </div>
        <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={setPage}
      />
      </div>
    </div>
  );
};

export default MyReferralComponents;
