import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

export const AnalyticsFilters = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Período</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Últimos 30 días" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="30">Últimos 30 días</SelectItem>
              <SelectItem value="60">Últimos 60 días</SelectItem>
              <SelectItem value="90">Últimos 90 días</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Fecha</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Código QR</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todo lo seleccionado (4)" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todo lo seleccionado (4)</SelectItem>
              <SelectItem value="website">Website QR (2)</SelectItem>
              <SelectItem value="contact">Contact QR (2)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Sistema Operativo</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todo lo seleccionado (7)" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todo lo seleccionado (7)</SelectItem>
              <SelectItem value="ios">iOS</SelectItem>
              <SelectItem value="android">Android</SelectItem>
              <SelectItem value="windows">Windows</SelectItem>
              <SelectItem value="macos">macOS</SelectItem>
              <SelectItem value="linux">Linux</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">País</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todo lo seleccionado (11)" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todo lo seleccionado (11)</SelectItem>
              <SelectItem value="us">Estados Unidos</SelectItem>
              <SelectItem value="ca">Canadá</SelectItem>
              <SelectItem value="mx">México</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Ciudad</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todo lo seleccionado (24)" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todo lo seleccionado (24)</SelectItem>
              <SelectItem value="ny">Nueva York</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="ch">Chicago</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};