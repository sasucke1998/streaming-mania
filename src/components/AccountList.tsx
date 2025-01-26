import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Key, Trash2, ChevronDown } from "lucide-react";
import { AccountClientList } from "./AccountClientList";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface Account {
  platform: string;
  email: string;
  password: string;
  paidUsers: number;
  totalUsers: number;
  clients: {
    id: string;
    name: string;
    pin: string;
    phone: string;
    isPaid: boolean;
  }[];
}

interface AccountListProps {
  accounts: Account[];
  onEdit: (email: string) => void;
  onDelete: (email: string) => void;
}

export function AccountList({ accounts, onEdit, onDelete }: AccountListProps) {
  const { toast } = useToast();
  const [openAccounts, setOpenAccounts] = useState<string[]>([]);

  const handleDelete = (email: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cuenta y todos sus clientes asociados?")) {
      onDelete(email);
      toast({
        title: "Cuenta eliminada",
        description: "La cuenta y sus clientes han sido eliminados exitosamente",
      });
    }
  };

  const toggleAccount = (email: string) => {
    setOpenAccounts(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <Card key={account.email} className="relative">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{account.platform}</CardTitle>
                <CardDescription>{account.email}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(account.email)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(account.email)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>Email: {account.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Key className="h-4 w-4 text-gray-500" />
                  <span>Contraseña: {account.password}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{account.paidUsers}/{account.totalUsers} Pagados</span>
              </div>
              <Collapsible open={openAccounts.includes(account.email)}>
                <CollapsibleTrigger 
                  asChild
                  onClick={() => toggleAccount(account.email)}
                >
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Ver Clientes</span>
                    <ChevronDown className={`h-4 w-4 transform transition-transform ${
                      openAccounts.includes(account.email) ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <AccountClientList clients={account.clients} />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}