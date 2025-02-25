
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { ComboFormData } from "@/types/combo";

export default function Index() {
  const [activeView, setActiveView] = useState<"dashboard" | "accounts" | "combos">("dashboard");
  const { accounts, setAccounts, isNewAccountDialogOpen, setIsNewAccountDialogOpen, openPlatforms, handleEditAccount, handleUpdateAccount, handleDeleteAccount, handleNewAccount, togglePlatform } = useAccountManagement();
  const {
    searchQuery,
    setSearchQuery,
    filteredClients,
    handleTogglePaid,
    handleDeleteClient,
    handleExportToExcel,
    markAllUnpaid
  } = useClientManagement(accounts);

  const { combos, handleCreateCombo } = useComboManagement();
  const { toast } = useToast();

  // Calculate basic stats
  const totalClients = filteredClients.length;
  const paidClients = filteredClients.filter(client => client.isPaid).length;
  const unpaidClients = totalClients - paidClients;

  // Organize accounts by platform
  const accountsByPlatform = accounts.reduce((acc, account) => {
    if (!acc[account.platform]) {
      acc[account.platform] = [];
    }
    acc[account.platform].push(account);
    return acc;
  }, {} as Record<string, typeof accounts>);

  // Available platforms for combos with their stats
  const availablePlatforms = accounts.map(account => ({
    platform: account.platform,
    cost: account.cost,
    totalUsers: account.totalUsers,
    paidUsers: account.paidUsers
  }));

  const handleNewCombo = (data: ComboFormData) => {
    handleCreateCombo({
      name: data.clientName,
      platforms: data.selectedPlatforms,
      cost: data.manualPrice
    });
    
    toast({
      title: "Combo creado",
      description: "El combo ha sido creado exitosamente"
    });
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <>
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
                <Button onClick={() => console.log("Exportar cuentas")}>
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
            <div>
              <h2 className="mb-4 text-2xl font-bold">Lista de Clientes</h2>
              <ClientList
                clients={filteredClients}
                onTogglePaid={handleTogglePaid}
                onDeleteClient={handleDeleteClient}
              />
            </div>
          </>
        );
      case "accounts":
        return (
          <PlatformAccounts
            accountsByPlatform={accountsByPlatform}
            openPlatforms={openPlatforms}
            onTogglePlatform={togglePlatform}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            onEditClient={(email, clientId, data) => {
              console.log("Edit client:", email, clientId, data);
            }}
            onAddClient={(email, data) => {
              console.log("Add client:", email, data);
            }}
            onDeleteClient={(email, clientId) => {
              console.log("Delete client:", email, clientId);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onNewAccount={() => setIsNewAccountDialogOpen(true)}
      />
      <main className="container mx-auto px-4 py-8">
        <Stats
          totalClients={totalClients}
          paidClients={paidClients}
          unpaidClients={unpaidClients}
          totalCombos={combos.length}
        />
        {renderContent()}
      </main>
    </div>
  );
}
