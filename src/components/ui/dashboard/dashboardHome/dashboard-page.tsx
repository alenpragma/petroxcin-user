"use client";

import { MetricCards } from "@/src/components/metric-cards";
import { QuickActions } from "@/src/components/ui/dashboard/dashboardHome/quick-actions";
import { WalletCards } from "@/src/components/ui/dashboard/dashboardHome/wallet-cards";
import { StatCards } from "@/src/components/ui/dashboard/dashboardHome/stat-cards";
import { EarningStatistic } from "@/src/components/ui/dashboard/dashboardHome/earning-statistic";
import { ReferralLink } from "@/src/components/ui/dashboard/dashboardHome/referral-link";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";

export function DashboardPage({
  profileData,
}: {
  profileData: IUserProfileResponse;
}) {
  return (
    <>
      <MetricCards profileData={profileData}/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <QuickActions />
          <EarningStatistic />
        </div>
        <div className="space-y-6">
          <WalletCards  profileData={profileData} />
          <StatCards profileData={profileData}/>
          <ReferralLink refer={profileData.user.refer_code}/>
        </div>
      </div>
    </>
  );
}
