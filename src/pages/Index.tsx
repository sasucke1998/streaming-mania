import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { ClientList } from "@/components/ClientList";
import { AccountList } from "@/components/AccountList";
import { Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NewAccountDialog } from "@/components/NewAccountDialog";

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
  const { toast } = useToast();

  const stats = {
    activeClients: clients.length,
    paidClients: clients.filter(client => client.isPaid).length,
    unpaidClients: clients.filter(client => !client.isPaid).length,
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Editar cliente",
      description: "Funcionalidad de edición en desarrollo",
    });
  };

  const handleEditAccount = (email: string) => {
    toast({
      title: "Editar cuenta",
      description: "Funcionalidad de edición de cuenta en desarrollo",
    });
  };

  const handleTogglePaid = (id: string) => {
    setClients(clients.map(client => 
      client.id === id 
        ? { ...client, isPaid: !client.isPaid }
        : client
    ));
  };

  const handleMarkAllUnpaid = () => {
    setClients(clients.map(client => ({ ...client, isPaid: false })));
    toast({
      title: "Actualizado",
      description: "Todos los clientes han sido marcados como no pagados",
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

  const handleDeleteClient = (email: string, clientId: string) => {
    setAccounts(accounts.map(account => 
      account.email === email
        ? {
            ...account,
            clients: account.clients.filter(client => client.id !== clientId)
          }
        : account
    ));
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

  return (
    <div className="container mx-auto py-6">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Monitor className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-blue-500">Sistema de Streaming</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={activeView === "dashboard" ? "default" : "outline"}
            className={activeView === "dashboard" ? "bg-blue-500 hover:bg-blue-600" : ""}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </Button>
          <Button 
            variant={activeView === "accounts" ? "default" : "outline"}
            className={activeView === "accounts" ? "bg-blue-500 hover:bg-blue-600" : ""}
            onClick={() => setActiveView("accounts")}
          >
            Cuentas
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsNewAccountDialogOpen(true)}
          >
            + Nueva Cuenta
          </Button>
          {activeView === "dashboard" && (
            <Button 
              variant="outline" 
              onClick={handleMarkAllUnpaid}
              className="ml-auto"
            >
              Marcar Todo Como No Pagado
            </Button>
          )}
        </div>
      </header>

      {activeView === "dashboard" ? (
        <>
          <Stats {...stats} />
          <ClientList 
            clients={clients}
            onEdit={handleEdit}
            onTogglePaid={handleTogglePaid}
          />
        </>
      ) : (
        <AccountList 
          accounts={accounts}
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
    </div>
  );
};

export default Index;
