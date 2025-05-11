import DashboardProvider from "@/src/components/Provider/DashboardProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardProvider>{children}</DashboardProvider>;
};
export default DashboardLayout;
