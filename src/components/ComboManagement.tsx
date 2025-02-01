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

interface ComboManagementProps {
  accounts: {
    platform: string;
    cost: number;
    totalUsers: number;
    paidUsers: number;
  }[];
  onComboCreate: (combo: Omit<PlatformCombo, "id">) => void;
  onComboClientAdd: (client: Omit<ComboClient, "id" | "comboId">) => void;
}

export function ComboManagement({ accounts, onComboCreate, onComboClientAdd }: ComboManagementProps) {
  const { toast } = useToast();

  const handleComboSubmit = (formData: ComboFormData) => {
    const comboPrice = accounts
      .filter(account => formData.selectedPlatforms.includes(account.platform))
      .reduce((total, account) => total + account.cost, 0) * 0.9; // 10% discount

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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Crear Combo de Plataformas</CardTitle>
        <CardDescription>
          Registra un nuevo cliente con múltiples plataformas y obtén un 10% de descuento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComboForm 
          availablePlatforms={accounts}
          onSubmit={handleComboSubmit}
        />
      </CardContent>
    </Card>
  );
}