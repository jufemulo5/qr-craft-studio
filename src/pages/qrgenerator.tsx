import { useState } from "react";
import { StepHeader } from "@/components/StepHeader";
import { QRTypeCard } from "@/components/QRTypeCard";
import { WebsiteQRForm } from "@/components/WebsiteQRForm";
import { QRDownloadForm } from "@/components/QRDownloadForm";
import {
  Globe,
  FileText,
  Link,
  IdCard,
  Facebook,
  Video,
  Image,
  Instagram,
  MessageSquare,
  Music,
  Menu,
  Wifi,
} from "lucide-react";

const qrTypes = [
  {
    icon: Globe,
    title: "Sitio web",
    description: "Enlace a la URL de cualquier sitio web",
  },
  {
    icon: FileText,
    title: "PDF",
    description: "Mostrar un PDF",
  },
  {
    icon: Link,
    title: "Lista de enlaces",
    description: "Comparta múltiples enlaces",
  },
  {
    icon: IdCard,
    title: "vCard",
    description: "Comparta una tarjeta de visita electrónica",
  },
  {
    icon: Facebook,
    title: "Facebook",
    description: "Comparta su página de Facebook",
  },
  {
    icon: Video,
    title: "Video",
    description: "Mostrar un video",
  },
  {
    icon: Image,
    title: "Imágenes",
    description: "Comparta múltiples imágenes",
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: "Comparta su Instagram",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Reciba mensajes de WhatsApp",
  },
  {
    icon: Music,
    title: "MP3",
    description: "Comparta un archivo de audio",
  },
  {
    icon: Menu,
    title: "Menú",
    description: "Cree un menú de restaurante",
  },
  {
    icon: Wifi,
    title: "Wi-Fi",
    description: "Conectarse a una red Wi-Fi",
  },
];

interface QRData {
  type: string;
  url?: string;
  name?: string;
}

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [qrData, setQRData] = useState<QRData | null>(null);

  const handleTypeSelect = (title: string) => {
    setSelectedType(title);
    setQRData({ type: title });
    setCurrentStep(2);
  };

  const handleWebsiteSubmit = (values: { url: string; name: string }) => {
    setQRData((prev) => ({
      ...prev!,
      url: values.url,
      name: values.name,
    }));
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSelectedType(null);
    setQRData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <StepHeader currentStep={currentStep} />
      <main className="max-w-4xl mx-auto px-6 py-8">
        {currentStep === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-8">
              1. Seleccione un tipo de código QR
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qrTypes.map((type) => (
                <QRTypeCard
                  key={type.title}
                  icon={type.icon}
                  title={type.title}
                  description={type.description}
                  selected={selectedType === type.title}
                  onClick={() => handleTypeSelect(type.title)}
                />
              ))}
            </div>
          </>
        )}

        {currentStep === 2 && selectedType === "Sitio web" && (
          <>
            <h1 className="text-2xl font-bold mb-8">
              2. Añada contenido a su código QR
            </h1>
            <WebsiteQRForm
              onBack={handleBack}
              onSubmit={handleWebsiteSubmit}
            />
          </>
        )}

        {currentStep === 3 && qrData?.url && (
          <>
            <h1 className="text-2xl font-bold mb-8">
              3. Descargue su código QR
            </h1>
            <QRDownloadForm
              url={qrData.url}
              name={qrData.name || "qr-code"}
            />
          </>
        )}
      </main>
    </div>
  );
}
