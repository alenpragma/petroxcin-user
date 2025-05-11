import { Metadata } from "next";
import Link from "next/link";
import { CiWarning } from "react-icons/ci";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Error | Petroxcin",
    description: "View your profile and dashboard overview.",
  };
};

const ErrorPage = async () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-3">
        <CiWarning className="size-12 text-red-500" />
        <h1 className="text-3xl font-medium text-red-600">
          Transaction failed
        </h1>
        <p>
          Your payment was not successfully prcesed. Please contact out customer
          support
        </p>
        <Link href="/">
          {" "}
          <button className="bg-green-300 font-medium px-6 py-2 rounded-md">
            Back Home
          </button>
        </Link>{" "}
      </div>
    </div>
  );
};
export default ErrorPage;
