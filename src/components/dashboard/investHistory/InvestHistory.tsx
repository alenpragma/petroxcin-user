"use client";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";
import { DateFormate } from "@/src/components/shared/DateFormate/DateFormate";
import { cn } from "@/src/lib/utils";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import { IInvestHistory } from "@/src/types/dashboard/investHistory/investHostory";
import Pagination from "@/src/components/pagination/Pagination";

export const SkeletonRow = () => (
  <Skeleton
    count={1}
    height={30}
    baseColor="#b3cccc"
    highlightColor="#ffffff"
  />
);

const InvestHistoryComponents = () => {
  const [page, setPage] = useState(1);
  const queryParams = new URLSearchParams();
  queryParams.append("per_page", "10");
  queryParams.append("page", page.toString());
  const { data: investHistory, isLoading } = useGetData(
    ["investHistory", page],
    `/transactions?keyword=package_purchased&${queryParams.toString()}`
  );
  const currentPage = investHistory?.current_page ?? 1;
  const lastPage = investHistory?.last_page ?? 1;

  const headers = [
    "SL",
    "Time",
    "Transaction Id",
    "Amount",
    "Remark",
    "Details",
  ];

  return (
    <div className="bg-white">
      <div className="p-4">
        <DashboardTitle title="Invest History" />
      </div>

      <div className="p-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : (
          <UseTable headers={headers} className="rounded-md">
            {investHistory?.data?.map((item: IInvestHistory, index: number) => (
              <tr key={item.id}>
                <TData>{(currentPage - 1) * 10 + index + 1}</TData>
                <TData>{DateFormate(item.created_at)}</TData>
                <TData>{item.transaction_id}</TData>
                <TData
                  className={cn(
                    item.type === "-" ? "text-red-500" : "text-green-500"
                  )}
                >
                  {item.type === "-" ? "(-)" : "(+)"} ${item.amount}
                </TData>
                <TData>{item.remark}</TData>
                <TData>{item.details}</TData>
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
  );
};

export default InvestHistoryComponents;
