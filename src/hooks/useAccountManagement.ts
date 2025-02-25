
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
    togglePlatform
  };
};
