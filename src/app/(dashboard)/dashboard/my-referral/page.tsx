import MyReferralComponents from "@/src/components/dashboard/my-referrals/MyReferral";
import ReferralComponents from "@/src/components/dashboard/my-team/MyTeam";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Referral | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const MyReferralPage = async () => {
  return <MyReferralComponents />;
};
export default MyReferralPage;
