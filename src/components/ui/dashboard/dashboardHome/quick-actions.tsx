import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  CircleDollarSign,
  ArrowLeftRight,
  ArrowDownToLine,
} from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      title: "Deposit",
      icon: <CircleDollarSign className="size-10 text-blue-600" />,
      bgColor: "bg-blue-800",
      textColor: "text-white",
      link: "/dashboard/add-fund",
    },
    {
      title: "Invest",
      icon: <CircleDollarSign className="size-10 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      link: "/dashboard/plan-list",
    },
    {
      title: "Transfer",
      icon: <ArrowLeftRight className="size-10 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      link: "/dashboard/transfer",
    },
    {
      title: "Withdraw",
      icon: <ArrowDownToLine className="size-10 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      link: "/dashboard/withdraw",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Link href={`${action.link}`}>
              <div
                key={index}
                className={`bg-[#ECF2FF] hover:bg-[#001F4C] hover:text-white duration-300 py-10 border rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-center">
                  {action.icon}
                </div>
                <div className="font-medium text-[24px]">{action.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
