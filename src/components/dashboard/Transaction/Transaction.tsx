"use client";
import Form from "@/src/components/Form/Form";
import FormInputField from "@/src/components/Form/FormInputField";
import FormSelectField from "@/src/components/Form/FormSelectField";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DateFormate } from "../../shared/DateFormate/DateFormate";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import Pagination from "@/src/components/pagination/Pagination";
import { ITransactions } from "@/src/types/dashboard/transactionType/transactionType";
import Status from "@/src/components/shared/Status/Status";
import { SkeletonRow } from "@/src/components/shared/skelton/Skelton";

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

const TransactionComponents = () => {
  const [page, setPage] = useState(1);
  const queryParams = new URLSearchParams();
  queryParams.append("per_page", "10");
  queryParams.append("page", page.toString());
  const { data: transaction, isLoading } = useGetData(
    ["investHistory", page],
    `/transactions?${queryParams.toString()}`
  );
  const currentPage = transaction?.current_page ?? 1;
  const lastPage = transaction?.last_page ?? 1;

  const headers = [
    "SL",
    "Time",
    "Transaction Id",
    "Amount",
    "Remark",
    "Details",
    "Status",
  ];
  const formSubmit: SubmitHandler<searchField> = async (data) => {};

  return (
    <div className="bg-white ">
      <div className="p-4">
        <DashboardTitle title="Transaction" />
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : (
          <UseTable headers={headers} className="rounded-md">
            {transaction?.data.map((item: ITransactions, index: number) => (
              <tr className="">
                <TData>{(currentPage - 1) * 10 + index + 1}</TData>
                <TData>{DateFormate(item.created_at)}</TData>
                <TData>{item.transaction_id}</TData>
                <TData
                  className={cn(
                    item.type === "-" ? "text-red-500" : "text-green-500"
                  )}
                >
                  {item.type === "-" ? "(-)" : "(+)"} $
                  {(Number(item.amount) + Number(item.charge)).toFixed(2)}
                </TData>
                <TData>
                  {item.remark === "interest" ? "Profit Revenue" : item.remark}
                </TData>
                <TData>{item.details}</TData>
                <TData>
                  <Status title={item.status} />
                </TData>
              </tr>
            ))}
          </UseTable>
        )}
      </div>{" "}
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TransactionComponents;
