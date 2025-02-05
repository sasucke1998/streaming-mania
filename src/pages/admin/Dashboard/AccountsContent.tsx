
import { PlatformAccounts } from "@/components/PlatformAccounts";
import { Account } from "@/types/account";

interface AccountsContentProps {
  accounts: Account[];
  openPlatforms: string[];
  onTogglePlatform: (platform: string) => void;
  onEditAccount: (email: string) => void;
  onDeleteAccount: (email: string) => void;
  onEditClient: (email: string, clientId: string, data: any) => void;
  onAddClient: (email: string, data: any) => void;
  onDeleteClient: (email: string, clientId: string) => void;
  accountsByPlatform: Record<string, Account[]>;
}

export function AccountsContent({
  accounts,
  openPlatforms,
  onTogglePlatform,
  onEditAccount,
  onDeleteAccount,
  onEditClient,
  onAddClient,
  onDeleteClient,
  accountsByPlatform
}: AccountsContentProps) {
  return (
    <PlatformAccounts
      accountsByPlatform={accountsByPlatform}
      openPlatforms={openPlatforms}
      onTogglePlatform={onTogglePlatform}
      onEdit={onEditAccount}
      onDelete={onDeleteAccount}
      onEditClient={onEditClient}
      onAddClient={onAddClient}
      onDeleteClient={onDeleteClient}
    />
  );
}
