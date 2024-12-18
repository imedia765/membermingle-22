import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, ClipboardList, Database, DollarSign, UserCircle, ChevronDown, HeadsetIcon, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Users, label: "Members", to: "/admin/members" },
  { icon: UserCheck, label: "Collectors", to: "/admin/collectors" },
  { icon: ClipboardList, label: "Registrations", to: "/admin/registrations" },
  { icon: Database, label: "Database", to: "/admin/database" },
  { icon: DollarSign, label: "Finance", to: "/admin/finance" },
  { icon: HeadsetIcon, label: "Support Tickets", to: "/admin/support" },
  { icon: UserCircle, label: "Profile", to: "/admin/profile" },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error('Session check error:', error);
        toast({
          title: "Authentication Error",
          description: "Please try logging in again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      if (!session) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Invalidate and refetch all queries
      await queryClient.invalidateQueries();
      toast({
        title: "Refreshed",
        description: "Data has been updated",
      });
    } catch (error) {
      console.error('Refresh error:', error);
      toast({
        title: "Refresh Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    // Prevent navigation to the same route
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <RefreshCw className="h-8 w-8 text-primary" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-2 flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="w-[200px] justify-between h-12"
              >
                <span className="font-semibold">Menu</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-[calc(1400px-4rem)]">
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  className="flex items-center gap-3 cursor-pointer py-3 px-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 text-base"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={loading}
            className="ml-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <main className="flex-1">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}