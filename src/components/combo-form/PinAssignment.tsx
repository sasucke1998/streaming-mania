import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PinAssignmentProps {
  selectedPlatforms: string[];
  pins: Record<string, string>;
  onPinChange: (platform: string, value: string) => void;
  manualPrice: number;
  onManualPriceChange: (value: number) => void;
}

export function PinAssignment({
  selectedPlatforms,
  pins,
  onPinChange,
  manualPrice,
  onManualPriceChange,
}: PinAssignmentProps) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium">PINs Asignados</h3>
      <div className="grid grid-cols-2 gap-4">
        {selectedPlatforms.map(platform => (
          <div key={platform}>
            <Label htmlFor={`pin-${platform}`}>{platform}</Label>
            <Input
              id={`pin-${platform}`}
              value={pins[platform] || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                onPinChange(platform, value);
              }}
              placeholder="PIN (4 dígitos)"
              required
              maxLength={4}
              pattern="\d{4}"
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div>
          <Label htmlFor="manualPrice">Precio Regular *</Label>
          <Input
            id="manualPrice"
            type="number"
            step="0.01"
            min="0"
            value={manualPrice || ''}
            onChange={(e) => onManualPriceChange(Number(e.target.value))}
            placeholder="Ingrese el precio"
            required
            className="mb-2"
          />
        </div>
        <div className="flex justify-between items-center text-green-600 font-bold">
          <span>Precio con descuento (10%):</span>
          <span>${(manualPrice * 0.9).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}