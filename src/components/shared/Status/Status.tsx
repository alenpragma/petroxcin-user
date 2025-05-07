import { cn } from "@/src/lib/utils";

const Status = ({ title }: { title: string }) => {
  return (
    <button
      className={cn(
        "w-[120px] py-2 rounded font-medium",
        title === "Running" ||
          (title === "Active" &&
            "bg-[#D8FFF4] border border-[#7EDAC5] text-[#10665D]"),
        title === "Pending" ||
          (title === "InActive" &&
            "bg-[#FFEDC9] border border-[#DDAA47] text-[#FFA800]")
      )}
    >
      {title}
    </button>
  );
};
export default Status;
