import { UserRole } from "@/types/collector-roles";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface RoleAssignmentProps {
  userId: string;
  currentRoles: UserRole[];
  onRoleChange: (userId: string, role: UserRole, action: 'add' | 'remove') => Promise<void>;
}

const AVAILABLE_ROLES: UserRole[] = ['admin', 'collector', 'member'];

export const RoleAssignment = ({ userId, currentRoles, onRoleChange }: RoleAssignmentProps) => {
  const handleRoleToggle = async (role: UserRole) => {
    const hasRole = currentRoles.includes(role);
    await onRoleChange(userId, role, hasRole ? 'remove' : 'add');
  };

  return (
    <div className="flex flex-wrap gap-2">
      {currentRoles.map((role) => (
        <Badge key={role} variant="secondary" className="capitalize">
          {role}
        </Badge>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Manage Roles
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {AVAILABLE_ROLES.map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => handleRoleToggle(role)}
              className="capitalize"
            >
              {currentRoles.includes(role) ? `Remove ${role}` : `Add ${role}`}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};