import ConvertComponent from "@/src/components/dashboard/convert/convertComponent";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Convert | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};
const ConvertPage = () => {
  return <ConvertComponent />;
};
export default ConvertPage;
