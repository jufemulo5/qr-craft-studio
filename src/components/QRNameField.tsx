
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface QRNameFieldProps {
  form: UseFormReturn<any>;
}

export function QRNameField({ form }: QRNameFieldProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre del código QR</FormLabel>
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
  );
}
