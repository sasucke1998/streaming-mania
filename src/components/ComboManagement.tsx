import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlatformCombo, ComboClient, ComboFormData } from "@/types/combo";
import { useToast } from "@/hooks/use-toast";
import { ComboForm } from "./ComboForm";
import { ComboManagementList } from "./ComboManagementList";

interface ComboManagementProps {
  accounts: {
    platform: string;
    cost: number;
    totalUsers: number;
    paidUsers: number;
  }[];
  combos: PlatformCombo[];
  comboClients: ComboClient[];
  onComboCreate: (combo: Omit<PlatformCombo, "id">) => void;
  onComboClientAdd: (client: Omit<ComboClient, "id" | "comboId">) => void;
  onComboUpdate: (comboId: string, updatedData: Partial<PlatformCombo>) => void;
  onClientUpdate: (clientId: string, updatedData: Partial<ComboClient>) => void;
  onComboDelete: (comboId: string) => void;
}

export function ComboManagement({ 
  accounts, 
  combos,
  comboClients,
  onComboCreate, 
  onComboClientAdd,
  onComboUpdate,
  onClientUpdate,
  onComboDelete
}: ComboManagementProps) {
  const { toast } = useToast();

  const handleComboSubmit = (formData: ComboFormData) => {
    const comboPrice = formData.selectedPlatforms.reduce((total, platform) => {
      const account = accounts.find(acc => acc.platform === platform);
      if (!account) return total;
      return total + (account.cost * 0.9); // 10% de descuento por plataforma
    }, 0);

    const comboName = `Combo ${formData.selectedPlatforms.join(" + ")}`;

    onComboCreate({
      name: comboName,
      platforms: formData.selectedPlatforms,
      cost: comboPrice,
    });

    onComboClientAdd({
      name: formData.clientName,
      phone: formData.clientPhone,
      pins: formData.pins,
      isPaid: false,
    });

    toast({
      title: "Combo creado",
      description: "El combo y el cliente han sido registrados exitosamente",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Combo de Plataformas</CardTitle>
          <CardDescription>
            Registra un nuevo cliente con múltiples plataformas y obtén un 10% de descuento por plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComboForm 
            availablePlatforms={accounts}
            onSubmit={handleComboSubmit}
          />
        </CardContent>
      </Card>

      <ComboManagementList
        combos={combos}
        comboClients={comboClients}
        onUpdateCombo={onComboUpdate}
        onUpdateClient={onClientUpdate}
        onDeleteCombo={onComboDelete}
      />
    </div>
  );
}