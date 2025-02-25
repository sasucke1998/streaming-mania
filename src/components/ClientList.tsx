
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Client {
  id: string;
  name: string;
  platform: string;
  pin: string;
  phone: string;
  isPaid: boolean;
}

interface ClientListProps {
  clients: Client[];
  onTogglePaid: (id: string) => void;
  onDeleteClient?: (id: string) => void;
}

export function ClientList({ clients, onTogglePaid, onDeleteClient }: ClientListProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div key={client.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">{client.name}</h4>
              <p className="text-sm text-gray-600">
                Plataforma: {client.platform} | PIN: {client.pin} | Tel: {client.phone}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => openWhatsApp(client.phone)}
                variant="outline"
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Editar
              </Button>
              <Button
                onClick={() => onTogglePaid(client.id)}
                variant={client.isPaid ? "default" : "outline"}
                size="sm"
                className={client.isPaid ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {client.isPaid ? "Pagado" : "No Pagado"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
