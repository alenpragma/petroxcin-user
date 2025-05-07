import MyTeamComponents from "@/src/components/dashboard/my-team/MyTeam";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "My Team | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const MyTeamPage = async () => {
  return <MyTeamComponents />;
};
export default MyTeamPage;
