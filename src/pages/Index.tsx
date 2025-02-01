import { useState } from "react";
import { Stats } from "@/components/Stats";
import { ClientList } from "@/components/ClientList";
import { useToast } from "@/hooks/use-toast";
import { NewAccountDialog } from "@/components/NewAccountDialog";
import { EditAccountDialog } from "@/components/EditAccountDialog";
import * as XLSX from 'xlsx';
import { Header } from "@/components/Header";
import { DashboardActions } from "@/components/DashboardActions";
import { PlatformAccounts } from "@/components/PlatformAccounts";
import { Account } from "@/types/account";
import { ComboManagement } from "@/components/ComboManagement";
import { PlatformCombo, ComboClient } from "@/types/combo";

const initialClients = [
  {
    id: "1",
    name: "Kiko",
    platform: "Netflix",
    pin: "5456",
    phone: "58860558",
    isPaid: true,
    amountDue: 15.99,
  },
  {
    id: "2",
    name: "Juan Jose",
    platform: "Disney+",
    pin: "5659",
    phone: "+18097532939",
    isPaid: true,
    amountDue: 9.99,
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
        platform: "Netflix",
        pin: "5456",
        phone: "58860558",
        isPaid: true,
        amountDue: 15.99,
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
        platform: "Disney+",
        pin: "5659",
        phone: "+18097532939",
        isPaid: true,
        amountDue: 9.99,
      }
    ],
  },
];

const Index = () => {
  const [clients, setClients] = useState(initialClients);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [activeView, setActiveView] = useState<"dashboard" | "accounts">("dashboard");
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openPlatforms, setOpenPlatforms] = useState<string[]>([]);
  const { toast } = useToast();
  const [combos, setCombos] = useState<PlatformCombo[]>([]);
  const [comboClients, setComboClients] = useState<ComboClient[]>([]);

  const allClients = accounts.flatMap(account => 
    account.clients.map(client => ({
      ...client,
      platform: account.platform
    }))
  );

  const filteredClients = allClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const accountsByPlatform = accounts.reduce((acc, account) => {
    if (!acc[account.platform]) {
      acc[account.platform] = [];
    }
    acc[account.platform].push(account);
    return acc;
  }, {} as Record<string, Account[]>);

  const stats = {
    activeClients: allClients.length,
    paidClients: allClients.filter(client => client.isPaid).length,
    unpaidClients: allClients.filter(client => !client.isPaid).length,
    activeComboClients: comboClients.length,
  };

  const handleExportToExcel = () => {
    const clientsData = allClients.map(client => ({
      Nombre: client.name,
      Plataforma: client.platform,
      PIN: client.pin,
      Teléfono: client.phone,
      Estado: client.isPaid ? 'Pagado' : 'No Pagado',
      'Monto Pendiente': client.amountDue
    }));

    const ws = XLSX.utils.json_to_sheet(clientsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "clientes.xlsx");

    toast({
      title: "Exportación exitosa",
      description: "Los datos han sido exportados a Excel",
    });
  };

  const handleTogglePaid = (clientId: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => ({
        ...account,
        clients: account.clients.map(client => 
          client.id === clientId
            ? { ...client, isPaid: !client.isPaid }
            : client
        )
      }))
    );

    toast({
      title: "Estado actualizado",
      description: "El estado de pago del cliente ha sido actualizado",
    });
  };

  const handleEditAccount = (email: string) => {
    const account = accounts.find(acc => acc.email === email);
    if (account) {
      setEditingAccount(account);
    }
  };

  const handleUpdateAccount = (data: { platform: string; email: string; password: string; cost: number }) => {
    setAccounts(accounts.map(account => 
      account.email === editingAccount?.email
        ? { ...account, ...data }
        : account
    ));
    setEditingAccount(null);
    toast({
      title: "Cuenta actualizada",
      description: "Los cambios han sido guardados exitosamente",
    });
  };

  const handleDeleteAccount = (email: string) => {
    setAccounts(accounts.filter(account => account.email !== email));
  };

  const handleEditClient = (email: string, clientId: string, data: any) => {
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
  };

  const handleAddClient = (email: string, data: any) => {
    setAccounts(accounts.map(account => 
      account.email === email
        ? {
            ...account,
            clients: [...account.clients, {
              id: Math.random().toString(36).substr(2, 9),
              isPaid: false,
              ...data
            }]
          }
        : account
    ));
  };

  const handleDeleteClient = (clientId: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => ({
        ...account,
        clients: account.clients.filter(client => client.id !== clientId)
      }))
    );
    
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado exitosamente",
    });
  };

  const handleNewAccount = (data: { platform: string; email: string; password: string; cost: number }) => {
    setAccounts([
      ...accounts,
      {
        ...data,
        paidUsers: 0,
        totalUsers: 0,
        clients: [],
      },
    ]);
  };

  const togglePlatform = (platform: string) => {
    setOpenPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const markAllUnpaid = () => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => ({
        ...account,
        clients: account.clients.map(client => ({
          ...client,
          isPaid: false
        }))
      }))
    );
    toast({
      title: "Actualización masiva",
      description: "Todas las cuentas han sido marcadas como no pagadas",
    });
  };

  const handleCreateCombo = (comboData: Omit<PlatformCombo, "id">) => {
    const newCombo: PlatformCombo = {
      id: Math.random().toString(36).substr(2, 9),
      ...comboData,
    };
    setCombos([...combos, newCombo]);
  };

  const handleAddComboClient = (clientData: Omit<ComboClient, "id">) => {
    const newClient: ComboClient = {
      id: Math.random().toString(36).substr(2, 9),
      comboId: combos[combos.length - 1].id,
      ...clientData,
    };
    setComboClients([...comboClients, newClient]);
  };

  const handleUpdateCombo = (comboId: string, updatedData: Partial<PlatformCombo>) => {
    setCombos(prev => prev.map(combo => 
      combo.id === comboId ? { ...combo, ...updatedData } : combo
    ));
  };

  const handleUpdateComboClient = (clientId: string, updatedData: Partial<ComboClient>) => {
    setComboClients(prev => prev.map(client =>
      client.id === clientId ? { ...client, ...updatedData } : client
    ));
  };

  const handleDeleteCombo = (comboId: string) => {
    setCombos(prev => prev.filter(combo => combo.id !== comboId));
    setComboClients(prev => prev.filter(client => client.comboId !== comboId));
  };

  return (
    <div className="container mx-auto py-6">
      <Header 
        activeView={activeView}
        setActiveView={setActiveView}
        onNewAccount={() => setIsNewAccountDialogOpen(true)}
      />

      {activeView === "dashboard" ? (
        <>
          <Stats {...stats} />
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
        </>
      ) : (
        <PlatformAccounts 
          accountsByPlatform={accountsByPlatform}
          openPlatforms={openPlatforms}
          onTogglePlatform={togglePlatform}
          onEdit={handleEditAccount}
          onDelete={handleDeleteAccount}
          onEditClient={handleEditClient}
          onAddClient={handleAddClient}
          onDeleteClient={handleDeleteClient}
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
