import { Monitor } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  activeView: "dashboard" | "accounts" | "combos";
  setActiveView: (view: "dashboard" | "accounts" | "combos") => void;
  onNewAccount: () => void;
}

export function Header({ activeView, setActiveView, onNewAccount }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/admin" className="flex items-center gap-4">
          <img
            src="/lovable-uploads/e49da8fa-c51a-430b-9185-41e5d0aaf946.png"
            alt="Streaming Mania"
            className="h-16 w-auto cursor-pointer"
          />
          <h1 className="text-3xl font-bold text-blue-500">Sistema de Streaming</h1>
        </Link>
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
          variant={activeView === "combos" ? "default" : "outline"}
          className={activeView === "combos" ? "bg-blue-500 hover:bg-blue-600" : ""}
          onClick={() => setActiveView("combos")}
        >
          Combos
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