
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useClientManagement } from "@/hooks/useClientManagement";
import { useAccountManagement } from "@/hooks/useAccountManagement";
import { useComboManagement } from "@/hooks/useComboManagement";
import { DashboardContent } from "./admin/Dashboard/DashboardContent";
import { AccountsContent } from "./admin/Dashboard/AccountsContent";
import { CombosContent } from "./admin/Dashboard/CombosContent";

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
    clients: [initialClients[0]],
  },
  {
    platform: "Disney+",
    email: "nelsonmarketingdigital@gmail.com",
    password: "disney123",
    cost: 9.99,
    paidUsers: 1,
    totalUsers: 1,
    clients: [initialClients[1]],
  },
];

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "accounts" | "combos">("dashboard");
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useAdminAuth();

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
    combos,
    comboClients,
    handleCreateCombo,
    handleAddComboClient,
    handleUpdateCombo,
    handleUpdateComboClient,
    handleDeleteCombo
  } = useComboManagement();

  if (!isAdminLoggedIn) {
    navigate("/admin");
    return null;
  }

  const accountsByPlatform = accounts.reduce((acc, account) => {
    if (!acc[account.platform]) {
      acc[account.platform] = [];
    }
    acc[account.platform].push(account);
    return acc;
  }, {} as Record<string, typeof accounts[0][]>);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onNewAccount={() => setIsNewAccountDialogOpen(true)}
      />

      {activeView === "dashboard" && (
        <DashboardContent accounts={accounts} />
      )}

      {activeView === "accounts" && (
        <AccountsContent
          accounts={accounts}
          openPlatforms={openPlatforms}
          onTogglePlatform={togglePlatform}
          onEditAccount={handleEditAccount}
          onDeleteAccount={handleDeleteAccount}
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
          accountsByPlatform={accountsByPlatform}
        />
      )}

      {activeView === "combos" && (
        <CombosContent
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
    </div>
  );
}
