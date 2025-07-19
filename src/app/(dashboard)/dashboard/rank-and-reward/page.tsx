import RankAndRewardComponent from "@/src/components/dashboard/RankAndReward/RankAndReward";
import TransactionComponents from "@/src/components/dashboard/Transaction/Transaction";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Transaction | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const RewardAndRankPage = async () => {
  return (
    <div>
      <RankAndRewardComponent />
    </div>
  );
};

export default RewardAndRankPage;
