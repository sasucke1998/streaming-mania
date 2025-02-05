
import { Card, CardContent } from "@/components/ui/card";
import { Users, CreditCard, DollarSign, Wallet, TrendingUp, Activity } from "lucide-react";

interface StatsProps {
  totalClients: number;
  paidClients: number;
  unpaidClients: number;
  totalCombos: number;
  totalInvestment?: number;
  totalRevenue?: number;
  monthlyRevenue?: number;
  averageClientValue?: number;
  showFinancialStats?: boolean;
}

export function Stats({ 
  totalClients, 
  paidClients, 
  unpaidClients, 
  totalCombos,
  totalInvestment = 0,
  totalRevenue = 0,
  monthlyRevenue = 0,
  averageClientValue = 0,
  showFinancialStats = false
}: StatsProps) {
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
          <CreditCard className="h-12 w-12 text-indigo-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Combos</h3>
          <p className="text-3xl font-bold text-indigo-500">{totalCombos}</p>
        </CardContent>
      </Card>

      {showFinancialStats && (
        <>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <DollarSign className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-600">Ingresos Totales</h3>
              <p className="text-3xl font-bold text-green-500">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Mensual: ${monthlyRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Wallet className="h-12 w-12 text-purple-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-600">Inversión Total</h3>
              <p className="text-3xl font-bold text-purple-500">${totalInvestment.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <TrendingUp className="h-12 w-12 text-orange-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-600">Valor por Cliente</h3>
              <p className="text-3xl font-bold text-orange-500">${averageClientValue.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Activity className="h-12 w-12 text-yellow-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-600">Tasa de Pago</h3>
              <p className="text-3xl font-bold text-yellow-500">
                {totalClients > 0 ? ((paidClients / totalClients) * 100).toFixed(1) : 0}%
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
