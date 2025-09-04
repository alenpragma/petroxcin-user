export interface ITransactionList {
  id: number;
  transaction_id: string;
  user_id: number;
  amount: string;
  remark: string;
  type: string;
  status: string;
  details: string;
  created_at: string;
  updated_at: string;
}

export interface ITransaction {
  current_page: number;
  data: ITransactionList[];
  from: number | null;
  last_page: number;
  per_page: number;
  status: boolean;
  total: number;
}


export interface ITransactions {
  id: number;
  transaction_id: string;
  user_id: number;
  amount: number;
  remark: string;
  type: string;
  charge : string;
  status: string;
  details: string;
  created_at: string;
  updated_at: string;
}
