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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
      <Button
        variant="destructive"
        onClick={onMarkAllUnpaid}
        className="w-full md:w-auto"
      >
        Marcar Todo Como No Pagado
      </Button>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Button
          variant="outline"
          onClick={onExportToExcel}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Exportar a Excel
        </Button>
      </div>
    </div>
  );
}