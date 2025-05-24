import KycComponents from "@/src/components/dashboard/kycComponents/KycComponents";
import { getDataWithValidation } from "@/src/lib/fetch/getDataWithValidation";

const KycPage = async () => {
  const { data: profileData } = await getDataWithValidation("profile");

  return (
    <>
      <KycComponents profileData={profileData} />
    </>
  );
};
export default KycPage;
