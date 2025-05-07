import PaymentLogComponents from "@/src/components/dashboard/paymentLog/PaymentLog";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Payment Log| Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const PaymentLogPage = async () => {
  return (
    <>
      <PaymentLogComponents />
    </>
  );
};
export default PaymentLogPage;
