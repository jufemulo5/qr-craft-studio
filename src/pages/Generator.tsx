import { Card } from "@/components/ui/card";

export default function Generator() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Generador de Códigos QR</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Selecciona el tipo de código QR</h2>
        <p className="text-gray-600">
          Elige el tipo de contenido que deseas codificar en tu código QR.
        </p>
      </Card>
    </div>
  );
}