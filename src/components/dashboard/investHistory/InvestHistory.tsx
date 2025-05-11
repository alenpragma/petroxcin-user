"use client";
import { useState } from "react";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";
import { DateFormate } from "@/src/components/shared/DateFormate/DateFormate";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import { IInvestHistory } from "@/src/types/dashboard/investHistory/investHostory";
import Pagination from "@/src/components/pagination/Pagination";
import Status from "@/src/components/shared/Status/Status";
import { SkeletonRow } from "@/src/components/shared/skelton/Skelton";


const InvestHistoryComponents = () => {
  const [page, setPage] = useState(1);
  const queryParams = new URLSearchParams();
  queryParams.append("per_page", "10");
  queryParams.append("page", page.toString());
  const { data: investHistory, isLoading } = useGetData(
    ["investHistory", page],
    `/invest-history?${queryParams.toString()}`
  );
  const currentPage = investHistory?.current_page ?? 1;
  const lastPage = investHistory?.last_page ?? 1;

  const headers = [
    "SL",
    "Time",
    "Premium",
    "Amount",
    "Daily Revenue",
    "Received Day",
    "Duration",
    "Status",
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
                <TData>{item.package_name}</TData>
                <TData>${item.investment}</TData>
                <TData>${item.daily_roi}</TData>
                <TData>{item.total_receive_day} Days</TData>
                <TData>{item.duration} Days</TData>
                <TData>
                  {item.status === "1" ? (
                    <Status title="Active" />
                  ) : (
                    <Status title="In Active" />
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
  );
};

export default InvestHistoryComponents;
