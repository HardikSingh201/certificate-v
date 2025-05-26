import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, Calendar, Award, Clock, FileCheck, X, Database } from "lucide-react";
import { Certificate } from "../data/certificates";
import { formatDate, getStatusBadgeClasses } from "../utils/verification";

interface CertificateDisplayProps {
  certificate: Certificate;
  isValid: boolean;
  message: string;
  onClose: () => void;
}

const CertificateDisplay: React.FC<CertificateDisplayProps> = ({ 
  certificate, 
  isValid, 
  message,
  onClose 
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto certificate-card border-2">
      <CardHeader className="border-b pb-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-verify-blue">
              Certificate Verification
            </CardTitle>
            <CardDescription className="mt-1">
              Certificate #{certificate.certificateNumber}
            </CardDescription>
          </div>
          <div className="flex items-center">
            {isValid ? (
              <div className="flex items-center gap-2 bg-verify-success/20 text-verify-success px-4 py-2 rounded-full">
                <Shield size={20} className="text-verify-success" />
                <span className="font-medium">Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-verify-error/20 text-verify-error px-4 py-2 rounded-full">
                <X size={20} />
                <span className="font-medium">Not Verified</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-verify-blue flex items-center gap-2">
              <FileCheck size={20} />
              Certificate Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Course Name</p>
                <p className="font-medium">{certificate.courseName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recipient</p>
                <p className="font-medium">{certificate.recipientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issuer</p>
                <p className="font-medium">{certificate.issuerName}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusBadgeClasses(certificate.status)}>
                    {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>Issued {formatDate(certificate.issueDate)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-verify-blue flex items-center gap-2">
              <Award size={20} />
              Achievements
            </h3>
            
            {certificate.description && (
              <p className="text-sm mb-4">{certificate.description}</p>
            )}
            
            {certificate.achievements && certificate.achievements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {certificate.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="bg-verify-blue/10">
                    {achievement}
                  </Badge>
                ))}
              </div>
            )}
            
            {certificate.expiryDate && (
              <div className="mt-6 flex items-center gap-2 p-3 rounded-md bg-muted">
                <Clock size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Expiry Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(certificate.expiryDate)}
                  </p>
                </div>
              </div>
            )}
            
            {certificate.blockchainData && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-verify-blue flex items-center gap-2">
                  <Database size={20} />
                  Blockchain Data
                </h3>
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div>
                    <p className="text-sm text-muted-foreground">Block Index</p>
                    <p className="font-mono">{certificate.blockchainData.index}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timestamp</p>
                    <p className="font-mono">{new Date(certificate.blockchainData.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previous Hash</p>
                    <p className="font-mono text-xs truncate">{certificate.blockchainData.previousHash}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Block Hash</p>
                    <p className="font-mono text-xs truncate">{certificate.blockchainData.hash}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nonce</p>
                    <p className="font-mono">{certificate.blockchainData.nonce}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-muted">
          <div className="flex items-start gap-3">
            {isValid ? (
              <Shield size={24} className="text-verify-success mt-0.5" />
            ) : (
              <Shield size={24} className="text-verify-error mt-0.5" />
            )}
            <div>
              <h4 className={`font-medium ${isValid ? 'text-verify-success' : 'text-verify-error'}`}>
                Verification Result
              </h4>
              <p className="mt-1 text-sm">{message}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="badge-pattern inline-block h-6 w-6 rounded-full border mr-2 align-middle"></span>
          Secured by CertVerify
        </div>
        <Button onClick={onClose}>Close</Button>
      </CardFooter>
    </Card>
  );
};

export default CertificateDisplay;
