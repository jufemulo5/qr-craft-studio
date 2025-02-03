import React from "react";
import { Line, Pie } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { CalendarIcon, ArrowUpRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const Analytics = () => {
  const [date, setDate] = React.useState<Date>();

  const lineData = {
    labels: ["Ene 05", "Ene 06", "Ene 07", "Ene 08", "Ene 09", "Ene 10"],
    datasets: [
      {
        label: "Escaneos",
        data: [5, 10, 15, 8, 12, 18],
        borderColor: "#10B981",
        fill: false,
      },
      {
        label: "Escaneos Únicos",
        data: [3, 7, 12, 6, 9, 15],
        borderColor: "#3B82F6",
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Datos Analíticos</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="text-red-500 hover:text-red-600">
            Salir de la demostración
          </Button>
          <Button className="bg-green-50 text-green-600 hover:bg-green-100 gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Exportar información
          </Button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de códigos QR</p>
                <p className="text-2xl font-semibold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de escaneos</p>
                <p className="text-2xl font-semibold">309</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de escaneos únicos</p>
                <p className="text-2xl font-semibold">263</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Actividades de escaneo de códigos QR</h2>
          <p className="text-sm text-gray-500">Ene 5, 2025 - Feb 3, 2025</p>
        </div>
        <div className="h-[300px]">
          <ChartContainer
            className="h-full"
            config={{
              scans: {
                label: "Escaneos",
                color: "#10B981",
              },
              uniqueScans: {
                label: "Escaneos únicos",
                color: "#3B82F6",
              },
            }}
          >
            <Line
              data={lineData}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: false,
                  },
                  legend: {
                    display: true,
                    position: "top" as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "#f3f4f6",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </ChartContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Escaneos por sistema operativo</h3>
            <div className="h-[300px]">
              <Pie
                data={{
                  labels: ["iOS", "Android", "Windows", "Linux", "Mac OS"],
                  datasets: [{
                    data: [34.0, 33.7, 17.5, 6.1, 6.1],
                    backgroundColor: [
                      "#10B981",
                      "#F97316",
                      "#3B82F6",
                      "#8B5CF6",
                      "#EC4899",
                    ],
                  }],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Escaneos por país</h3>
            <div className="h-[300px]">
              <Pie
                data={{
                  labels: ["United States", "Canada", "India", "France", "Spain"],
                  datasets: [{
                    data: [16.2, 13.6, 10.4, 10.0, 9.4],
                    backgroundColor: [
                      "#10B981",
                      "#F97316",
                      "#3B82F6",
                      "#8B5CF6",
                      "#EC4899",
                    ],
                  }],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Escaneos por región/ciudad</h3>
            <div className="h-[300px]">
              <Pie
                data={{
                  labels: ["New York", "Montreal", "Los Angeles", "Mumbai", "Toronto"],
                  datasets: [{
                    data: [8.7, 8.4, 7.1, 5.5, 5.2],
                    backgroundColor: [
                      "#10B981",
                      "#F97316",
                      "#3B82F6",
                      "#8B5CF6",
                      "#EC4899",
                    ],
                  }],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;