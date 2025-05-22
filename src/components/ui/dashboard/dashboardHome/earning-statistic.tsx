import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";
import { CircleDollarSign, Users } from "lucide-react";

export function EarningStatistic({
  profileData,
}: {
  profileData: IUserProfileResponse;
}) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = [45, 30, 38, 42, 32, 40, 48, 42];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Earning Statistic</CardTitle>
          <p className="text-sm text-gray-500">Yearly earning overview</p>
        </div>
        <Select defaultValue="year">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="This Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
            <div className="bg-blue-100 p-2 rounded-md">
              <CircleDollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Daily Bonus</div>
              <div className="font-bold">
                $
                {Number(profileData.profit_wallet).toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <div className="bg-gray-100 p-2 rounded-md">
              <Users className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Refer Bonus</div>
              <div className="font-bold">${profileData.totalEarning}</div>
            </div>
          </div>
        </div>
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between">
            {data.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 w-1/8"
              >
                <div
                  className="bg-blue-600 w-10 rounded-sm"
                  style={{ height: `${value * 2}px` }}
                ></div>
                <div className="text-xs text-gray-500">{months[index]}</div>
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            {[70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
              <div key={value}>{value}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
