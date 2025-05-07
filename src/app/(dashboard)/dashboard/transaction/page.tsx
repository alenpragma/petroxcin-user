import TransactionComponents from "@/src/components/dashboard/Transaction/Transaction";
import { getData } from "@/src/lib/fetch/getData";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Transaction | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const TransactionPage = async () => {
  const transactionList = await getData("transactions");
  return (
    <div>
      <TransactionComponents transactionList={transactionList} />
    </div>
  );
};

export default TransactionPage;
