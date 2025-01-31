import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { SignUpDialog } from "@/components/ui/sign-up-dialog";

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/6b1ebaa3-85a6-43de-9d60-2002486b144a.png"
              alt="Logo"
              className="h-8"
            />
          </div>
          {user ? (
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Cerrar sesión
            </Button>
          ) : (
            <SignUpDialog />
          )}
        </div>
      </div>
    </header>
  );
}