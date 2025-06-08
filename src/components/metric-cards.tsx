import { Card, CardContent } from "@/src/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { IUserProfileResponse } from "../types/dashboard/dashboardType/dashboardType";

export const MetricCards = ({
  profileData,
}: {
  profileData: IUserProfileResponse;
}) => {
  const metrics = [
    {
      first: "EAF1FF",
      second: "FFFFFF",
      title: "Profit Revenue",
      value: profileData?.roi,
      increase: "+200",
      icon: (
        <div className="bg-[#487FFF] size-14 p-1 rounded-full flex items-center justify-center">
          <CircleDollarSign className=" text-white size-full" />
        </div>
      ),
    },
    {
      first: "FFF6EB",
      second: "FFFFFF",
      title: "Total Investment",
      value: profileData?.totalInvestment,
      increase: "+200",
      icon: (
        <div className="bg-[#F4941E] size-14 p-1 rounded-full flex items-center justify-center">
          <CircleDollarSign className=" text-white size-full" />
        </div>
      ),
    },
    {
      first: "FFE5FD",
      second: "FFFFFF",
      title: "Team Investment",
      value: profileData.teamInvest,
      increase: "+200",
      icon: (
        <div className="bg-[#DE3ACE]  size-14 p-1 rounded-full flex items-center justify-centerl">
          <CircleDollarSign className=" text-white size-full" />
        </div>
      ),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          style={{
            backgroundImage: `linear-gradient(135deg,  #${metric.second}, #${metric.first})`,
          }}
        >
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              {metric.icon}
              <div>
                <div className="text-sm text-slate">{metric.title}</div>
                <div className="text-2xl font-bold">${metric.value}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
