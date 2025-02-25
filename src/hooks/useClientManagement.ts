
import { useState } from "react";
import { Account } from "@/types/account";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

export interface ExtendedClient {
  id: string;
  name: string;
  pin: string;
  phone: string;
  isPaid: boolean;
  amountDue: number;
  platform: string;
  visits?: number;
}

export const useClientManagement = (initialAccounts: Account[] = []) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const allClients: ExtendedClient[] = (accounts || []).flatMap(account => 
    account.clients.map(client => ({
      ...client,
      platform: account.platform
    }))
  );

  const filteredClients = allClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const handleTogglePaid = (clientId: string) => {
    setAccounts(prevAccounts => 
      (prevAccounts || []).map(account => ({
        ...account,
        clients: account.clients.map(client => 
          client.id === clientId
            ? { ...client, isPaid: !client.isPaid }
            : client
        )
      }))
    );

    toast({
      title: "Estado actualizado",
      description: "El estado de pago del cliente ha sido actualizado",
    });
  };

  const handleDeleteClient = (clientId: string) => {
    setAccounts(prevAccounts => 
      (prevAccounts || []).map(account => ({
        ...account,
        clients: account.clients.filter(client => client.id !== clientId)
      }))
    );
    
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado exitosamente",
    });
  };

  const handleExportToExcel = () => {
    const clientsData = allClients.map(client => ({
      Nombre: client.name,
      Plataforma: client.platform,
      PIN: client.pin,
      Teléfono: client.phone,
      Estado: client.isPaid ? 'Pagado' : 'No Pagado',
      'Monto Pendiente': client.amountDue
    }));

    const ws = XLSX.utils.json_to_sheet(clientsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "clientes.xlsx");

    toast({
      title: "Exportación exitosa",
      description: "Los datos han sido exportados a Excel",
    });
  };

  const markAllUnpaid = () => {
    setAccounts(prevAccounts => 
      (prevAccounts || []).map(account => ({
        ...account,
        clients: account.clients.map(client => ({
          ...client,
          isPaid: false
        }))
      }))
    );
    toast({
      title: "Actualización masiva",
      description: "Todas las cuentas han sido marcadas como no pagadas",
    });
  };

  return {
    accounts,
    setAccounts,
    searchQuery,
    setSearchQuery,
    filteredClients,
    handleTogglePaid,
    handleDeleteClient,
    handleExportToExcel,
    markAllUnpaid
  };
};
