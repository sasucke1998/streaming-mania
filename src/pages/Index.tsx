import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { ClientList } from "@/components/ClientList";
import { Monitor } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data - replace with real data later
const initialClients = [
  {
    id: "1",
    name: "Kiko",
    platform: "Netflix",
    pin: "5456",
    phone: "58860558",
    isPaid: true,
  },
  {
    id: "2",
    name: "Juan Jose",
    platform: "Disney+",
    pin: "5659",
    phone: "+18097532939",
    isPaid: true,
  },
];

const Index = () => {
  const [clients, setClients] = useState(initialClients);
  const { toast } = useToast();

  const stats = {
    activeClients: clients.length,
    paidClients: clients.filter(client => client.isPaid).length,
    unpaidClients: clients.filter(client => !client.isPaid).length,
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Editar cliente",
      description: "Funcionalidad de edición en desarrollo",
    });
  };

  const handleTogglePaid = (id: string) => {
    setClients(clients.map(client => 
      client.id === id 
        ? { ...client, isPaid: !client.isPaid }
        : client
    ));
  };

  const handleMarkAllUnpaid = () => {
    setClients(clients.map(client => ({ ...client, isPaid: false })));
    toast({
      title: "Actualizado",
      description: "Todos los clientes han sido marcados como no pagados",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Monitor className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-blue-500">Sistema de Streaming</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            Dashboard
          </Button>
          <Button variant="outline">Cuentas</Button>
          <Button variant="outline">+ Nueva Cuenta</Button>
          <Button 
            variant="outline" 
            onClick={handleMarkAllUnpaid}
            className="ml-auto"
          >
            Marcar Todo Como No Pagado
          </Button>
        </div>
      </header>

      <Stats {...stats} />
      <ClientList 
        clients={clients}
        onEdit={handleEdit}
        onTogglePaid={handleTogglePaid}
      />
    </div>
  );
};

export default Index;