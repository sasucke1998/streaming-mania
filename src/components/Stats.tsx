import { Users, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  activeClients: number;
  paidClients: number;
  unpaidClients: number;
}

export function Stats({ activeClients, paidClients, unpaidClients }: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Clientes Activos</h3>
          <p className="text-3xl font-bold text-blue-500">{activeClients}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Clientes Pagados</h3>
          <p className="text-3xl font-bold text-green-500">{paidClients}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Clientes Sin Pagar</h3>
          <p className="text-3xl font-bold text-red-500">{unpaidClients}</p>
        </CardContent>
      </Card>
    </div>
  );
}