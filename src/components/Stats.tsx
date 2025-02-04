import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface StatsProps {
  totalClients: number;
  paidClients: number;
  unpaidClients: number;
  totalCombos: number;
}

export function Stats({ totalClients, paidClients, unpaidClients, totalCombos }: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Clientes</h3>
          <p className="text-3xl font-bold text-blue-500">{totalClients}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-green-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Clientes Pagos</h3>
          <p className="text-3xl font-bold text-green-500">{paidClients}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-red-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Clientes Pendientes</h3>
          <p className="text-3xl font-bold text-red-500">{unpaidClients}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-purple-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Combos</h3>
          <p className="text-3xl font-bold text-purple-500">{totalCombos}</p>
        </CardContent>
      </Card>
    </div>
  );
}