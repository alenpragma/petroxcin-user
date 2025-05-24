import { DashboardPage } from "@/src/components/ui/dashboard/dashboardHome/dashboard-page";
import { getDataWithValidation } from "@/src/lib/fetch/getDataWithValidation";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Dashboard | Petroxcin", 
    description: "View your profile and dashboard overview.",
  };
};

const Dashboard = async () => {
  // const { data: profileData } = await getDataWithValidation("profile");
  return <DashboardPage />;
};
export default Dashboard;
