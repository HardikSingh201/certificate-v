
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Upload } from "lucide-react";
import { scanQRCode } from "@/utils/verification";

interface ScanQRCodeProps {
  onScanComplete: (result: string) => void;
  onCancel: () => void;
}

const ScanQRCode: React.FC<ScanQRCodeProps> = ({ onScanComplete, onCancel }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsScanning(true);
    setScanError(null);
    
    try {
      // Convert image to data URL
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const dataUrl = event.target?.result as string;
          // In a real app, we'd use a QR code scanner library
          const result = await scanQRCode(dataUrl);
          onScanComplete(result);
        } catch (error) {
          console.error("Error scanning QR code:", error);
          setScanError("Failed to read QR code. Please try again.");
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling file:", error);
      setScanError("Failed to process image. Please try again.");
      setIsScanning(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-verify-blue mb-2">Scan QR Code</h2>
            <p className="text-muted-foreground">
              Upload an image containing a certificate QR code
            </p>
          </div>

          <div className="w-full aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center">
            {isScanning ? (
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="h-[200px] w-[200px] rounded-md animate-pulse-slow" />
                <p className="text-sm text-muted-foreground animate-pulse">Scanning...</p>
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-6">
                <Camera size={64} className="text-gray-400 mb-4" />
                <p className="text-center text-muted-foreground mb-4">
                  Upload a QR code image to verify the certificate
                </p>
                <Button variant="outline" onClick={triggerFileUpload} className="gap-2">
                  <Upload size={16} />
                  <span>Choose Image</span>
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*"
                  className="hidden" 
                />
              </div>
            )}
          </div>
          
          {scanError && (
            <div className="text-verify-error text-sm p-2 rounded-md bg-verify-error/10 w-full text-center">
              {scanError}
            </div>
          )}
          
          <div className="flex justify-between w-full pt-2">
            <Button variant="outline" onClick={onCancel} disabled={isScanning}>
              Cancel
            </Button>
            <Button onClick={triggerFileUpload} disabled={isScanning} variant="default">
              {isScanning ? "Scanning..." : "Upload Image"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanQRCode;
