"use client";

import Link from "next/link"; // Import Link
import { formatDistanceToNow } from "date-fns";
import Status from "@/src/components/shared/Status/Status";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import Loadingcomponents from "@/src/components/shared/loadingComponents/LoadingComponents";

const AllTicketPage = () => {
  const headers = ["Number", "Subject", "Status", "Submitted", "Last Reply"];
  const { data: allTickets, isLoading } = useGetData(["allTicket"], `tickets`);

  if (isLoading) return <Loadingcomponents />;

  const chatList = Array.isArray(allTickets)
    ? allTickets.map((ticket: any) => ({
        id: ticket.id,
        number: ticket.ticket_id,
        subject: ticket.subject,
        status: ticket.status === "open" ? "Active" : "Inactive",
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
      }))
    : [];

  return (
    <div className="md:w-4/5 w-full mx-auto mt-10 space-y-4">
      {chatList.length === 0 ? (
        <div className="text-center text-gray-500">No tickets available.</div>
      ) : (
        <UseTable headers={headers} className="rounded-md">
          {chatList.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 transition-colors">
              <TData>
                <Link
                  href={`/dashboard/ticket/${item.id}`}
                  className="block w-full"
                >
                  {item.number}
                </Link>
              </TData>
              <TData>
                <Link
                  href={`/dashboard/ticket/${item.id}`}
                  className="block w-full"
                >
                  {item.subject}
                </Link>
              </TData>
              <TData>
                <Link
                  href={`/dashboard/ticket/${item.id}`}
                  className="block w-full"
                >
                  <Status title={item.status} />
                </Link>
              </TData>
              <TData>
                <Link
                  href={`/dashboard/ticket/${item.id}`}
                  className="block w-full"
                >
                  {new Date(item.created_at).toLocaleDateString()}
                </Link>
              </TData>
              <TData>
                <Link
                  href={`/dashboard/ticket/${item.id}`}
                  className="block w-full"
                >
                  {formatDistanceToNow(new Date(item.updated_at), {
                    addSuffix: true,
                  })}
                </Link>
              </TData>
            </tr>
          ))}
        </UseTable>
      )}
    </div>
  );
};

export default AllTicketPage;
