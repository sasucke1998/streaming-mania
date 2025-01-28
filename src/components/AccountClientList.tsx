import React from "react";
import { User, Phone, Fingerprint } from "lucide-react";
import { Button } from "./ui/button";

interface AccountClient {
  id: string;
  name: string;
  pin: string;
  phone: string;
  isPaid: boolean;
}

interface AccountClientListProps {
  clients: AccountClient[];
}

export function AccountClientList({ clients }: AccountClientListProps) {
  return (
    <div className="space-y-2 mt-4">
      <h4 className="font-medium text-sm text-gray-500">Clientes ({clients.length}/5)</h4>
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
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Editar
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
    </div>
  );
}