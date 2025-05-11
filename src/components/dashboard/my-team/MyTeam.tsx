// "use client";
// import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
// import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
// import React, { useState } from "react";
// import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

// type User = {
//   name: string;
//   email: string;
//   level: number;
//   status: string;
//   createdAt: string;
//   referredUsers: User[];
// };

// const generateReferralTree = (level: number, maxLevel: number): User => {
//   const user: User = {
//     name: `User Level ${level}`,
//     email: `user${level}@example.com`,
//     level,
//     status: "active",
//     createdAt: `2024-04-${String(level).padStart(2, "0")}`,
//     referredUsers:
//       level < maxLevel ? [generateReferralTree(level + 1, maxLevel)] : [],
//   };
//   return user;
// };

// const userData: User[] = [generateReferralTree(1, 10)];

// const TreeRow = ({
//   user,
//   level,
//   isExpanded,
//   toggleExpand,
//   hasChildren,
// }: {
//   user: User;
//   level: number;
//   isExpanded: boolean;
//   toggleExpand: () => void;
//   hasChildren: boolean;
// }) => {
//   return (
//     <tr className={level % 2 === 0 ? "bg-white" : "bg-gray-100"}>
//       <td className="py-3 px-4">
//         <div
//           className="flex items-center"
//           style={{ paddingLeft: `${level * 20}px` }}
//         >
//           {user.name}{" "}
//           {hasChildren ? (
//             <button onClick={toggleExpand} className="ml-2">
//               {isExpanded ? (
//                 <CiCircleMinus className="size-6" />
//               ) : (
//                 <CiCirclePlus className="size-6" />
//               )}
//             </button>
//           ) : (
//             <span className="mr-6" />
//           )}
//         </div>
//       </td>
//       <td className="py-3 px-4">{user.email}</td>
//       <td className="py-3 px-4">{user.status}</td>
//       <td className="py-3 px-4">{user.createdAt}</td>
//     </tr>
//   );
// };

// const RecursiveTable = ({
//   users,
//   level = 0,
// }: {
//   users: User[];
//   level?: number;
// }) => {
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const toggle = (id: string) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <>
//       {users.map((user, index) => {
//         const id = `${user.level}-${user.email}-${index}`;
//         const isOpen = expanded[id] || false;
//         const hasChildren = user.referredUsers.length > 0;

//         return (
//           <React.Fragment key={id}>
//             <TreeRow
//               user={user}
//               level={level}
//               isExpanded={isOpen}
//               toggleExpand={() => toggle(id)}
//               hasChildren={hasChildren}
//             />
//             {isOpen && hasChildren && (
//               <RecursiveTable users={user.referredUsers} level={level + 1} />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </>
//   );
// };

// export default function MyTeamComponents() {
//   const [page, setPage] = useState(1);
//   const queryParams = new URLSearchParams();
//   queryParams.append("per_page", "10");
//   queryParams.append("page", page.toString());
//   const { data: teamHistory, isLoading } = useGetData(
//     ["team", page],
//     `/team&${queryParams.toString()}`
//   );
//   console.log(teamHistory);
//   const currentPage = teamHistory?.current_page ?? 1;
//   const lastPage = teamHistory?.last_page ?? 1;

//   return (
//     <div className=" bg-white rounded shadow">
//       <div className="p-4">
//         <DashboardTitle title="My Referral" />
//       </div>
//       <table className="w-full border mt-3">
//         <thead className="bg-blue-100">
//           <tr>
//             <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
//               Username
//             </th>
//             <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
//               Email
//             </th>
//             <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
//               Status
//             </th>
//             <th className="text-left py-3 px-4 text-[#5A5B60] font-normal">
//               Created At
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <RecursiveTable users={userData} />
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import React, { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

// ✅ Updated User type to match your actual API
type User = {
  id: number;
  name: string;
  email: string;
  level: number;
  refer_code: string;
  team: User[];
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
      <td className="py-3 px-4">
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
      </td>
      <td className="py-3 px-4">{user.email}</td>
      <td className="py-3 px-4">Active</td>
      <td className="py-3 px-4">N/A</td>
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
      {users.map((user) => {
        const isOpen = expanded[user.id] || false;
        const hasChildren = user.team.length > 0;

        return (
          <React.Fragment key={user.id}>
            <TreeRow
              user={user}
              level={level}
              isExpanded={isOpen}
              toggleExpand={() => toggle(user.id)}
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

  
console.log(teamHistory)
  return (
    <div className="bg-white rounded shadow">
      <div className="p-4">
        <DashboardTitle title="My Team" />
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
        <tbody>{!isLoading && <RecursiveTable users={teamData} />}</tbody>
      </table>
    </div>
  );
}
