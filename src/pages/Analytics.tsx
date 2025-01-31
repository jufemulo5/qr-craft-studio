import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { AppSidebar } from "@/components/AppSidebar";

const Analytics = () => {
  const lineData = {
    labels: ["Ene 02", "Ene 03", "Ene 04", "Ene 05", "Ene 06", "Ene 07"],
    datasets: [
      {
        label: "Escaneos",
        data: [10, 15, 8, 20, 10, 25],
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Escaneos Únicos",
        data: [5, 10, 4, 15, 6, 18],
        borderColor: "#2196F3",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Android", "iOS", "Windows", "Mac OS", "Linux"],
    datasets: [
      {
        data: [34.7, 33.1, 16.9, 6.1, 6.1],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#E91E63"],
      },
    ],
  };

  return (
    <div>
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold">Datos Analíticos</h1>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Select label="Período" options={["Últimos 30 días"]} />
          <Select label="Código QR" options={["Todo seleccionado"]} />
          <Select label="Sistema Operativo" options={["Todo seleccionado"]} />
          <Select label="País" options={["Todo seleccionado"]} />
        </div>
        <div className="flex gap-4 mt-4">
          <Button className="bg-green-500">Exportar información</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent>
              <h2>Total de códigos QR</h2>
              <p className="text-2xl font-bold">4</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2>Total de escaneos</h2>
              <p className="text-2xl font-bold">326</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2>Total de escaneos únicos</h2>
              <p className="text-2xl font-bold">273</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold">Actividades de escaneo</h2>
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
