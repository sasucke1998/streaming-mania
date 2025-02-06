import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PlatformSelectionProps {
  availablePlatforms: {
    platform: string;
    cost: number;
    totalUsers: number;
    paidUsers: number;
  }[];
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

export function PlatformSelection({
  availablePlatforms,
  selectedPlatforms,
  onPlatformToggle,
}: PlatformSelectionProps) {
  const { toast } = useToast();

  const getAvailableSpots = (platform: string) => {
    const account = availablePlatforms.find(acc => acc.platform === platform);
    if (!account) return 0;
    return Math.max(0, 5 - account.paidUsers);
  };

  return (
    <div className="space-y-4">
      <Label>Plataformas Disponibles *</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {availablePlatforms.map((account) => {
          const availableSpots = getAvailableSpots(account.platform);
          const isSelected = selectedPlatforms.includes(account.platform);
          return (
            <div key={account.platform} className="relative">
              <Button
                type="button"
                variant={isSelected ? "default" : "outline"}
                onClick={() => onPlatformToggle(account.platform)}
                className={`w-full ${isSelected ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                disabled={availableSpots === 0 && !isSelected}
              >
                {account.platform}
                <Badge 
                  variant={availableSpots > 0 ? "default" : "destructive"}
                  className="absolute -top-2 -right-2"
                >
                  {availableSpots} disponible{availableSpots !== 1 ? 's' : ''}
                </Badge>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}