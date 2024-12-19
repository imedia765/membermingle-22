import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useLoginHandlers = (setIsLoggedIn: (value: boolean) => void) => {
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error checking profile:', profileError);
        throw profileError;
      }

      // If no profile exists, create one with default role
      if (!profile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            role: 'member',
          });

        if (insertError) {
          console.error('Error creating profile:', insertError);
          throw insertError;
        }
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Email login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Google login attempt started");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + "/admin",
        },
      });

      console.log("Google login response:", { data, error });
      if (error) throw error;
      
      toast({
        title: "Redirecting to Google",
        description: "Please wait while we redirect you to Google sign-in...",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during Google login",
        variant: "destructive",
      });
    }
  };

  return {
    handleEmailSubmit,
    handleGoogleLogin,
  };
};