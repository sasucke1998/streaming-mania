
import { Header } from "@/components/Header";
import { ClientList } from "@/components/ClientList";
import { ComboForm } from "@/components/ComboForm";
import { PlatformAccounts } from "@/components/PlatformAccounts";
import { useClientManagement } from "@/hooks/useClientManagement";
import { useAccountManagement } from "@/hooks/useAccountManagement";
import { useComboManagement } from "@/hooks/useComboManagement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stats } from "@/components/Stats";

export default function Index() {
  const { accounts, handleExportAccountsToExcel } = useAccountManagement();
  const {
    searchQuery,
    setSearchQuery,
    filteredClients,
    handleTogglePaid,
    handleDeleteClient,
    handleExportToExcel,
    markAllUnpaid
  } = useClientManagement(accounts);

  const { combos } = useComboManagement();

  // Calculate basic stats
  const totalClients = filteredClients.length;
  const paidClients = filteredClients.filter(client => client.isPaid).length;
  const unpaidClients = totalClients - paidClients;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Stats
          totalClients={totalClients}
          paidClients={paidClients}
          unpaidClients={unpaidClients}
          totalCombos={combos.length}
        />

        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-4">
            <Input
              type="search"
              placeholder="Buscar cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button onClick={handleExportToExcel}>
              Exportar Clientes
            </Button>
            <Button onClick={handleExportAccountsToExcel}>
              Exportar Cuentas
            </Button>
            <Button
              variant="destructive"
              onClick={markAllUnpaid}
            >
              Marcar Todos Como Impagos
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Lista de Clientes</h2>
            <ClientList
              clients={filteredClients}
              onTogglePaid={handleTogglePaid}
              onDeleteClient={handleDeleteClient}
            />
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Cuentas por Plataforma</h2>
            <PlatformAccounts />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Crear Nuevo Combo</h2>
          <ComboForm />
        </div>
      </main>
    </div>
  );
}
