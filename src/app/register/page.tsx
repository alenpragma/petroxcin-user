import RegisterForm from "@/src/components/loginAndSignUP/RegisterForm";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Register | Petroxcin", 
    description: "View your profile and dashboard overview.",
  };
};

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
