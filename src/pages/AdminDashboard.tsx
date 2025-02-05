
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

  // Mock data with more realistic values
  const mockAccounts = [
    {
      platform: "Netflix",
      cost: 15.99,
      totalUsers: 10,
      paidUsers: 8,
      clients: [
        { id: "1", name: "Juan Pérez", isPaid: true, visits: 12 },
        { id: "2", name: "María García", isPaid: true, visits: 8 },
        { id: "3", name: "Carlos López", isPaid: true, visits: 15 },
        { id: "4", name: "Ana Martínez", isPaid: false, visits: 5 }
      ]
    },
    {
      platform: "Disney+",
      cost: 12.99,
      totalUsers: 8,
      paidUsers: 6,
      clients: [
        { id: "5", name: "Pedro Sánchez", isPaid: true, visits: 10 },
        { id: "6", name: "Laura Torres", isPaid: true, visits: 7 }
      ]
    }
  ];

  const mockCombos = [
    { id: "1", name: "Combo Básico", platforms: ["Netflix", "Disney+"], cost: 25.99 },
    { id: "2", name: "Combo Premium", platforms: ["Netflix", "Disney+", "HBO"], cost: 35.99 }
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
          <Stats 
            {...stats}
            showFinancialStats={true}
          />
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
