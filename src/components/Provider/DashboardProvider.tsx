"use client";

import { Header } from "@/src/components/header";
import { Sidebar } from "@/src/components/sidebar";
import { useGetData } from "@/src/utils/fetch/axiosConfig/FetchData";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Loadingcomponents from "../shared/loadingComponents/LoadingComponents";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/dashboard/error") {
    return <>{children}</>;
  }
  const { data: profileData, isLoading } = useGetData(["profile"], `profile`);
  if (isLoading) {
    return <Loadingcomponents />;
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          profileData={profileData?.data}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F5F6FA]">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardProvider;
