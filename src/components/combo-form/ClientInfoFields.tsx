import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientInfoFieldsProps {
  clientName: string;
  clientPhone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export function ClientInfoFields({
  clientName,
  clientPhone,
  onNameChange,
  onPhoneChange,
}: ClientInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="clientName">Nombre del Cliente *</Label>
        <Input
          id="clientName"
          value={clientName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nombre completo"
          required
        />
      </div>
      <div>
        <Label htmlFor="clientPhone">Teléfono *</Label>
        <Input
          id="clientPhone"
          value={clientPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Número de teléfono"
          required
        />
      </div>
    </div>
  );
}