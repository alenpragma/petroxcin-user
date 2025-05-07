import DashboardHome from "@/src/components/dashboard/AddFund/AddFund";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Add-fund | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};
const WalletPage = () => {
  return (
    <>
      <DashboardHome />
    </>
  );
};

export default WalletPage;
