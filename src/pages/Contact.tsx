import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
            <p className="text-gray-600">
              Estamos aquí para ayudarte. Envíanos un mensaje y nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}