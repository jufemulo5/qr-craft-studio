
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepHeaderProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Tipo de código QR" },
  { number: 2, title: "Contenido" },
  { number: 3, title: "Descarga o comparte" },
];

export function StepHeader({ currentStep }: StepHeaderProps) {
  return (
    <div className="w-full py-4 px-6 border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "flex items-center space-x-2",
                currentStep === step.number
                  ? "text-primary"
                  : currentStep > step.number
                  ? "text-muted-foreground"
                  : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center border",
                  currentStep === step.number
                    ? "border-primary bg-primary text-white"
                    : currentStep > step.number
                    ? "border-muted-foreground"
                    : "border-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
