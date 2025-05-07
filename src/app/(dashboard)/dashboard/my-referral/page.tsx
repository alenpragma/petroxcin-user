import ReferralComponents from "@/src/components/dashboard/my-referral/MyReferral";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Referral | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const MyReferralPage = async () => {
  return <ReferralComponents />;
};
export default MyReferralPage;
