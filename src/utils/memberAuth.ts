import { supabase } from "@/integrations/supabase/client";

export async function getMemberByMemberId(memberId: string) {
  const { data, error } = await supabase
    .from('members')
    .select('email, default_password_hash')
    .eq('member_number', memberId)
    .limit(1);

  if (error) throw error;
  if (!data || data.length === 0) return null;
  
  return data[0];
}

export async function verifyMemberPassword(password: string, storedHash: string) {
  const encoder = new TextEncoder();
  const passwordBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  const hashedPassword = Array.from(new Uint8Array(passwordBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
    
  return hashedPassword === storedHash;
}