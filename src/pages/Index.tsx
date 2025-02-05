
import { useState } from "react";
import { Stats } from "@/components/Stats";
import { ClientList } from "@/components/ClientList";
import { NewAccountDialog } from "@/components/NewAccountDialog";
import { EditAccountDialog } from "@/components/EditAccountDialog";
import { Header } from "@/components/Header";
import { DashboardActions } from "@/components/DashboardActions";
import { PlatformAccounts } from "@/components/PlatformAccounts";
import { ComboManagement } from "@/components/ComboManagement";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useClientManagement } from "@/hooks/useClientManagement";
import { useAccountManagement } from "@/hooks/useAccountManagement";
import { useComboManagement } from "@/hooks/useComboManagement";

const initialClients = [
  {
    id: "1",
    name: "Kiko",
    platform: "Netflix",
    pin: "5456",
    phone: "58860558",
    isPaid: true,
    amountDue: 15.99,
    visits: 0
  },
  {
    id: "2",
    name: "Juan Jose",
    platform: "Disney+",
    pin: "5659",
    phone: "+18097532939",
    isPaid: true,
    amountDue: 9.99,
    visits: 0
  },
];

const initialAccounts = [
  {
    platform: "Netflix",
    email: "sasuckeking@gmail.com",
    password: "gcdegg",
    cost: 15.99,
    paidUsers: 1,
    totalUsers: 1,
    clients: [
      {
        id: "1",
        name: "Kiko",
        pin: "5456",
        phone: "58860558",
        isPaid: true,
        amountDue: 15.99,
        visits: 0
      }
    ],
  },
  {
    platform: "Disney+",
    email: "nelsonmarketingdigital@gmail.com",
    password: "disney123",
    cost: 9.99,
    paidUsers: 1,
    totalUsers: 1,
    clients: [
      {
        id: "2",
        name: "Juan Jose",
        pin: "5659",
        phone: "+18097532939",
        isPaid: true,
        amountDue: 9.99,
        visits: 0
      }
    ],
  },
];

const Index = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "accounts" | "combos">("dashboard");
  
  const {
    accounts,
    setAccounts,
    editingAccount,
    setEditingAccount,
    isNewAccountDialogOpen,
    setIsNewAccountDialogOpen,
    openPlatforms,
    handleEditAccount,
    handleUpdateAccount,
    handleDeleteAccount,
    handleNewAccount,
    togglePlatform
  } = useAccountManagement(initialAccounts);

  const {
    searchQuery,
    setSearchQuery,
    filteredClients,
    handleTogglePaid,
    handleDeleteClient,
    handleExportToExcel,
    markAllUnpaid
  } = useClientManagement(accounts);

  const {
    combos,
    comboClients,
    handleCreateCombo,
    handleAddComboClient,
    handleUpdateCombo,
    handleUpdateComboClient,
    handleDeleteCombo
  } = useComboManagement();

  const dashboardStats = useDashboardStats(accounts, combos);

  const accountsByPlatform = accounts.reduce((acc, account) => {
    if (!acc[account.platform]) {
      acc[account.platform] = [];
    }
    acc[account.platform].push(account);
    return acc;
  }, {} as Record<string, typeof accounts[0][]>);

  return (
    <div className="container mx-auto py-6">
      <Header 
        activeView={activeView}
        setActiveView={setActiveView}
        onNewAccount={() => setIsNewAccountDialogOpen(true)}
      />

      {activeView === "dashboard" && (
        <>
          <Stats 
            totalClients={dashboardStats.totalClients}
            paidClients={dashboardStats.paidClients}
            unpaidClients={dashboardStats.unpaidClients}
            totalCombos={dashboardStats.totalCombos}
            showFinancialStats={false}
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
        </>
      )}

      {activeView === "accounts" && (
        <PlatformAccounts 
          accountsByPlatform={accountsByPlatform}
          openPlatforms={openPlatforms}
          onTogglePlatform={togglePlatform}
          onEdit={handleEditAccount}
          onDelete={handleDeleteAccount}
          onEditClient={(email, clientId, data) => {
            setAccounts(accounts.map(account => 
              account.email === email
                ? {
                    ...account,
                    clients: account.clients.map(client =>
                      client.id === clientId
                        ? { ...client, ...data }
                        : client
                    )
                  }
                : account
            ));
          }}
          onAddClient={(email, data) => {
            setAccounts(accounts.map(account => 
              account.email === email
                ? {
                    ...account,
                    clients: [...account.clients, {
                      id: Math.random().toString(36).substr(2, 9),
                      isPaid: false,
                      visits: 0,
                      ...data
                    }]
                  }
                : account
            ));
          }}
          onDeleteClient={(email, clientId) => {
            setAccounts(accounts.map(account => ({
              ...account,
              clients: account.clients.filter(client => client.id !== clientId)
            })));
          }}
        />
      )}

      {activeView === "combos" && (
        <ComboManagement
          accounts={accounts}
          combos={combos}
          comboClients={comboClients}
          onComboCreate={handleCreateCombo}
          onComboClientAdd={handleAddComboClient}
          onComboUpdate={handleUpdateCombo}
          onClientUpdate={handleUpdateComboClient}
          onComboDelete={handleDeleteCombo}
        />
      )}

      <NewAccountDialog
        open={isNewAccountDialogOpen}
        onOpenChange={setIsNewAccountDialogOpen}
        onSubmit={handleNewAccount}
      />

      {editingAccount && (
        <EditAccountDialog
          open={!!editingAccount}
          onOpenChange={(open) => !open && setEditingAccount(null)}
          onSubmit={handleUpdateAccount}
          account={editingAccount}
        />
      )}
    </div>
  );
};

export default Index;
