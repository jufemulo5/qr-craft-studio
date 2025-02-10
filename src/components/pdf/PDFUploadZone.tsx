
import { useState } from "react";
import { Upload, Loader, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UseFormSetValue } from "react-hook-form";
import { PDFFormValues } from "./types";
import { Progress } from "@/components/ui/progress";

interface PDFUploadZoneProps {
  setValue: UseFormSetValue<PDFFormValues>;
}

export function PDFUploadZone({ setValue }: PDFUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const simulateUploadProgress = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const totalSteps = 10;
    const stepTime = Math.max(100, (file.size / 1024 / 1024) * 50); // Adjust time based on file size
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setUploadProgress((currentStep / totalSteps) * 100);

      if (currentStep === totalSteps) {
        clearInterval(progressInterval);
        setIsUploading(false);
        setUploadedFile(file);
        setValue("file", file);
        toast({
          title: "Archivo cargado",
          description: "El PDF se ha cargado correctamente.",
        });
      }
    }, stepTime);
  };

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

    simulateUploadProgress(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setValue("file", null);
    setUploadProgress(0);
    toast({
      title: "Archivo eliminado",
      description: "El archivo ha sido eliminado correctamente.",
    });
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

  if (uploadedFile) {
    return (
      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-600"
            title="Eliminar archivo"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto w-12 h-12 mb-4">
          {isUploading ? (
            <Loader className="w-12 h-12 text-primary animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}
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
            disabled={isUploading}
          />
          <span className="text-primary hover:underline cursor-pointer">
            seleccione un archivo
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Tamaño máximo: 100 MB
        </p>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} />
          <p className="text-sm text-center text-gray-500">
            Cargando archivo... {Math.round(uploadProgress)}%
          </p>
        </div>
      )}
    </div>
  );
}
