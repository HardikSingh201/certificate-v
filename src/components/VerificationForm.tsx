
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { verifyCertificate } from "@/utils/verification";
import ScanQRCode from "./ScanQRCode";
import CertificateDisplay from "./CertificateDisplay";
import { Certificate } from "@/data/certificates";
import { QrCode, Search } from "lucide-react";

const VerificationForm: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    certificate?: Certificate;
    message: string;
  } | null>(null);
  const { toast } = useToast();

  const handleVerify = async (id: string) => {
    if (!id.trim()) {
      toast({
        title: "Verification Error",
        description: "Please enter a certificate ID or number.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyCertificate(id);
      setVerificationResult(result);
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleScanComplete = (id: string) => {
    setCertificateId(id);
    handleVerify(id);
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCertificateId('');
  };

  if (verificationResult?.certificate) {
    return (
      <CertificateDisplay 
        certificate={verificationResult.certificate} 
        isValid={verificationResult.isValid}
        message={verificationResult.message}
        onClose={resetVerification} 
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-verify-blue">
          Certificate Verification
        </CardTitle>
        <CardDescription className="text-center">
          Verify the authenticity of a certificate by entering its ID or scanning a QR code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="id" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="id" className="flex items-center gap-2">
              <Search size={16} />
              <span>Enter ID</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode size={16} />
              <span>Scan QR</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="id">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Enter Certificate ID or Number"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="mb-4"
                />
                <Button 
                  onClick={() => handleVerify(certificateId)} 
                  className="w-full"
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify Certificate"}
                </Button>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Example IDs for testing:</p>
                <p className="font-mono mt-1">TA-FS-2023-001, cert-1234-abcd-5678</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="qr">
            <ScanQRCode 
              onScanComplete={handleScanComplete}
              onCancel={() => {}} 
            />
          </TabsContent>
        </Tabs>
        
        {verificationResult && !verificationResult.certificate && (
          <div className="mt-6 p-4 rounded-lg bg-verify-error/10 text-verify-error text-center">
            {verificationResult.message}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-center text-muted-foreground">
          Having issues? Contact <a href="/support" className="text-verify-blue hover:underline">support</a> for assistance.
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;
