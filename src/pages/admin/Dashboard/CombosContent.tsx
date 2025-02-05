
import { ComboManagement } from "@/components/ComboManagement";
import { Account } from "@/types/account";
import { PlatformCombo, ComboClient } from "@/types/combo";

interface CombosContentProps {
  accounts: Account[];
  combos: PlatformCombo[];
  comboClients: ComboClient[];
  onComboCreate: (combo: Omit<PlatformCombo, "id">) => string;
  onComboClientAdd: (client: Omit<ComboClient, "id" | "comboId">, comboId: string) => void;
  onComboUpdate: (comboId: string, updatedData: Partial<PlatformCombo>) => void;
  onClientUpdate: (clientId: string, updatedData: Partial<ComboClient>) => void;
  onComboDelete: (comboId: string) => void;
}

export function CombosContent({
  accounts,
  combos,
  comboClients,
  onComboCreate,
  onComboClientAdd,
  onComboUpdate,
  onClientUpdate,
  onComboDelete
}: CombosContentProps) {
  return (
    <ComboManagement 
      accounts={accounts}
      combos={combos}
      comboClients={comboClients}
      onComboCreate={onComboCreate}
      onComboClientAdd={onComboClientAdd}
      onComboUpdate={onComboUpdate}
      onClientUpdate={onClientUpdate}
      onComboDelete={onComboDelete}
    />
  );
}
