
import { useState } from "react";
import { PlatformCombo, ComboClient } from "@/types/combo";

export const useComboManagement = () => {
  const [combos, setCombos] = useState<PlatformCombo[]>([]);
  const [comboClients, setComboClients] = useState<ComboClient[]>([]);

  const handleCreateCombo = (comboData: Omit<PlatformCombo, "id">) => {
    const newComboId = Math.random().toString(36).substr(2, 9);
    const newCombo: PlatformCombo = {
      id: newComboId,
      ...comboData,
    };
    setCombos(prevCombos => [...prevCombos, newCombo]);
    return newComboId;
  };

  const handleAddComboClient = (clientData: Omit<ComboClient, "id">, comboId: string) => {
    const newClient: ComboClient = {
      id: Math.random().toString(36).substr(2, 9),
      comboId: comboId,
      ...clientData,
    };
    setComboClients(prevClients => [...prevClients, newClient]);
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

  return {
    combos,
    comboClients,
    handleCreateCombo,
    handleAddComboClient,
    handleUpdateCombo,
    handleUpdateComboClient,
    handleDeleteCombo
  };
};
