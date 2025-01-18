import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/collector-roles";

interface RoleAssignmentProps {
  userId: string;
  currentRoles: UserRole[];
  onRoleChange: (userId: string, role: UserRole, action: 'add' | 'remove') => void;
}

export const RoleAssignment = ({ userId, currentRoles, onRoleChange }: RoleAssignmentProps) => {
  const availableRoles: UserRole[] = ['admin', 'collector', 'member'];

  const handleRoleClick = (role: UserRole) => {
    const isAssigned = currentRoles.includes(role);
    onRoleChange(userId, role, isAssigned ? 'remove' : 'add');
  };

  return (
    <div className="flex gap-2">
      {availableRoles.map((role) => (
        <Button
          key={role}
          variant={currentRoles.includes(role) ? 'default' : 'outline'}
          onClick={() => handleRoleClick(role)}
        >
          {role}
        </Button>
      ))}
    </div>
  );
};