import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/collector-roles";
import { RoleAssignment } from "./RoleAssignment";
import { SyncStatusIndicator } from "./SyncStatusIndicator";
import { CollectorInfo } from "@/types/collector-roles";

interface CollectorRolesRowProps {
  collector: CollectorInfo;
  onRoleChange: (userId: string, role: UserRole, action: 'add' | 'remove') => Promise<void>;
  onSync: (userId: string) => Promise<void>;
  permissions?: {
    canManageUsers: boolean;
    canCollectPayments: boolean;
    canAccessSystem: boolean;
    canViewAudit: boolean;
    canManageCollectors: boolean;
  };
}

export const CollectorRolesRow = ({
  collector,
  onRoleChange,
  onSync,
  permissions
}: CollectorRolesRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {collector.full_name || 'N/A'}
        {collector.member_number && (
          <Badge variant="outline" className="ml-2">
            {collector.member_number}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <RoleAssignment
          userId={collector.auth_user_id || ''}
          currentRoles={collector.roles}
          onRoleChange={onRoleChange}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => collector.auth_user_id && onSync(collector.auth_user_id)}
          disabled={!collector.auth_user_id}
        >
          <Shield className="h-4 w-4 mr-2" />
          Sync Roles
        </Button>
      </TableCell>
      <TableCell>
        <SyncStatusIndicator status={collector.sync_status} />
      </TableCell>
    </TableRow>
  );
};