
import { useState } from "react";
import { Account } from "@/types/account";
import { useToast } from "@/hooks/use-toast";

const initialAccountState: Account[] = [
  {
    platform: "Netflix",
    email: "",
    password: "",
    cost: 0,
    paidUsers: 0,
    totalUsers: 0,
    clients: []
  }
];

export const useAccountManagement = (initialAccounts: Account[] = initialAccountState) => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  const [openPlatforms, setOpenPlatforms] = useState<string[]>([]);
  const { toast } = useToast();

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

  const handleNewAccount = (data: { platform: string; email: string; password: string; cost: number }) => {
    const newAccount: Account = {
      ...data,
      paidUsers: 0,
      totalUsers: 0,
      clients: [],
    };
    setAccounts(prev => [...prev, newAccount]);
    toast({
      title: "Cuenta creada",
      description: "La cuenta ha sido creada exitosamente",
    });
  };

  const handleAddClient = (accountEmail: string, clientData: Omit<Account["clients"][0], "id" | "isPaid">) => {
    setAccounts(prev => prev.map(account => {
      if (account.email === accountEmail) {
        const newClient = {
          ...clientData,
          id: crypto.randomUUID(),
          isPaid: false,
          visits: 0
        };
        
        return {
          ...account,
          clients: [...account.clients, newClient],
          totalUsers: account.totalUsers + 1
        };
      }
      return account;
    }));

    toast({
      title: "Cliente agregado",
      description: "El cliente ha sido agregado exitosamente",
    });
  };

  const handleUpdateClient = (accountEmail: string, clientId: string, data: Omit<Account["clients"][0], "id" | "isPaid">) => {
    setAccounts(prev => prev.map(account => {
      if (account.email === accountEmail) {
        return {
          ...account,
          clients: account.clients.map(client => 
            client.id === clientId
              ? { ...client, ...data }
              : client
          )
        };
      }
      return account;
    }));

    toast({
      title: "Cliente actualizado",
      description: "Los datos del cliente han sido actualizados exitosamente",
    });
  };

  const handleDeleteClient = (accountEmail: string, clientId: string) => {
    setAccounts(prev => prev.map(account => {
      if (account.email === accountEmail) {
        return {
          ...account,
          clients: account.clients.filter(client => client.id !== clientId),
          totalUsers: account.totalUsers - 1
        };
      }
      return account;
    }));

    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado exitosamente",
    });
  };

  const togglePlatform = (platform: string) => {
    setOpenPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return {
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
    handleAddClient,
    handleUpdateClient,
    handleDeleteClient,
    togglePlatform
  };
};
