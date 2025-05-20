"use client";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import React, { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Status from "@/src/components/shared/Status/Status";
import { DateFormate } from "@/src/components/shared/DateFormate/DateFormate";
import UseTable, { TData } from "@/src/components/shared/table/UseTable";
import { SkeletonRow } from "@/src/components/shared/skelton/Skelton";

type User = {
  level: number;
  email: string;
  name: string;
  is_active: "0" | "1";
  created_at: string;
  investment: string;
  team: any[];
};

const TreeRow = ({
  user,
  level,
  isExpanded,
  toggleExpand,
  hasChildren,
}: {
  user: User;
  level: number;
  isExpanded: boolean;
  toggleExpand: () => void;
  hasChildren: boolean;
}) => {
  return (
    <tr className={level % 2 === 0 ? "bg-white" : "bg-gray-100"}>
      <TData className="py-3 px-4">
        <div
          className="flex items-center"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {user.name}
          {hasChildren ? (
            <button onClick={toggleExpand} className="ml-2">
              {isExpanded ? (
                <CiCircleMinus className="size-6" />
              ) : (
                <CiCirclePlus className="size-6" />
              )}
            </button>
          ) : (
            <span className="ml-8" />
          )}
        </div>
      </TData>
      <TData className="py-3 px-4">{user.email}</TData>
      <TData className="py-3 px-4">${user.investment}</TData>
      <TData className="py-3 px-4">
        {user.is_active === "0" ? (
          <Status title="In Active" />
        ) : (
          <Status title="Active" />
        )}
      </TData>
      <TData className="py-3 px-4">{DateFormate(user.created_at)}</TData>
    </tr>
  );
};

const RecursiveTable = ({
  users,
  level = 0,
}: {
  users: User[];
  level?: number;
}) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {users.map((user, index) => {
        const isOpen = expanded[index] || false;
        const hasChildren = user.team.length > 0;

        return (
          <React.Fragment key={index}>
            <TreeRow
              user={user}
              level={level}
              isExpanded={isOpen}
              toggleExpand={() => toggle(index)}
              hasChildren={hasChildren}
            />
            {isOpen && hasChildren && (
              <RecursiveTable users={user.team} level={level + 1} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const headers = ["Username", "Email", "Investment", "Status", "Joined Date"];

export default function MyTeamComponents() {
  const [page, setPage] = useState(1);
  const queryParams = new URLSearchParams();
  queryParams.append("per_page", "10");
  queryParams.append("page", page.toString());

  const { data: teamHistory, isLoading } = useGetData(
    ["team", page],
    `/team?${queryParams.toString()}`
  );

  const teamData: User[] = teamHistory?.team ?? [];
  return (
    <div className="bg-white rounded shadow">
      <div className="p-4">
        <DashboardTitle title="My Team" />
      </div>

      <div className="p-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : (
          <UseTable headers={headers} className="rounded-md">
            <RecursiveTable users={teamData} />
          </UseTable>
        )}
      </div>
    </div>
  );
}
