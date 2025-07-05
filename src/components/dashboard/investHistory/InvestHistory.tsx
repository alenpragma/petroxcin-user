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
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "../../shared/toastAlert/ToastSuccess";
import Swal from "sweetalert2";
import { cn } from "@/src/lib/utils";

const InvestHistoryComponents = () => {
  const [page, setPage] = useState(1);
  const queryParams = new URLSearchParams();
  queryParams.append("per_page", "10");
  queryParams.append("page", page.toString());
  const {
    data: investHistory,
    isLoading,
    refetch,
  } = useGetData(
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
    "Action",
  ];

  const cancelInvestMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.post(`/cancel-invest`, { id: id });
      return response.data;
    },
    onSuccess: (data) => {
      showSuccessModal("Success", "Successfuly canceled");
      refetch();
    },
    onError: (error: any) => {
      showErrorModal("Oops!", error.message.message);
    },
  });

  const handleClick = (id: number) => {
    const swalWithCustomClass = Swal.mixin({
      customClass: {
        popup: "rounded-lg shadow-lg p-6 w-fit",
        title: "text-xl font-semibold text-gray-800",
        htmlContainer: "text-sm text-gray-600",
        confirmButton: "bg-[#28a02e] px-3 py-1 text-white rounded",
        cancelButton: "bg-[#f34c4c]  px-3 py-1 text-white rounded",
        actions: "flex gap-2 justify-end mt-4",
      },
      buttonsStyling: false, // must be false for custom classes to apply
    });

    swalWithCustomClass
      .fire({
        title: "Are you sure?",
        text: "You cancel this package?",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          cancelInvestMutation.mutate(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  };

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
                  {Number(item.status) === 1 ? (
                    <Status title="Active" />
                  ) : (
                    <Status title="Canceled" />
                  )}
                </TData>{" "}
                <TData>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={cn(
                      "px-3 py-1 text-red-500 hover:text-red-700 bg-gray-200 hover:bg-red-100 border rounded",
                      Number(item.status) === 0 &&
                        "cursor-not-allowed opacity-50"
                    )}
                    disabled={Number(item.status) === 0}
                  >
                    Cancel
                  </button>
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
