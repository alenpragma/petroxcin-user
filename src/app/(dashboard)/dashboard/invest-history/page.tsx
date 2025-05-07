import InvestHistoryComponents from "@/src/components/dashboard/investHistory/InvestHistory";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Transaction | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const InvestHistoryPage = async () => {
  return (
    <div>
      <InvestHistoryComponents />
    </div>
  );
};

export default InvestHistoryPage;
