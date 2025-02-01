import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlatformCombo, ComboClient } from "@/types/combo";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ComboManagementProps {
  accounts: {
    platform: string;
    cost: number;
    totalUsers: number;
    paidUsers: number;
  }[];
  onComboCreate: (combo: Omit<PlatformCombo, "id">) => void;
  onComboClientAdd: (client: Omit<ComboClient, "id">) => void;
}

export function ComboManagement({ accounts, onComboCreate, onComboClientAdd }: ComboManagementProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const calculateComboPrice = () => {
    return accounts
      .filter(account => selectedPlatforms.includes(account.platform))
      .reduce((total, account) => total + account.cost, 0);
  };

  const getAvailableSpots = (platform: string) => {
    const account = accounts.find(acc => acc.platform === platform);
    if (!account) return 0;
    return Math.max(0, account.totalUsers - account.paidUsers);
  };

  const handleCreateCombo = () => {
    if (selectedPlatforms.length < 2) {
      toast({
        title: "Error",
        description: "Selecciona al menos 2 plataformas para crear un combo",
        variant: "destructive",
      });
      return;
    }

    const comboPrice = calculateComboPrice();
    const comboName = `Combo ${selectedPlatforms.join(" + ")}`;

    onComboCreate({
      name: comboName,
      platforms: selectedPlatforms,
      cost: comboPrice * 0.9, // 10% discount
    });

    toast({
      title: "Combo creado",
      description: "El combo ha sido creado exitosamente",
    });

    setSelectedPlatforms([]);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Crear Combo de Plataformas</CardTitle>
        <CardDescription>
          Selecciona las plataformas para crear un combo con 10% de descuento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {accounts.map((account) => {
            const availableSpots = getAvailableSpots(account.platform);
            return (
              <div key={account.platform} className="relative">
                <Button
                  variant={selectedPlatforms.includes(account.platform) ? "default" : "outline"}
                  onClick={() => handlePlatformToggle(account.platform)}
                  className="w-full"
                  disabled={availableSpots === 0}
                >
                  {account.platform}
                </Button>
                <Badge 
                  variant={availableSpots > 0 ? "default" : "destructive"}
                  className="absolute -top-2 -right-2"
                >
                  {availableSpots} disponible{availableSpots !== 1 ? 's' : ''}
                </Badge>
              </div>
            );
          })}
        </div>
        {selectedPlatforms.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Precio regular:</span>
              <span>${calculateComboPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-green-600 font-bold">
              <span>Precio con descuento:</span>
              <span>${(calculateComboPrice() * 0.9).toFixed(2)}</span>
            </div>
            <Button
              onClick={handleCreateCombo}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Crear Combo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}