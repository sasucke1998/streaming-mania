export interface Account {
  platform: string;
  email: string;
  password: string;
  cost: number;
  paidUsers: number;
  totalUsers: number;
  clients: {
    id: string;
    name: string;
    pin: string;
    phone: string;
    isPaid: boolean;
    amountDue: number;
    visits?: number;
  }[];
}