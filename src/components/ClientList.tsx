import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageCircle } from "lucide-react";

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
  onEdit: (id: string) => void;
  onTogglePaid: (id: string) => void;
}

export function ClientList({ clients, onEdit, onTogglePaid }: ClientListProps) {
  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="rounded-md border mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Plataforma</TableHead>
            <TableHead>PIN</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.platform}</TableCell>
              <TableCell>{client.pin}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell className="text-right space-x-2">
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
                  onClick={() => onTogglePaid(client.id)}
                  variant={client.isPaid ? "default" : "outline"}
                  size="sm"
                  className={client.isPaid ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {client.isPaid ? "Pagado" : "No Pagado"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}