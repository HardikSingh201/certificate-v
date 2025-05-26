
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Certificate, addCertificate, updateCertificate } from '@/data/certificates';

interface CertificateFormProps {
  certificate?: Certificate;
  onSave: () => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ certificate, onSave }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    issuerName: '',
    courseName: '',
    issueDate: '',
    expiryDate: '',
    certificateNumber: '',
    status: 'active' as 'active' | 'expired' | 'revoked',
    description: '',
    achievements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (certificate) {
      setFormData({
        recipientName: certificate.recipientName,
        issuerName: certificate.issuerName,
        courseName: certificate.courseName,
        issueDate: certificate.issueDate,
        expiryDate: certificate.expiryDate || '',
        certificateNumber: certificate.certificateNumber,
        status: certificate.status,
        description: certificate.description || '',
        achievements: certificate.achievements ? certificate.achievements.join(', ') : '',
      });
    }
  }, [certificate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare achievements array from comma-separated string
      const achievements = formData.achievements
        ? formData.achievements.split(',').map(item => item.trim()).filter(Boolean)
        : [];

      const certificateData = {
        recipientName: formData.recipientName,
        issuerName: formData.issuerName,
        courseName: formData.courseName,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate || undefined,
        certificateNumber: formData.certificateNumber,
        status: formData.status,
        description: formData.description || undefined,
        achievements: achievements.length > 0 ? achievements : undefined,
      };

      if (certificate) {
        // Update existing certificate
        await updateCertificate(certificate.id, certificateData);
        toast({
          title: "Certificate Updated",
          description: "The certificate has been successfully updated.",
        });
      } else {
        // Add new certificate
        await addCertificate(certificateData);
        toast({
          title: "Certificate Added",
          description: "The certificate has been successfully added.",
        });
      }
      
      onSave();
    } catch (error) {
      console.error("Error saving certificate:", error);
      toast({
        title: "Error",
        description: "Failed to save certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Recipient Name *</Label>
          <Input
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuerName">Issuer Name *</Label>
          <Input
            id="issuerName"
            name="issuerName"
            value={formData.issuerName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="courseName">Course Name *</Label>
        <Input
          id="courseName"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="issueDate">Issue Date *</Label>
          <Input
            id="issueDate"
            name="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="certificateNumber">Certificate Number *</Label>
          <Input
            id="certificateNumber"
            name="certificateNumber"
            value={formData.certificateNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange(value, 'status')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a description of the certificate"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="achievements">
          Achievements (Optional, comma-separated)
        </Label>
        <Input
          id="achievements"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="e.g. React, Node.js, MongoDB"
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : certificate ? 'Update Certificate' : 'Add Certificate'}
        </Button>
      </div>
    </form>
  );
};

export default CertificateForm;
