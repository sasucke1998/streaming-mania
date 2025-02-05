
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

  return (
    <div className="space-y-6">
      <Stats 
        {...stats}
        showFinancialStats={true}
      />
      <DashboardActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExportToExcel={handleExportToExcel}
        onMarkAllUnpaid={markAllUnpaid}
      />
      <ClientList 
        clients={filteredClients}
        onTogglePaid={handleTogglePaid}
        onDeleteClient={handleDeleteClient}
      />
    </div>
  );
}
