import React from "react";
import { User } from "lucide-react";

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
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-gray-500">PIN: {client.pin} | Tel: {client.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  client.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {client.isPaid ? "Pagado" : "Pendiente"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}