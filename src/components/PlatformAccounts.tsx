import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { AccountList } from "./AccountList";
import { Account } from "../types/account";

interface PlatformAccountsProps {
  accountsByPlatform: Record<string, Account[]>;
  openPlatforms: string[];
  onTogglePlatform: (platform: string) => void;
  onEdit: (email: string) => void;
  onDelete: (email: string) => void;
  onEditClient: (email: string, clientId: string, data: any) => void;
  onAddClient: (email: string, data: any) => void;
  onDeleteClient: (email: string, clientId: string) => void;
}

export function PlatformAccounts({
  accountsByPlatform,
  openPlatforms,
  onTogglePlatform,
  onEdit,
  onDelete,
  onEditClient,
  onAddClient,
  onDeleteClient
}: PlatformAccountsProps) {
  return (
    <div className="space-y-8">
      {Object.entries(accountsByPlatform).map(([platform, platformAccounts]) => (
        <Collapsible
          key={platform}
          open={openPlatforms.includes(platform)}
          onOpenChange={() => onTogglePlatform(platform)}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            <h2 className="text-xl font-bold">{platform}</h2>
            <ChevronDown className={`h-6 w-6 transform transition-transform ${
              openPlatforms.includes(platform) ? 'rotate-180' : ''
            }`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <AccountList 
              accounts={platformAccounts}
              onEdit={onEdit}
              onDelete={onDelete}
              onEditClient={onEditClient}
              onAddClient={onAddClient}
              onDeleteClient={onDeleteClient}
            />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}