import ForgotPassComponents from "@/src/components/loginAndSignUP/ForgotPassComponents";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Login | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const ForgotPasswordPage = async () => {
  return (
    <>
      <ForgotPassComponents />
    </>
  );
};
export default ForgotPasswordPage;
