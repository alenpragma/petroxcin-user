import { Card, CardContent } from "@/src/components/ui/card";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";
import { Wallet } from "lucide-react";

export function WalletCards({
  profileData,
}: {
  profileData: IUserProfileResponse;
}) {
  const wallets = [
    {
      title: "Profit Wallet",
      value: profileData?.profit_wallet,
      bgColor: "bg-[#487FFF]",
      icon: (
        <div className="bg-white p-3 rounded-full">
          <Wallet className="h-6 w-6 text-orange-500" />
        </div>
      ),
    },
    {
      title: "Main Wallet",
      value: profileData.wallet,
      bgColor: "bg-[#8252E9]",
      icon: (
        <div className="bg-white p-3 rounded-full">
          <Wallet className="h-6 w-6 text-orange-500" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {wallets.map((wallet, index) => (
        <Card key={index} className={`${wallet.bgColor} text-white`}>
          <CardContent className="py-8">
            <div className="flex items-center gap-4">
              {wallet.icon}
              <div>
                <div className="text-sm font-medium">{wallet.title}</div>
                <div className="text-2xl font-bold">
                  ${parseFloat(wallet.value).toFixed(3)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
