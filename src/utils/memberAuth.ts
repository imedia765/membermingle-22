import { supabase } from "@/integrations/supabase/client";

export async function getMemberByMemberId(memberId: string) {
  console.log("Searching for member with member_number:", memberId);
  
  const { data, error } = await supabase
    .from('members')
    .select('email, default_password_hash')
    .eq('member_number', memberId)
    .limit(1);

  if (error) {
    console.error("Database error when looking up member:", error);
    throw error;
  }

  console.log("Database query result:", { data });
  
  if (!data || data.length === 0) {
    console.log("No member found with member_number:", memberId);
    return null;
  }
  
  return data[0];
}

export async function verifyMemberPassword(password: string, storedHash: string | null) {
  if (!storedHash) {
    console.error("No stored hash provided for password verification");
    return false;
  }

  const encoder = new TextEncoder();
  const passwordBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  const hashedPassword = Array.from(new Uint8Array(passwordBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
    
  const matches = hashedPassword === storedHash;
  console.log("Password verification result:", { matches });
  
  return matches;
}