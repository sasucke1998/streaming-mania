import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlatformCombo, ComboClient } from "@/types/combo";

interface ComboManagementListProps {
  combos: PlatformCombo[];
  comboClients: ComboClient[];
  onUpdateCombo: (comboId: string, updatedData: Partial<PlatformCombo>) => void;
  onUpdateClient: (clientId: string, updatedData: Partial<ComboClient>) => void;
  onDeleteCombo: (comboId: string) => void;
}

export function ComboManagementList({
  combos,
  comboClients,
  onUpdateCombo,
  onUpdateClient,
  onDeleteCombo,
}: ComboManagementListProps) {
  const [editingComboId, setEditingComboId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<PlatformCombo>>({});
  const { toast } = useToast();

  const handleEdit = (combo: PlatformCombo) => {
    setEditingComboId(combo.id);
    setEditedData(combo);
  };

  const handleSave = (comboId: string) => {
    if (!editedData.name || !editedData.cost) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    onUpdateCombo(comboId, editedData);
    setEditingComboId(null);
    setEditedData({});
    
    toast({
      title: "Éxito",
      description: "Combo actualizado correctamente",
    });
  };

  const getClientForCombo = (comboId: string) => {
    return comboClients.find(client => client.comboId === comboId);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Combos Creados</h2>
      {combos.map(combo => {
        const client = getClientForCombo(combo.id);
        const isEditing = editingComboId === combo.id;

        return (
          <Card key={combo.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl">
                {isEditing ? (
                  <Input
                    value={editedData.name || ""}
                    onChange={(e) => setEditedData(prev => ({ ...prev, name: e.target.value }))}
                    className="max-w-sm"
                  />
                ) : (
                  combo.name
                )}
              </CardTitle>
              <div className="space-x-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(combo.id)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingComboId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(combo)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium">Plataformas:</span>
                  <div className="flex flex-wrap gap-2">
                    {combo.platforms.map(platform => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                {client && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Cliente:</span>
                      <span>{client.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Teléfono:</span>
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Estado:</span>
                      <Badge variant={client.isPaid ? "secondary" : "destructive"}>
                        {client.isPaid ? "Pagado" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-medium">Precio Total:</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedData.cost || ""}
                      onChange={(e) => setEditedData(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                      className="max-w-[120px]"
                    />
                  ) : (
                    <span className="font-bold text-green-600">
                      ${combo.cost.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}