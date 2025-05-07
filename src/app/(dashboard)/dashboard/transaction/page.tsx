import TransactionComponents from "@/src/components/dashboard/Transaction/Transaction";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Transaction | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const TransactionPage = async () => {
  return (
    <div>
      <TransactionComponents />
    </div>
  );
};

export default TransactionPage;
