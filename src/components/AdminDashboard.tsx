import { DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminDashboardProps {
  totalPayments: number;
  pendingPayments: number;
  totalInvested: number;
  totalProfit: number;
}

export function AdminDashboard({ 
  totalPayments,
  pendingPayments,
  totalInvested,
  totalProfit
}: AdminDashboardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <DollarSign className="h-12 w-12 text-green-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">Total Pagos</h3>
          <p className="text-3xl font-bold text-green-500">${totalPayments}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <DollarSign className="h-12 w-12 text-red-500 mb-2" />
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
    </div>
  );
}