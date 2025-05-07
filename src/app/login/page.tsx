import LoginFormComponent from "@/src/components/loginAndSignUP/LoginForm";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Login | Petroxcin", 
    description: "View your profile and dashboard overview.",
  };
};

const LoginPage = () => {
  return (
    <>
      <LoginFormComponent />
    </>
  );
};
export default LoginPage;
