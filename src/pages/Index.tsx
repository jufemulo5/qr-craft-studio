import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const handleCreateQR = () => {
    navigate('/qrgenerator');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Creamos códigos <span className="text-primary">QR fácilmente.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Genera códigos QR personalizados para tu negocio, eventos o uso personal de manera rápida y sencilla.
          </p>
          <Button size="lg" className="gap-2" onClick={handleCreateQR}>
            Crear código QR <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Crea tu código QR en tres sencillos pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-semibold">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Descubre el generador de códigos QR más avanzado
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Crea códigos QR para cualquier propósito con nuestras múltiples opciones de personalización.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Códigos QR que se adaptan a sus necesidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿A punto para comenzar?</h2>
          <p className="mb-8 text-primary-foreground/90">
            Empieza a crear tus códigos QR personalizados ahora mismo de forma gratuita.
          </p>
          <Button variant="secondary" size="lg" onClick={handleCreateQR}>
            Crear código QR gratis
          </Button>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    title: "Selecciona el tipo",
    description: "Elige entre múltiples tipos de códigos QR según tu necesidad",
  },
  {
    title: "Personaliza el contenido",
    description: "Añade tu información y personaliza el diseño del código QR",
  },
  {
    title: "Descarga o comparte",
    description: "Obtén tu código QR en diferentes formatos o compártelo directamente",
  },
];

const features = [
  {
    icon: CheckCircle2,
    title: "Códigos QR Dinámicos",
    description: "Modifica el contenido del código QR en cualquier momento sin necesidad de reimprimir",
  },
  {
    icon: CheckCircle2,
    title: "Diseño Personalizado",
    description: "Personaliza los colores y el diseño de tu código QR para que coincida con tu marca",
  },
  {
    icon: CheckCircle2,
    title: "Análisis Detallado",
    description: "Obtén estadísticas detalladas sobre el uso de tus códigos QR",
  },
  {
    icon: CheckCircle2,
    title: "Múltiples Formatos",
    description: "Descarga tus códigos QR en diferentes formatos: PNG, JPG, SVG y PDF",
  },
];

const benefits = [
  {
    title: "Fácil de usar",
    description: "Interfaz intuitiva que te permite crear códigos QR en minutos sin conocimientos técnicos",
  },
  {
    title: "Alta calidad",
    description: "Códigos QR optimizados para una lectura rápida y confiable en cualquier dispositivo",
  },
  {
    title: "Personalización completa",
    description: "Adapta el diseño y contenido de tus códigos QR según tus necesidades específicas",
  },
  {
    title: "Soporte multiplataforma",
    description: "Tus códigos QR funcionarán perfectamente en cualquier dispositivo o sistema operativo",
  },
];
