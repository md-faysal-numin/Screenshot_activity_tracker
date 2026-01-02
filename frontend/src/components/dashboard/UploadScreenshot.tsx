import React, { useState, useRef } from "react";
import { Upload, Camera, X, Image as ImageIcon } from "lucide-react";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { useUploadScreenshot } from "../../hooks/queries/useScreenshotQueries";

export const UploadScreenshot: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [capturedAt, setCapturedAt] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadScreenshot();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (
        !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        )
      ) {
        alert("Only JPG, PNG, and WebP images are allowed");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadMutation.mutateAsync({
      file: selectedFile,
      capturedAt: new Date(capturedAt).toISOString(),
    });

    setSelectedFile(null);
    setPreview(null);
    setCapturedAt(new Date().toISOString().slice(0, 16));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Camera className="mr-2" size={20} />
            Upload Screenshot
          </h3>
        </div>

        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-2">Click to select screenshot</p>
            <p className="text-sm text-gray-500">JPG, PNG, or WebP (max 5MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-contain bg-gray-50"
              />
              <button
                onClick={handleCancel}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capture Time
              </label>
              <input
                type="datetime-local"
                value={capturedAt}
                onChange={(e) => setCapturedAt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                When was this screenshot taken?
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleUpload}
                isLoading={uploadMutation.isPending}
                className="flex-1"
              >
                <Upload size={18} className="mr-2" />
                Upload Screenshot
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <ImageIcon className="text-blue-600 mr-3 shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Screenshot Guidelines
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Take screenshots of your active work</li>
                <li>• Upload regularly during work hours</li>
                <li>• Maximum file size: 5MB</li>
                <li>• Supported formats: JPG, PNG, WebP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
