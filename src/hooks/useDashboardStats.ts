
import { ComboClient } from "@/types/combo";

interface DashboardStats {
  totalClients: number;
  paidClients: number;
  unpaidClients: number;
  totalCombos: number;
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
      platform: account.platform
    }))
  );

  const totalClientsCount = allClients.length;
  const paidClientsCount = allClients.filter(client => client.isPaid).length;
  const unpaidClientsCount = totalClientsCount - paidClientsCount;
  const totalCombosCount = combos.length;

  return {
    totalClients: totalClientsCount,
    paidClients: paidClientsCount,
    unpaidClients: unpaidClientsCount,
    totalCombos: totalCombosCount,
  };
};
