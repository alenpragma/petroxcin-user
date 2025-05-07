import { cn } from "@/src/lib/utils";

const DashboardTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h6 className={cn("font-semibold text-[24px]", className)}>{title}</h6>
  );
};

export default DashboardTitle;
