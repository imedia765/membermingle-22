import { Button } from "@/components/ui/button";
import { Edit, CreditCard, PhoneCall } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProfileActionsProps {
  userRole: string;
  onEditClick: () => void;
  onPaymentClick: () => void;
  collectorInfo?: {
    name?: string | null;
    phone?: string | null;
  };
}

const ProfileActions = ({ 
  userRole, 
  onEditClick, 
  onPaymentClick,
  collectorInfo 
}: ProfileActionsProps) => {
  return (
    <div className="space-y-4">
      {(userRole === 'collector' || userRole === 'admin' || userRole === 'member') && (
        <Button
          onClick={onEditClick}
          className="w-full bg-dashboard-accent2 hover:bg-dashboard-accent2/80 text-white transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      )}
      
      {userRole === 'member' && collectorInfo ? (
        <div className="space-y-2">
          <Alert className="bg-dashboard-accent1/10 border-dashboard-accent1/20">
            <AlertDescription className="text-dashboard-text">
              Please contact your collector to make a payment:
              <div className="mt-2 font-medium">
                {collectorInfo.name && <p>Collector: {collectorInfo.name}</p>}
                {collectorInfo.phone && <p>Phone: {collectorInfo.phone}</p>}
              </div>
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => {
              if (collectorInfo.phone) {
                window.location.href = `tel:${collectorInfo.phone}`;
              }
            }}
            className="w-full bg-dashboard-accent3 hover:bg-dashboard-accent3/80 text-white transition-colors"
            disabled={!collectorInfo.phone}
          >
            <PhoneCall className="w-4 h-4 mr-2" />
            Call Collector
          </Button>
        </div>
      ) : (
        userRole !== 'member' && (
          <Button
            onClick={onPaymentClick}
            className="w-full bg-dashboard-accent1 hover:bg-dashboard-accent1/80 text-white transition-colors"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Make Payment
          </Button>
        )
      )}
    </div>
  );
};

export default ProfileActions;