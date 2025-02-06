import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ComboFormData } from "@/types/combo";
import { ClientInfoFields } from "./combo-form/ClientInfoFields";
import { PlatformSelection } from "./combo-form/PlatformSelection";
import { PinAssignment } from "./combo-form/PinAssignment";

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
  const [manualPrice, setManualPrice] = useState<number>(0);
  const { toast } = useToast();

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(prev => prev.filter(p => p !== platform));
      setPins(prev => {
        const newPins = { ...prev };
        delete newPins[platform];
        return newPins;
      });
    } else {
      setSelectedPlatforms(prev => [...prev, platform]);
      setPins(prev => ({
        ...prev,
        [platform]: Math.floor(1000 + Math.random() * 9000).toString()
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientPhone || selectedPlatforms.length === 0 || manualPrice <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos, incluyendo el precio",
        variant: "destructive",
      });
      return;
    }

    const allPinsSet = selectedPlatforms.every(platform => pins[platform]?.length === 4);
    if (!allPinsSet) {
      toast({
        title: "Error",
        description: "Todos los PINs deben tener 4 dígitos",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      clientName,
      clientPhone,
      selectedPlatforms,
      pins,
      manualPrice,
    });

    setClientName("");
    setClientPhone("");
    setSelectedPlatforms([]);
    setPins({});
    setManualPrice(0);

    toast({
      title: "¡Éxito!",
      description: "El combo ha sido creado correctamente",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ClientInfoFields
        clientName={clientName}
        clientPhone={clientPhone}
        onNameChange={setClientName}
        onPhoneChange={setClientPhone}
      />

      <PlatformSelection
        availablePlatforms={availablePlatforms}
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={handlePlatformToggle}
      />

      {selectedPlatforms.length > 0 && (
        <PinAssignment
          selectedPlatforms={selectedPlatforms}
          pins={pins}
          onPinChange={(platform, value) => setPins(prev => ({ ...prev, [platform]: value }))}
          manualPrice={manualPrice}
          onManualPriceChange={setManualPrice}
        />
      )}

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={selectedPlatforms.length === 0 || manualPrice <= 0}
      >
        Crear Combo ({selectedPlatforms.length} plataforma{selectedPlatforms.length !== 1 ? 's' : ''})
      </Button>
    </form>
  );
}