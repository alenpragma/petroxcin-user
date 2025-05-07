import WithdrawComponents from "@/src/components/dashboard/withdraw/Withdraw";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Withdraw | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const MyTeamPage = async () => {
  return <WithdrawComponents />;
};
export default MyTeamPage;
