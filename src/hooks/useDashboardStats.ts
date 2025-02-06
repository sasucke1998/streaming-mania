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
  amountDue: number;
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
  // Obtener todos los clientes de todas las cuentas
  const allClients = accounts.flatMap(account => account.clients);

  // Calcular estadísticas básicas
  const totalClientsCount = allClients.length;
  const paidClientsCount = allClients.filter(client => client.isPaid).length;
  const unpaidClientsCount = totalClientsCount - paidClientsCount;
  const totalCombosCount = combos.length;

  // Calcular estadísticas financieras
  const totalInvestment = accounts.reduce((total, account) => total + account.cost, 0);
  
  // Calcular ingresos totales (suma de amountDue de clientes pagados)
  const totalRevenue = allClients
    .filter(client => client.isPaid)
    .reduce((total, client) => total + client.amountDue, 0);

  // Calcular ingreso mensual promedio
  const monthlyRevenue = totalRevenue / 12;

  // Calcular valor promedio por cliente
  const averageClientValue = totalClientsCount > 0 
    ? totalRevenue / totalClientsCount 
    : 0;

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