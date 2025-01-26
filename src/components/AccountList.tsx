import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Clock } from "lucide-react";

interface Account {
  platform: string;
  email: string;
  paidUsers: number;
  totalUsers: number;
}

interface AccountListProps {
  accounts: Account[];
  onEdit: (email: string) => void;
}

export function AccountList({ accounts, onEdit }: AccountListProps) {
  return (
    <div className="space-y-6">
      {/* Header con botones de filtro */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="destructive" className="flex items-center gap-2">
            <span className="hidden sm:inline">Clientes</span> No Pagados
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Cuentas</span> Incompletas
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Buscar por correo o teléfono..."
        />
      </div>

      {/* Filtros de plataforma */}
      <div className="flex flex-wrap gap-2">
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
          Todas
        </Button>
        <Button variant="outline">Netflix</Button>
        <Button variant="outline">Disney+</Button>
        <Button variant="outline">HBO Max</Button>
        <Button variant="outline">Prime</Button>
        <Button variant="outline">Star+</Button>
      </div>

      {/* Lista de cuentas */}
      <div className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.email}
            className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
          >
            <div className="space-y-1">
              <h3 className="font-semibold">{account.platform}</h3>
              <p className="text-gray-600">{account.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                  {account.paidUsers}/{account.totalUsers} Pagados
                </span>
              </div>
              <Button
                variant="outline"
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => onEdit(account.email)}
              >
                Editar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}