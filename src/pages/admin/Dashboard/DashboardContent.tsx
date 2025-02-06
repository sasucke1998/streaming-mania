import { Stats } from "@/components/Stats";
import { DashboardActions } from "@/components/DashboardActions";
import { ClientList } from "@/components/ClientList";
import { useClientManagement } from "@/hooks/useClientManagement";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Account } from "@/types/account";

interface DashboardContentProps {
  accounts: Account[];
}

export function DashboardContent({ accounts }: DashboardContentProps) {
  const {
    searchQuery,
    setSearchQuery,
    filteredClients,
    handleTogglePaid,
    handleDeleteClient,
    handleExportToExcel,
    markAllUnpaid
  } = useClientManagement(accounts);

  const stats = useDashboardStats(accounts, []);

  console.log('Dashboard Stats:', stats); // Para debugging

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
      
      <Stats 
        totalClients={stats.totalClients}
        paidClients={stats.paidClients}
        unpaidClients={stats.unpaidClients}
        totalCombos={stats.totalCombos}
        totalInvestment={stats.totalInvestment}
        totalRevenue={stats.totalRevenue}
        monthlyRevenue={stats.monthlyRevenue}
        averageClientValue={stats.averageClientValue}
        showFinancialStats={true}
      />
      
      <DashboardActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExportToExcel={handleExportToExcel}
        onMarkAllUnpaid={markAllUnpaid}
      />
      
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b">Lista de Clientes</h2>
        <ClientList 
          clients={filteredClients}
          onTogglePaid={handleTogglePaid}
          onDeleteClient={handleDeleteClient}
        />
      </div>
    </div>
  );
}