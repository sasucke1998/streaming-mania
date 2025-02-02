export interface PlatformCombo {
  id: string;
  name: string;
  platforms: string[];
  cost: number;
}

export interface ComboClient {
  id: string;
  name: string;
  phone: string;
  pins: Record<string, string>; // platform -> pin
  comboId: string;
  isPaid: boolean;
}

export interface ComboFormData {
  clientName: string;
  clientPhone: string;
  selectedPlatforms: string[];
  pins: Record<string, string>;
  manualPrice: number;
}