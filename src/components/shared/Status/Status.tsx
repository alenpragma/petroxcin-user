import { cn } from "@/src/lib/utils";

const Status = ({ title }: { title: string }) => {
  return (
    <button
      className={cn(
        "w-[120px] py-2 rounded font-medium",
        title === "Running" ||
          (title === "Active" &&
            "text-[#21a439]  w-fit"),
        title === "Pending" ||
          (title === "In Active" &&
            "text-[#FFA800]   w-fit"),
        title === "Completed" && " border-[#7EDAC5] text-[#21a439] w-fit",
        title === "paid" && "text-[#21a439] w-fit",
        title === "Pending" && "text-[#FFA800] w-fit",
        title === "Expired" && "text-[#f62d2d] w-fit",
      )}
    >
      {title}
    </button>
  );
};
export default Status;
