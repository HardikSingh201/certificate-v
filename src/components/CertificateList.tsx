
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { formatDate, getStatusBadgeClasses } from "@/utils/verification";
import { Certificate, getCertificates, deleteCertificate } from "@/data/certificates";
import { MoreHorizontal, Plus, FileText, Trash2, Edit } from "lucide-react";
import CertificateForm from "./CertificateForm";
import CertificateDisplay from "./CertificateDisplay";

const CertificateList: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(getCertificates());
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const refreshCertificates = () => {
    setCertificates(getCertificates());
  };

  const handleDelete = (id: string) => {
    try {
      deleteCertificate(id);
      refreshCertificates();
      toast({
        title: "Certificate Deleted",
        description: "The certificate has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete certificate.",
        variant: "destructive",
      });
    }
  };

  const handleView = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-verify-blue">Certificates</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add Certificate</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Certificate</DialogTitle>
            </DialogHeader>
            <CertificateForm 
              onSave={() => {
                refreshCertificates();
                setIsAddDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cert. Number</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead className="hidden md:table-cell">Course</TableHead>
              <TableHead className="hidden md:table-cell">Issue Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No certificates found. Add a new certificate to get started.
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono text-xs">
                    {cert.certificateNumber}
                  </TableCell>
                  <TableCell>{cert.recipientName}</TableCell>
                  <TableCell className="hidden md:table-cell">{cert.courseName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(cert.issueDate)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClasses(cert.status)}>
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(cert)}>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(cert)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(cert.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Certificate Dialog */}
      {selectedCertificate && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <CertificateDisplay
              certificate={selectedCertificate}
              isValid={selectedCertificate.status === 'active'}
              message={
                selectedCertificate.status === 'active'
                  ? "This certificate is valid and active."
                  : selectedCertificate.status === 'expired'
                  ? "This certificate has expired."
                  : "This certificate has been revoked."
              }
              onClose={() => setIsViewDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Certificate Dialog */}
      {selectedCertificate && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Certificate</DialogTitle>
            </DialogHeader>
            <CertificateForm 
              certificate={selectedCertificate}
              onSave={() => {
                refreshCertificates();
                setIsEditDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CertificateList;
