
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { QRNameField } from "@/components/QRNameField";
import { Instagram, Youtube, Facebook } from "lucide-react";

const linkListFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  links: z.array(z.object({
    title: z.string(),
    url: z.string().url("La URL no es válida"),
    icon: z.string().optional()
  })).min(1, "Debe agregar al menos un enlace"),
});

type LinkListFormValues = z.infer<typeof linkListFormSchema>;

interface LinkListQRFormProps {
  onBack: () => void;
  onSubmit: (values: { name: string; url: string }) => void;
}

export function LinkListQRForm({ onBack, onSubmit }: LinkListQRFormProps) {
  const form = useForm<LinkListFormValues>({
    resolver: zodResolver(linkListFormSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      links: []
    }
  });

  const handleSubmit = (values: LinkListFormValues) => {
    // Here we'll generate the URL for the links page
    const linkData = {
      title: values.title,
      description: values.description,
      links: values.links
    };
    
    // Convert linkData to base64 to include in URL
    const encodedData = btoa(JSON.stringify(linkData));
    const url = `${window.location.origin}/links/${encodedData}`;
    
    onSubmit({
      name: values.name,
      url: url
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <QRNameField form={form} />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="P.ej.: Encuéntreme en las redes sociales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="P.ej.: ¡Únase a mí en mi viaje por las redes sociales en busca de inspiración, optimismo y diversión!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="font-medium">Enlaces a redes sociales</h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-pink-500" />
                  </div>
                  <Input placeholder="Tu usuario de Instagram" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <Input placeholder="Tu usuario de YouTube" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </div>
                  <Input placeholder="Tu usuario de Facebook" />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
              >
                Volver
              </Button>
              <Button type="submit">
                Siguiente
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
