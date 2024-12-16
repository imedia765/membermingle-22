import { supabase } from "@/integrations/supabase/client";

export async function getMemberByMemberId(memberId: string) {
  console.log("Searching for member with member_number:", memberId);
  
  // First, let's get a sample of existing members to verify data
  const { data: sampleMembers } = await supabase
    .from('members')
    .select('member_number, full_name')
    .limit(5);
    
  console.log("Sample of members in database:", sampleMembers);
  
  // Now try to find the specific member
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('member_number', memberId.trim())
    .maybeSingle();

  if (error) {
    console.error("Database error when looking up member:", error);
    throw error;
  }

  console.log("Member lookup result:", { data });
  
  if (!data) {
    console.log("No member found with member_number:", memberId);
    // Log a few existing member numbers to help debug
    const { data: allMembers } = await supabase
      .from('members')
      .select('member_number')
      .limit(5);
    console.log("Sample of existing member numbers:", allMembers);
    return null;
  }
  
  return data;
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
  
  console.log("Password verification:", {
    providedPasswordLength: password.length,
    generatedHashLength: hashedPassword.length,
    storedHashLength: storedHash.length,
    matches: hashedPassword === storedHash
  });
  
  return hashedPassword === storedHash;
}