import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
}

export function QRTypeCard({
  icon: Icon,
  title,
  description,
  onClick,
  selected,
}: QRTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 rounded-xl border bg-card text-left transition-all hover:shadow-md",
        selected && "ring-2 ring-primary"
      )}
    >
      <Icon className="w-8 h-8 text-primary mb-4" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}