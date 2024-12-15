import { supabase } from "@/integrations/supabase/client";

export async function syncCollectorIds() {
  const { data, error } = await supabase.rpc('sync_collector_ids');
  if (error) {
    console.error('Error syncing collector IDs:', error);
    throw error;
  }
  return data;
}