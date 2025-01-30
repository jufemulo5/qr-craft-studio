import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignUpDialog } from "@/components/ui/sign-up-dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface StepHeaderProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Tipo de código QR" },
  { number: 2, title: "Contenido" },
  { number: 3, title: "Descarga o comparte" },
];

export function StepHeader({ currentStep }: StepHeaderProps) {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "¡Hasta pronto!",
        description: "Has cerrado sesión exitosamente.",
      });
    }
  };

  return (
    <div className="w-full py-4 px-6 border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/f07bce87-1046-43d7-80d9-eec8cb1829a1.png" alt="QR Generator" className="h-8" />
            <span className="font-semibold text-lg">Online QR Generator</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "flex items-center space-x-2",
                currentStep === step.number
                  ? "text-primary"
                  : currentStep > step.number
                  ? "text-muted-foreground"
                  : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center border",
                  currentStep === step.number
                    ? "border-primary bg-primary text-white"
                    : currentStep > step.number
                    ? "border-muted-foreground"
                    : "border-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" onClick={handleSignOut}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <SignUpDialog />
          )}
        </div>
      </div>
    </div>
  );
}