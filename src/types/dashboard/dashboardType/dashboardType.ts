export interface IUserProfileResponse {
  user: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    wallet: string;
    profit_wallet: string;
    refer_code: string;
    refer_by: number;
    is_active: number;
    is_block: number;
    created_at: string;
    updated_at: string;
    kyc_status: string;
  };
  teamInvest: number;
  directRefer: number;
  totalTeam: number;
  roi: number;
  totalInvestment: number;
  totalWithdraw: number;
  totalTransfer: number;
  totalDeposit: number;
  totalEarning: number;
  totalReferBonus: number;
  profit_wallet: string;
  wallet: string;
}
