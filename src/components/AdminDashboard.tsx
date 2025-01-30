import { BarChart, DollarSign, Users, TrendingUp, Package, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminDashboardProps {
  totalClients: number;
  totalPayments: number;
  pendingPayments: number;
  totalInvested: number;
  totalProfit: number;
  totalCombos: number;
  recurringClients: Array<{
    name: string;
    phone: string;
    visits: number;
  }>;
}

export function AdminDashboard({
  totalClients,
  totalPayments,
  pendingPayments,
  totalInvested,
  totalProfit,
  totalCombos,
  recurringClients,
}: AdminDashboardProps) {
  const { logout } = useAdminAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/e49da8fa-c51a-430b-9185-41e5d0aaf946.png"
            alt="Streaming Mania"
            className="h-20 w-auto"
          />
          <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Clientes</p>
              <p className="text-2xl font-bold">{totalClients}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Pagos</p>
              <p className="text-2xl font-bold">${totalPayments}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pagos Pendientes</p>
              <p className="text-2xl font-bold">${pendingPayments}</p>
            </div>
            <BarChart className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Invertido</p>
              <p className="text-2xl font-bold">${totalInvested}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ganancias</p>
              <p className="text-2xl font-bold">${totalProfit}</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Combos</p>
              <p className="text-2xl font-bold">{totalCombos}</p>
            </div>
            <Package className="h-8 w-8 text-indigo-500" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Clientes Recurrentes</h2>
        <div className="rounded-lg border">
          <div className="grid grid-cols-3 gap-4 border-b bg-muted p-4 font-medium">
            <div>Nombre</div>
            <div>WhatsApp</div>
            <div>Visitas</div>
          </div>
          <div className="divide-y">
            {recurringClients.map((client, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  {client.name}
                </div>
                <div>
                  <a
                    href={`https://wa.me/${client.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {client.phone}
                  </a>
                </div>
                <div>{client.visits}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}