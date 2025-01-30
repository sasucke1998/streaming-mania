import { Monitor } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  activeView: "dashboard" | "accounts";
  setActiveView: (view: "dashboard" | "accounts") => void;
  onNewAccount: () => void;
}

export function Header({ activeView, setActiveView, onNewAccount }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Monitor className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-blue-500">Sistema de Streaming</h1>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={activeView === "dashboard" ? "default" : "outline"}
          className={activeView === "dashboard" ? "bg-blue-500 hover:bg-blue-600" : ""}
          onClick={() => setActiveView("dashboard")}
        >
          Dashboard
        </Button>
        <Button 
          variant={activeView === "accounts" ? "default" : "outline"}
          className={activeView === "accounts" ? "bg-blue-500 hover:bg-blue-600" : ""}
          onClick={() => setActiveView("accounts")}
        >
          Cuentas
        </Button>
        <Button 
          variant="outline"
          onClick={onNewAccount}
        >
          + Nueva Cuenta
        </Button>
      </div>
    </header>
  );
}