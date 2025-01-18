import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Shield, RefreshCw } from "lucide-react";
import { format } from 'date-fns';
import { RoleAssignment } from './RoleAssignment';
import { PermissionsDisplay } from './PermissionsDisplay';
import { CollectorInfo, UserRole } from "@/types/collector-roles";

interface CollectorRolesRowProps {
  collector: CollectorInfo;
  onRoleChange: (userId: string, role: UserRole, action: 'add' | 'remove') => Promise<void>;
  onSync: (userId: string) => Promise<void>;
  permissions: Record<string, boolean>;
}

const getStatusBadgeColor = (status: string | undefined) => {
  if (!status) return 'bg-dashboard-muted text-white';
  
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-dashboard-success text-white';
    case 'pending':
      return 'bg-dashboard-warning text-black';
    case 'error':
      return 'bg-dashboard-error text-white';
    default:
      return 'bg-dashboard-muted text-white';
  }
};

export const CollectorRolesRow = ({ 
  collector, 
  onRoleChange, 
  onSync,
  permissions 
}: CollectorRolesRowProps) => {
  return (
    <TableRow className="border-dashboard-cardBorder hover:bg-dashboard-cardHover">
      <TableCell className="font-medium text-dashboard-accent1">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-dashboard-accent1" />
          {collector.full_name}
        </div>
      </TableCell>
      <TableCell className="text-dashboard-accent2">
        <div className="flex flex-col">
          <span>{collector.member_number}</span>
          <span className="text-sm text-dashboard-accent1">{collector.prefix}-{collector.number}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col text-dashboard-text">
          <span>{collector.email}</span>
          <span>{collector.phone}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-2">
          <div className="space-y-1">
            {collector.roles.map((role, idx) => (
              <Badge
                key={idx}
                className={`mr-1 ${role === 'admin' ? 'bg-dashboard-accent1' :
                  role === 'collector' ? 'bg-dashboard-accent2' :
                    'bg-dashboard-accent3'} text-white`}
              >
                {role}
              </Badge>
            ))}
          </div>
          <RoleAssignment
            userId={collector.auth_user_id}
            currentRoles={collector.roles}
            onRoleChange={onRoleChange}
          />
        </div>
      </TableCell>
      <TableCell className="text-dashboard-text">
        <div className="flex flex-col gap-1">
          {collector.role_details.map((detail, idx) => (
            <div key={idx} className="text-sm flex items-center gap-2">
              <Shield className="h-3 w-3 text-dashboard-accent2" />
              <span className="text-dashboard-accent1">{detail.role}:</span>
              <span>{format(new Date(detail.created_at), 'PPp')}</span>
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          {collector.enhanced_roles.map((role, idx) => (
            <Badge
              key={idx}
              className={role.is_active ? 'bg-dashboard-success text-white' : 'bg-dashboard-muted text-white'}
            >
              {role.role_name}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <Badge className={getStatusBadgeColor(collector.sync_status?.store_status)}>
          {collector.sync_status?.store_status || 'N/A'}
        </Badge>
        {collector.sync_status?.store_error && (
          <div className="text-sm text-dashboard-error mt-1">
            {collector.sync_status.store_error}
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Badge className={getStatusBadgeColor(collector.sync_status?.status)}>
            {collector.sync_status?.status || 'pending'}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSync(collector.auth_user_id)}
            className="ml-2 hover:bg-dashboard-cardHover"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <PermissionsDisplay permissions={permissions} />
      </TableCell>
    </TableRow>
  );
};