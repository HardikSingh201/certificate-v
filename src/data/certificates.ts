export interface Certificate {
  id: string;
  recipientName: string;
  issuerName: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  status: 'active' | 'expired' | 'revoked';
  description?: string;
  achievements?: string[];
  blockchainData?: {
    index: number;
    timestamp: string;
    previousHash: string;
    hash: string;
    nonce: number;
  };
}

// Mock data for frontend development
export const mockCertificates: Certificate[] = [
  {
    id: "cert-1234-abcd-5678",
    recipientName: "Jane Doe",
    issuerName: "Tech Academy",
    courseName: "Full Stack Web Development",
    issueDate: "2023-06-15",
    expiryDate: "2026-06-15",
    certificateNumber: "TA-FS-2023-001",
    status: "active",
    description: "Completed 600 hours of intensive training in modern web development technologies.",
    achievements: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    blockchainData: {
      index: 1,
      timestamp: "2023-06-15T10:30:00",
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: "000abc123def456789...",
      nonce: 3542
    }
  },
  {
    id: "cert-5678-efgh-9012",
    recipientName: "John Smith",
    issuerName: "Design Institute",
    courseName: "UX/UI Design Fundamentals",
    issueDate: "2023-04-10",
    certificateNumber: "DI-UX-2023-042",
    status: "active",
    description: "Mastered user-centered design principles and prototyping techniques.",
    achievements: ["User Research", "Wireframing", "Figma", "Usability Testing"],
    blockchainData: {
      index: 2,
      timestamp: "2023-04-10T14:20:00",
      previousHash: "000abc123def456789...",
      hash: "000def456789abc123...",
      nonce: 2891
    }
  },
  {
    id: "cert-9012-ijkl-3456",
    recipientName: "John Doe",
    issuerName: "Tech Academy",
    courseName: "Blockchain Fundamentals",
    issueDate: "2025-04-01",
    certificateNumber: "EDU12345",
    status: "active",
    description: "Comprehensive understanding of blockchain technology and its applications.",
    achievements: ["Blockchain", "Smart Contracts", "Cryptography"],
    blockchainData: {
      index: 2,
      timestamp: "2025-04-08T12:45:00",
      previousHash: "00a1b2c3...",
      hash: "004acbd45f...",
      nonce: 4871
    }
  }
];

// This would be replaced by actual API calls in a production app
let certificates = [...mockCertificates];

export const getCertificates = () => {
  return [...certificates];
};

export const getCertificate = (id: string) => {
  return certificates.find(cert => cert.id === id || cert.certificateNumber === id);
};

export const addCertificate = (certificate: Omit<Certificate, 'id'>) => {
  const id = `cert-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
  const newCert = { ...certificate, id };
  certificates.push(newCert);
  return newCert;
};

export const updateCertificate = (id: string, updates: Partial<Omit<Certificate, 'id'>>) => {
  const index = certificates.findIndex(cert => cert.id === id);
  if (index !== -1) {
    certificates[index] = { ...certificates[index], ...updates };
    return certificates[index];
  }
  return null;
};

export const deleteCertificate = (id: string) => {
  const index = certificates.findIndex(cert => cert.id === id);
  if (index !== -1) {
    const deleted = certificates[index];
    certificates = certificates.filter(cert => cert.id !== id);
    return deleted;
  }
  return null;
};

export const validateCertificate = (identifier: string) => {
  const certificate = certificates.find(
    cert => cert.id === identifier || cert.certificateNumber === identifier
  );
  
  if (!certificate) {
    return {
      isValid: false,
      message: "Certificate not found."
    };
  }
  
  if (certificate.status === "revoked") {
    return {
      isValid: false,
      certificate,
      message: "This certificate has been revoked."
    };
  }
  
  if (certificate.status === "expired" || 
      (certificate.expiryDate && new Date(certificate.expiryDate) < new Date())) {
    return {
      isValid: false,
      certificate,
      message: "This certificate has expired."
    };
  }
  
  return {
    isValid: true,
    certificate,
    message: "Valid certificate."
  };
};
