
interface DashboardStats {
  totalClients: number;
  paidClients: number;
  unpaidClients: number;
  totalCombos: number;
  totalInvestment: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageClientValue: number;
}

interface Client {
  id: string;
  name: string;
  isPaid: boolean;
  visits: number;
}

interface Account {
  platform: string;
  cost: number;
  clients: Client[];
}

export const useDashboardStats = (
  accounts: Account[],
  combos: any[]
): DashboardStats => {
  const allClients = accounts.flatMap(account => 
    account.clients.map(client => ({
      ...client,
      platform: account.platform,
      accountCost: account.cost
    }))
  );

  const totalClientsCount = allClients.length;
  const paidClientsCount = allClients.filter(client => client.isPaid).length;
  const unpaidClientsCount = totalClientsCount - paidClientsCount;
  const totalCombosCount = combos.length;

  // Calculate financial metrics
  const totalInvestment = accounts.reduce((total, account) => total + account.cost, 0);
  
  // Assuming each paid client generates revenue equal to their platform cost + 30% margin
  const totalRevenue = allClients
    .filter(client => client.isPaid)
    .reduce((total, client) => total + (client.accountCost * 1.3), 0);

  // Monthly revenue is calculated as total revenue / 12 (simplified)
  const monthlyRevenue = totalRevenue / 12;

  // Average revenue per client
  const averageClientValue = totalClientsCount > 0 ? totalRevenue / totalClientsCount : 0;

  return {
    totalClients: totalClientsCount,
    paidClients: paidClientsCount,
    unpaidClients: unpaidClientsCount,
    totalCombos: totalCombosCount,
    totalInvestment,
    totalRevenue,
    monthlyRevenue,
    averageClientValue
  };
};
