import { Database } from "@/integrations/supabase/types";
import RoleSelect from '@/components/system/roles/RoleSelect';

type UserRole = Database['public']['Enums']['app_role'];

interface RoleAssignmentProps {
  userId: string;
  currentRoles: UserRole[];
  onRoleChange: (userId: string, role: UserRole, action: 'add' | 'remove') => Promise<void>;
}

export const RoleAssignment = ({ userId, currentRoles, onRoleChange }: RoleAssignmentProps) => {
  const handleRoleChange = async (role: UserRole, action: 'add' | 'remove') => {
    await onRoleChange(userId, role, action);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {['admin', 'collector', 'member'].map((role) => (
        <RoleSelect
          key={role}
          userId={userId}
          currentRole={role as UserRole}
          onRoleChange={(newRole) => handleRoleChange(newRole, currentRoles.includes(newRole as UserRole) ? 'remove' : 'add')}
        />
      ))}
    </div>
  );
};