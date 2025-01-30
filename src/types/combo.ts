export interface PlatformCombo {
  id: string;
  name: string;
  platforms: string[];
  cost: number;
}

export interface ComboClient {
  id: string;
  name: string;
  comboId: string;
  isPaid: boolean;
}