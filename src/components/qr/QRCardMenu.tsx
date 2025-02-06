import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Palette,
  RefreshCw,
  Copy,
  Send,
  Pause,
  Trash2,
} from "lucide-react";

interface QRCardMenuProps {
  onDelete: () => void;
}

export function QRCardMenu({ onDelete }: QRCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Abrir menú</span>
          <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z" fill="currentColor"/>
            <path d="M7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5C6 2.32843 6.67157 3 7.5 3Z" fill="currentColor"/>
            <path d="M13.5 3C14.3284 3 15 2.32843 15 1.5C15 0.671573 14.3284 0 13.5 0C12.6716 0 12 0.671573 12 1.5C12 2.32843 12.6716 3 13.5 3Z" fill="currentColor"/>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil className="w-4 h-4 mr-2" />
          Editar el contenido del QR
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Palette className="w-4 h-4 mr-2" />
          Editar el diseño del QR
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RefreshCw className="w-4 h-4 mr-2" />
          Cambiar el tipo de QR
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Copy className="w-4 h-4 mr-2" />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Send className="w-4 h-4 mr-2" />
          Enviar a
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Pause className="w-4 h-4 mr-2" />
          Pausar
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-600" 
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}