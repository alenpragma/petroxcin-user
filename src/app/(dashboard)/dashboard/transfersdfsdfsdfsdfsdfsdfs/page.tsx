// import TransferComponents from "@/src/components/dashboard/transfer/Transfer";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Transfer | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const TransferPage = async () => {
  
  // return <TransferComponents />;
};
export default TransferPage;
