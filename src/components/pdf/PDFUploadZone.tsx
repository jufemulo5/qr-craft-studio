
import { useState } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UseFormSetValue } from "react-hook-form";
import { PDFFormValues } from "./types";

interface PDFUploadZoneProps {
  setValue: UseFormSetValue<PDFFormValues>;
}

export function PDFUploadZone({ setValue }: PDFUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileDrop = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, seleccione un archivo PDF",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB
      toast({
        variant: "destructive",
        title: "Error",
        description: "El archivo no debe superar los 100MB",
      });
      return;
    }

    setValue("file", file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileDrop(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileDrop(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? "border-primary bg-primary/5" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto w-12 h-12 mb-4">
        <Upload className="w-12 h-12 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Arrastre y suelte su archivo PDF aquí o
      </p>
      <label className="inline-block">
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <span className="text-primary hover:underline cursor-pointer">
          seleccione un archivo
        </span>
      </label>
      <p className="text-xs text-gray-500 mt-2">
        Tamaño máximo: 100 MB
      </p>
    </div>
  );
}
