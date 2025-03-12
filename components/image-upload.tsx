"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  existingImageUrl?: string;
}

export default function ImageUpload({
  onImageUpload,
  existingImageUrl,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    existingImageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Type de fichier non pris en charge. Utilisez JPG, PNG, WEBP ou GIF."
      );
      return;
    }

    // Vérifier la taille du fichier (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Le fichier est trop volumineux. Taille maximale: 5MB.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors du téléchargement de l'image"
        );
      }

      const data = await response.json();
      setImageUrl(data.url);
      onImageUpload(data.url);
    } catch (error) {
      console.error("Erreur d'upload:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors du téléchargement de l'image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Téléchargement...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Télécharger une image
            </>
          )}
        </Button>
        {imageUrl && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={handleRemoveImage}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Supprimer l'image</span>
          </Button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {imageUrl && (
        <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-md border">
          <Image
            src={imageUrl}
            alt="Image téléchargée"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
