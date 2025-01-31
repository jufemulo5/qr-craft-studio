import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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

  const handleAuth = async () => {
    if (user) {
      await supabase.auth.signOut();
      navigate('/');
    } else {
      navigate('/qrgenerator');
    }
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
          <Button onClick={handleAuth} variant="outline" size="sm" className="gap-2">
            {user ? 'Cerrar sesión' : (
              <>
                <LogIn className="w-4 h-4" />
                Iniciar sesión
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}