import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CollectorRolesHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-dashboard-cardBorder hover:bg-dashboard-card/50">
        <TableHead className="text-dashboard-softGreen">Collector</TableHead>
        <TableHead className="text-dashboard-softGreen">Member #</TableHead>
        <TableHead className="text-dashboard-softGreen">Contact Info</TableHead>
        <TableHead className="text-dashboard-softGreen">Roles & Access</TableHead>
        <TableHead className="text-dashboard-softGreen">Role History</TableHead>
        <TableHead className="text-dashboard-softGreen">Enhanced Role Status</TableHead>
        <TableHead className="text-dashboard-softGreen">Role Store Status</TableHead>
        <TableHead className="text-dashboard-softGreen">Sync Status</TableHead>
        <TableHead className="text-dashboard-softGreen">Permissions</TableHead>
      </TableRow>
    </TableHeader>
  );
};