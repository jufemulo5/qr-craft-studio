
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { QRNameField } from "@/components/QRNameField";
import { Instagram, Youtube, Facebook, Linkedin, Twitter, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { useState } from "react";

const socialIcons = [
  { icon: Instagram, bg: "bg-pink-100", color: "text-pink-500", name: "Instagram" },
  { icon: Facebook, bg: "bg-blue-100", color: "text-blue-600", name: "Facebook" },
  { icon: Youtube, bg: "bg-black", color: "text-white", name: "YouTube" },
  { icon: Twitter, bg: "bg-blue-400", color: "text-white", name: "Twitter" },
  { icon: Linkedin, bg: "bg-blue-700", color: "text-white", name: "LinkedIn" },
];

const linkListFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  links: z.array(z.object({
    title: z.string(),
    url: z.string().url("La URL no es válida"),
    icon: z.string()
  })).min(1, "Debe agregar al menos un enlace"),
});

type LinkListFormValues = z.infer<typeof linkListFormSchema>;

interface SocialLink {
  icon: any;
  url: string;
  name: string;
  bg: string;
  color: string;
}

interface LinkListQRFormProps {
  onBack: () => void;
  onSubmit: (values: { name: string; url: string }) => void;
}

export function LinkListQRForm({ onBack, onSubmit }: LinkListQRFormProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

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
    const linkData = {
      title: values.title,
      description: values.description,
      links: socialLinks.map(link => ({
        title: link.name,
        url: link.url,
        icon: link.name.toLowerCase()
      }))
    };
    
    const encodedData = btoa(JSON.stringify(linkData));
    const url = `${window.location.origin}/links/${encodedData}`;
    
    onSubmit({
      name: values.name,
      url: url
    });
  };

  const addSocialLink = (socialIcon: any) => {
    const exists = socialLinks.some(link => link.name === socialIcon.name);
    if (!exists) {
      setSocialLinks([...socialLinks, {
        icon: socialIcon.icon,
        url: "",
        name: socialIcon.name,
        bg: socialIcon.bg,
        color: socialIcon.color
      }]);
    }
  };

  const updateSocialLinkUrl = (index: number, url: string) => {
    const newLinks = [...socialLinks];
    newLinks[index].url = url;
    setSocialLinks(newLinks);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const moveSocialLink = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === socialLinks.length - 1)
    ) {
      return;
    }

    const newLinks = [...socialLinks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newLinks[index], newLinks[newIndex]] = [newLinks[newIndex], newLinks[index]];
    setSocialLinks(newLinks);
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
              
              <div className="flex flex-wrap gap-2 mb-4">
                {socialIcons.map((socialIcon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addSocialLink(socialIcon)}
                    className={`${socialIcon.bg} p-2 rounded-lg hover:opacity-80 transition-opacity`}
                  >
                    <socialIcon.icon className={`w-6 h-6 ${socialIcon.color}`} />
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${link.bg} rounded-lg flex items-center justify-center`}>
                      <link.icon className={`w-6 h-6 ${link.color}`} />
                    </div>
                    <Input 
                      placeholder={`Tu usuario de ${link.name}`}
                      value={link.url}
                      onChange={(e) => updateSocialLinkUrl(index, e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSocialLink(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSocialLink(index, 'down')}
                        disabled={index === socialLinks.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocialLink(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
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
