import React, { useState } from "react";
import { User, Phone, Fingerprint, Trash2, DollarSign, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { EditClientDialog } from "./EditClientDialog";

interface AccountClient {
  id: string;
  name: string;
  pin: string;
  phone: string;
  isPaid: boolean;
  amountDue: number;
}

interface AccountClientListProps {
  clients: AccountClient[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, data: Omit<AccountClient, "id" | "isPaid">) => void;
  onAdd?: (data: Omit<AccountClient, "id" | "isPaid">) => void;
}

export function AccountClientList({ clients, onDelete, onEdit, onAdd }: AccountClientListProps) {
  const { toast } = useToast();
  const [editingClient, setEditingClient] = useState<AccountClient | null>(null);
  const [isAddingClient, setIsAddingClient] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      onDelete?.(id);
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado exitosamente",
      });
    }
  };

  const handleEdit = (client: AccountClient) => {
    setEditingClient(client);
  };

  const handleEditSubmit = (data: Omit<AccountClient, "id" | "isPaid">) => {
    if (editingClient) {
      onEdit?.(editingClient.id, data);
      setEditingClient(null);
      toast({
        title: "Cliente actualizado",
        description: "Los datos del cliente han sido actualizados exitosamente",
      });
    }
  };

  const handleAddSubmit = (data: Omit<AccountClient, "id" | "isPaid">) => {
    onAdd?.(data);
    setIsAddingClient(false);
    toast({
      title: "Cliente agregado",
      description: "El nuevo cliente ha sido agregado exitosamente",
    });
  };

  return (
    <div className="space-y-2 mt-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm text-gray-500">Clientes ({clients.length}/5)</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingClient(true)}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Cliente
        </Button>
      </div>
      <div className="space-y-2">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{client.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  <span>PIN: {client.pin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Tel: {client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Debe: ${client.amountDue}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(client)}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(client.id)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {client.isPaid ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Pagado
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Pendiente
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <EditClientDialog
        open={editingClient !== null}
        onOpenChange={(open) => !open && setEditingClient(null)}
        onSubmit={handleEditSubmit}
        client={editingClient || undefined}
      />

      <EditClientDialog
        open={isAddingClient}
        onOpenChange={setIsAddingClient}
        onSubmit={handleAddSubmit}
      />
    </div>
  );
}