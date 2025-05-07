import { Card, CardContent } from "@/src/components/ui/card";
import { DashboardImage } from "@/src/lib/store/image/image";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  CircleDollarSign,
  Users,
} from "lucide-react";
import Image from "next/image";

export function StatCards({
  profileData,
}: {
  profileData: IUserProfileResponse;
}) {
  const stats = [
    {
      title: "Total Withdraw",
      value: profileData?.totalWithdraw,
      icon: (
        <div className="p-3 rounded-full size-14 bg-green-100">
          <Image className="size-full" src={DashboardImage.dcard1} alt="img" />{" "}
        </div>
      ),
      doller: true,
    },
    {
      title: "Total Transfer",
      value: profileData.totalTransfer,
      icon: (
        <div className="p-3 rounded-full size-14 bg-blue-100">
          <Image className="size-full" src={DashboardImage.dcard2} alt="img" />{" "}
        </div>
      ),
      doller: true,
    },
    {
      title: "Total Deposit",
      value: profileData.totalDeposit,
      icon: (
        <div className="p-3 rounded-full size-14 bg-pink-100">
          <Image className="size-full" src={DashboardImage.dcard3} alt="img" />{" "}
        </div>
      ),
      doller: true,
    },
    {
      title: "Total Earning",
      value: profileData.totalEarning,
      icon: (
        <div className="p-3 rounded-full size-14 bg-orange-100">
          <Image className="size-full" src={DashboardImage.dcard4} alt="img" />{" "}
        </div>
      ),
      doller: true,
    },
    {
      title: "Total Team",
      value: profileData.totalTeam,
      icon: (
        <div className="p-3 rounded-full size-14 bg-blue-100">
          <Image className="size-full" src={DashboardImage.dcard5} alt="img" />{" "}
        </div>
      ),
      doller: false,
    },
    {
      title: "Direct Team",
      value: profileData.directRefer,
      icon: (
        <div className="p-3 rounded-full size-14 bg-red-100">
          <Image className="size-full" src={DashboardImage.dcard6} alt="img" />{" "}
        </div>
      ),
      doller: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {stat.icon}
              <div>
                <div className="text-xs font-medium text-gray-500">
                  {stat.title}
                </div>
                <div className="text-lg font-bold">
                  {stat.doller === true && "$"}
                  {stat.value}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
