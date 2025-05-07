export interface IPlan {
  id: number;
  name: string;
  min_amount: string;
  max_amount: string;
  interest_rate: string;
  duration: string;
  return_type: string;
  active: string;
  created_at: string;
  updated_at: string;
}

export interface IPlanList {
  status: boolean;
  data: IPlan[];
}
