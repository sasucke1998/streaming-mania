import { Search, FileSpreadsheet } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface DashboardActionsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExportToExcel: () => void;
  onMarkAllUnpaid: () => void;
}

export function DashboardActions({ 
  searchQuery, 
  onSearchChange, 
  onExportToExcel,
  onMarkAllUnpaid 
}: DashboardActionsProps) {
  return (
    <>
      <Button
        variant="destructive"
        onClick={onMarkAllUnpaid}
        className="ml-auto"
      >
        Marcar Todo Como No Pagado
      </Button>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
        <Button
          variant="outline"
          onClick={onExportToExcel}
          className="flex items-center gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Exportar a Excel
        </Button>
      </div>
    </>
  );
}