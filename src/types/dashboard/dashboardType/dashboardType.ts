export interface IUserProfileResponse {
  user: {
    id: number;
    name: string;
    image: string;
    birthday: string | null;
    nid_or_passport: string | null;
    address: string | null;
    email: string;
    mobile: string;
    refer_code: string;
    refer_by: string | null;
    is_active: string;
    is_block: string;
    kyc_status: string;
    created_at: string;
    updated_at: string;
  };
  wallet: string;
  profit_wallet: string;
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
}
