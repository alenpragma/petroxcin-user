import PlanListComponents from "@/src/components/dashboard/planListComponents/PlanListComponents";
import { getData } from "@/src/lib/fetch/getData";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Premium List | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const PackagePage = async () => {
  const { data: packageList } = await getData("package");
  return (
    <div>
      <PlanListComponents packageList={packageList} />
    </div>
  );
};

export default PackagePage;
