import { supabase } from "@/integrations/supabase/client";

export async function getMemberByMemberId(memberId: string) {
  console.log("Searching for member with member_number:", memberId);
  
  // First, let's log the actual query we're about to make
  const query = supabase
    .from('members')
    .select('*')
    .eq('member_number', memberId);
  
  console.log("Query:", query.toSQL());
  
  const { data, error } = await query;

  if (error) {
    console.error("Database error when looking up member:", error);
    throw error;
  }

  console.log("Full database query result:", { data });
  
  if (!data || data.length === 0) {
    // Let's do a broader search to help debug
    const { data: allMembers } = await supabase
      .from('members')
      .select('member_number')
      .limit(5);
    console.log("Sample of existing member numbers:", allMembers);
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

  console.log("Verifying password hash...");
  const encoder = new TextEncoder();
  const passwordBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  const hashedPassword = Array.from(new Uint8Array(passwordBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  console.log("Generated hash:", hashedPassword);
  console.log("Stored hash:", storedHash);
  
  const matches = hashedPassword === storedHash;
  console.log("Password verification result:", { matches });
  
  return matches;
}