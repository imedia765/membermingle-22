import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { CollectorRolesHeader } from './collectors/roles/CollectorRolesHeader';
import { CollectorRolesRow } from './collectors/roles/CollectorRolesRow';

type AppRole = Database['public']['Enums']['app_role'];

const CollectorRolesList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: collectors, isLoading, error, refetch } = useQuery({
    queryKey: ['collectors-roles'],
    queryFn: async () => {
      try {
        console.log('Fetching collectors data...');
        const { data, error } = await supabase
          .from('members_collectors')
          .select('*, user_roles!left(*)')
          .eq('active', true);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Collectors data fetched:', data);
        return data;
      } catch (err) {
        console.error('Error in collectors query:', err);
        throw err;
      }
    },
    retry: 3,
    retryDelay: 1000
  });

  const handleRoleChange = async (userId: string, role: AppRole) => {
    try {
      console.log('Updating role for user:', userId, 'to:', role);
      
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw deleteError;
      }

      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{ 
          user_id: userId, 
          role: role 
        }]);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collectors-roles'] }),
        queryClient.invalidateQueries({ queryKey: ['user-roles'] })
      ]);

      toast({
        title: "Role Updated",
        description: `User role has been updated to ${role}`,
      });
    } catch (error) {
      console.error('Role change error:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-dashboard-error">
        <AlertCircle className="w-4 h-4 mr-2" />
        <span>Error loading collectors</span>
        <button 
          onClick={() => refetch()} 
          className="ml-4 text-dashboard-accent1 hover:text-dashboard-accent2"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-dashboard-accent1" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-dashboard-dark to-dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-dashboard-accent1 to-dashboard-accent2 bg-clip-text text-transparent">
          Active Collectors and Roles
        </h2>
        <Badge variant="outline" className="text-dashboard-accent1 border-dashboard-accent1">
          {collectors?.length || 0} Collectors
        </Badge>
      </div>

      <Card className="p-6 bg-dashboard-card border-dashboard-cardBorder hover:border-dashboard-cardBorderHover transition-all duration-300">
        <Table>
          <CollectorRolesHeader />
          <TableBody>
            {collectors?.map(collector => (
              <CollectorRolesRow
                key={collector.id}
                collector={collector}
                onRoleChange={handleRoleChange}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CollectorRolesList;