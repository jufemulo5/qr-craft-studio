import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe } from "lucide-react";

const websiteFormSchema = z.object({
  url: z.string().url("Por favor, ingrese una URL válida"),
  name: z.string().min(1, "Por favor, ingrese un nombre para el código QR"),
});

type WebsiteFormValues = z.infer<typeof websiteFormSchema>;

interface WebsiteQRFormProps {
  onBack: () => void;
  onSubmit: (values: WebsiteFormValues) => void;
}

export function WebsiteQRForm({ onBack, onSubmit }: WebsiteQRFormProps) {
  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      url: "",
      name: "",
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Información del sitio web</h2>
                <p className="text-sm text-muted-foreground">
                  Introduzca la URL a la que dirigirá este QR.
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del sitio web *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Por ejemplo, https://www.mywebsite.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-primary font-medium">
                QR
              </div>
              <div>
                <h2 className="text-lg font-semibold">Nombre del código QR</h2>
                <p className="text-sm text-muted-foreground">
                  Ponga un nombre a su código QR.
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="P.ej.: Mi código QR"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Volver
            </Button>
            <Button type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}