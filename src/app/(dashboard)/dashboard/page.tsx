import { DashboardPage } from "@/src/components/ui/dashboard/dashboardHome/dashboard-page";
import { getData } from "@/src/lib/fetch/getData";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Dashboard | Petroxcin", 
    description: "View your profile and dashboard overview.",
  };
};

const Dashboard = async () => {
  const { data: profileData } = await getData("profile");
  return <DashboardPage profileData={profileData}/>;
};
export default Dashboard;
