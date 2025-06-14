"use client";

import { MetricCards } from "@/src/components/metric-cards";
import { QuickActions } from "@/src/components/ui/dashboard/dashboardHome/quick-actions";
import { WalletCards } from "@/src/components/ui/dashboard/dashboardHome/wallet-cards";
import { StatCards } from "@/src/components/ui/dashboard/dashboardHome/stat-cards";
import { EarningStatistic } from "@/src/components/ui/dashboard/dashboardHome/earning-statistic";
import { ReferralLink } from "@/src/components/ui/dashboard/dashboardHome/referral-link";
import { useGetData } from "@/src/utils/fetch/getData/getData";
import Loadingcomponents from "@/src/components/shared/loadingComponents/LoadingComponents";

export function DashboardPage() {
  const { data: profile, isLoading } = useGetData(["profile"], `/profile`);
  const profileData = profile?.data;
  if (isLoading) {
    return <Loadingcomponents />;
  }
  return (
    <>
      <div className="md:hidden block">
        <WalletCards profileData={profileData} />
      </div>
      <MetricCards profileData={profileData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <QuickActions />
          <EarningStatistic profileData={profileData} />
        </div>
        <div className="space-y-6">
          <div className="md:block hidden">
            <WalletCards profileData={profileData} />
          </div>{" "}
          <StatCards profileData={profileData} />
          <ReferralLink refer={profileData.user.refer_code} />
        </div>
      </div>
    </>
  );
}
