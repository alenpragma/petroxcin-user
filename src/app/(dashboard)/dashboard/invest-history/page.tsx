import InvestHistoryComponents from "@/src/components/dashboard/investHistory/InvestHistory";
import { getData } from "@/src/lib/fetch/getData";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Transaction | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const InvestHistoryPage = async () => {
  const transactionList = await getData("transactions");
  return (
    <div>
      <InvestHistoryComponents transactionList={transactionList} />
    </div>
  );
};

export default InvestHistoryPage;
