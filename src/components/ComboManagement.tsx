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
  onComboCreate: (combo: Omit<PlatformCombo, "id">) => string;
  onComboClientAdd: (client: Omit<ComboClient, "id" | "comboId">, comboId: string) => void;
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
    // Calculate total price based on the individual platform costs
    const comboPrice = formData.selectedPlatforms.reduce((total, platform) => {
      const account = accounts.find(acc => acc.platform === platform);
      if (!account) return total;
      
      // Apply 10% discount to each platform's cost individually
      const platformCost = account.cost;
      const discountedCost = platformCost * 0.9;
      
      return total + discountedCost;
    }, 0);

    const comboName = `Combo ${formData.selectedPlatforms.join(" + ")}`;

    const newComboId = onComboCreate({
      name: comboName,
      platforms: formData.selectedPlatforms,
      cost: comboPrice,
    });

    onComboClientAdd({
      name: formData.clientName,
      phone: formData.clientPhone,
      pins: formData.pins,
      isPaid: false,
    }, newComboId);

    toast({
      title: "Combo created",
      description: "The combo and client have been successfully registered",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Platform Combo</CardTitle>
          <CardDescription>
            Register a new client with multiple platforms and get a 10% discount per platform
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