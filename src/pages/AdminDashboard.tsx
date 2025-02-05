import { Stats } from "@/components/Stats";
import { DashboardActions } from "@/components/DashboardActions";
import { PlatformAccounts } from "@/components/PlatformAccounts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ComboManagement } from "@/components/ComboManagement";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "accounts" | "combos">("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [openPlatforms, setOpenPlatforms] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useAdminAuth();

  // Temporary mock data - replace with real data later
  const mockAccounts = [
    {
      platform: "Netflix",
      cost: 15.99,
      totalUsers: 2,  // Added missing property
      paidUsers: 1,   // Added missing property
      clients: [
        { id: "1", name: "Juan Pérez", isPaid: true, visits: 12 },
        { id: "2", name: "María García", isPaid: false, visits: 8 }
      ]
    }
  ];

  const mockCombos = [
    { id: "1", name: "Combo Básico", platforms: ["Netflix", "Disney+"], cost: 25.99 }
  ];

  const stats = useDashboardStats(mockAccounts, mockCombos);

  if (!isAdminLoggedIn) {
    navigate("/admin");
    return null;
  }

  const handleNewAccount = () => {
    // Implement new account functionality
  };

  const handleTogglePlatform = (platform: string) => {
    setOpenPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleExportToExcel = () => {
    // Implement export functionality
  };

  const handleMarkAllUnpaid = () => {
    // Implement mark all unpaid functionality
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onNewAccount={handleNewAccount}
      />

      {activeView === "dashboard" && (
        <div className="space-y-6">
          <Stats {...stats} />
          <DashboardActions
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onExportToExcel={handleExportToExcel}
            onMarkAllUnpaid={handleMarkAllUnpaid}
          />
        </div>
      )}

      {activeView === "accounts" && (
        <PlatformAccounts
          accountsByPlatform={mockAccounts.reduce((acc, account) => ({
            ...acc,
            [account.platform]: [account]
          }), {})}
          openPlatforms={openPlatforms}
          onTogglePlatform={handleTogglePlatform}
          onEdit={() => {}}
          onDelete={() => {}}
          onEditClient={() => {}}
          onAddClient={() => {}}
          onDeleteClient={() => {}}
        />
      )}

      {activeView === "combos" && (
        <ComboManagement 
          accounts={mockAccounts}
          combos={mockCombos}
          comboClients={[]}
          onComboCreate={() => ""}
          onComboClientAdd={() => {}}
          onComboUpdate={() => {}}
          onClientUpdate={() => {}}
          onComboDelete={() => {}}
        />
      )}
    </div>
  );
}