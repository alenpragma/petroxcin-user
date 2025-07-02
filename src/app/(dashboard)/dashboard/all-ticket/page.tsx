"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Status from "@/src/components/shared/Status/Status";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";

type ChatItem = {
  id: number;
  number: string;
  subject: string;
  created_at: string;
  updated_at: string;
  status: "Active" | "Inactive";
};

const chatList: ChatItem[] = [
  {
    id: 1,
    number: "#84574",
    subject: "Order Issue",
    created_at: "2025-06-25",
    updated_at: "2025-06-28",
    status: "Active",
  },
  {
    id: 2,
    number: "#843474",
    subject: "Order Issue",
    created_at: "2025-06-30",
    updated_at: "2025-07-01",
    status: "Active",
  },
];

const AllTicketPage = () => {
  const headers = ["Number", "Subject", "Status", "Submitted", "Last Reply"];
  const router = useRouter();

  return (
    <div className="md:w-4/5 w-full mx-auto mt-10 space-y-4">
      {chatList.length === 0 ? (
        <div className="text-center text-gray-500">No tickets available.</div>
      ) : (
        <UseTable headers={headers} className="rounded-md">
          {chatList.map((item) => (
            <tr
              key={item.id}
              onClick={() => router.push(`/dashboard/ticket/${item.id}`)}
              className="hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <TData>{item.number}</TData>
              <TData>{item.subject}</TData>
              <TData>
                <Status title={item.status} />
              </TData>
              <TData>{item.created_at}</TData>
              <TData>
                {formatDistanceToNow(new Date(item.updated_at), {
                  addSuffix: true,
                })}
              </TData>
            </tr>
          ))}
        </UseTable>
      )}
    </div>
  );
};

export default AllTicketPage;
