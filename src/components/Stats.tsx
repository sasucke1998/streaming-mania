import { Users, CheckCircle, AlertCircle, Package, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  totalClients: number;
  totalPayments: number;
  pendingPayments: number;
  totalInvested: number;
  totalProfit: number;
  totalCombos: number;
}

export function Stats({ 
  totalClients,
  totalPayments,
  pendingPayments,
  totalInvested,
  totalProfit,
  totalCombos
}: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Clientes</h3>
          <p className="text-3xl font-bold text-blue-500">{totalClients}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <DollarSign className="h-12 w-12 text-green-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Pagos</h3>
          <p className="text-3xl font-bold text-green-500">${totalPayments}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Pagos Pendientes</h3>
          <p className="text-3xl font-bold text-red-500">${pendingPayments}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <TrendingUp className="h-12 w-12 text-purple-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Invertido</h3>
          <p className="text-3xl font-bold text-purple-500">${totalInvested}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <DollarSign className="h-12 w-12 text-yellow-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Ganancias</h3>
          <p className="text-3xl font-bold text-yellow-500">${totalProfit}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Package className="h-12 w-12 text-indigo-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Combos</h3>
          <p className="text-3xl font-bold text-indigo-500">{totalCombos}</p>
        </CardContent>
      </Card>
    </div>
  );
}