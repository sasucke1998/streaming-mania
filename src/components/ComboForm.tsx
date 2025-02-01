import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ComboFormData } from "@/types/combo";
import { useToast } from "@/hooks/use-toast";

interface ComboFormProps {
  availablePlatforms: {
    platform: string;
    cost: number;
    totalUsers: number;
    paidUsers: number;
  }[];
  onSubmit: (data: ComboFormData) => void;
}

export function ComboForm({ availablePlatforms, onSubmit }: ComboFormProps) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [pins, setPins] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );

    if (!pins[platform]) {
      setPins(prev => ({
        ...prev,
        [platform]: Math.floor(1000 + Math.random() * 9000).toString()
      }));
    }
  };

  const getAvailableSpots = (platform: string) => {
    const account = availablePlatforms.find(acc => acc.platform === platform);
    if (!account) return 0;
    return Math.max(0, account.totalUsers - account.paidUsers);
  };

  const calculateTotalCost = () => {
    return availablePlatforms
      .filter(acc => selectedPlatforms.includes(acc.platform))
      .reduce((total, acc) => total + acc.cost, 0) * 0.9; // 10% discount
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientPhone || selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      clientName,
      clientPhone,
      selectedPlatforms,
      pins,
    });

    // Reset form
    setClientName("");
    setClientPhone("");
    setSelectedPlatforms([]);
    setPins({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="clientName">Nombre del Cliente</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <Label htmlFor="clientPhone">Teléfono</Label>
          <Input
            id="clientPhone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="Número de teléfono"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Plataformas Disponibles</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {availablePlatforms.map((account) => {
            const availableSpots = getAvailableSpots(account.platform);
            return (
              <div key={account.platform} className="relative">
                <Button
                  type="button"
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
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium">PINs Asignados</h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedPlatforms.map(platform => (
              <div key={platform}>
                <Label htmlFor={`pin-${platform}`}>{platform}</Label>
                <Input
                  id={`pin-${platform}`}
                  value={pins[platform] || ""}
                  onChange={(e) => setPins(prev => ({
                    ...prev,
                    [platform]: e.target.value
                  }))}
                  placeholder="PIN"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span>Precio regular:</span>
              <span>${(calculateTotalCost() / 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-green-600 font-bold">
              <span>Precio con descuento:</span>
              <span>${calculateTotalCost().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={selectedPlatforms.length === 0}
      >
        Crear Combo
      </Button>
    </form>
  );
}