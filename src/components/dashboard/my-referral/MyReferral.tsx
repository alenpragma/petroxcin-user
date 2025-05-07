"use client";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import React, { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

type User = {
  name: string;
  email: string;
  level: number;
  status: string;
  createdAt: string;
  referredUsers: User[];
};

const generateReferralTree = (level: number, maxLevel: number): User => {
  const user: User = {
    name: `User Level ${level}`,
    email: `user${level}@example.com`,
    level,
    status: "active",
    createdAt: `2024-04-${String(level).padStart(2, "0")}`,
    referredUsers:
      level < maxLevel ? [generateReferralTree(level + 1, maxLevel)] : [],
  };
  return user;
};

const userData: User[] = [generateReferralTree(1, 10)];

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
      <td className="py-3 px-4">
        <div
          className="flex items-center"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {user.name}{" "}
          {hasChildren ? (
            <button onClick={toggleExpand} className="ml-2">
              {isExpanded ? (
                <CiCircleMinus className="size-6" />
              ) : (
                <CiCirclePlus className="size-6" />
              )}
            </button>
          ) : (
            <span className="mr-6" />
          )}
        </div>
      </td>
      <td className="py-3 px-4">{user.email}</td>
      <td className="py-3 px-4">{user.status}</td>
      <td className="py-3 px-4">{user.createdAt}</td>
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {users.map((user, index) => {
        const id = `${user.level}-${user.email}-${index}`;
        const isOpen = expanded[id] || false;
        const hasChildren = user.referredUsers.length > 0;

        return (
          <React.Fragment key={id}>
            <TreeRow
              user={user}
              level={level}
              isExpanded={isOpen}
              toggleExpand={() => toggle(id)}
              hasChildren={hasChildren}
            />
            {isOpen && hasChildren && (
              <RecursiveTable users={user.referredUsers} level={level + 1} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default function ReferralComponents() {
  return (
    <div className=" bg-white rounded shadow">
      <div className="p-4">
        <DashboardTitle title="My Referral" />
      </div>
      <table className="w-full border mt-3">
        <thead className="bg-blue-100">
          <tr>
            <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
              Username
            </th>
            <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
              Email
            </th>
            <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
              Status
            </th>
            <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          <RecursiveTable users={userData} />
        </tbody>
      </table>
    </div>
  );
}
