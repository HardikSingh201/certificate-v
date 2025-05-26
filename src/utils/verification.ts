
import { validateCertificate } from "../data/certificates";

// Function to verify a certificate by ID or certificate number
export const verifyCertificate = async (identifier: string) => {
  // In a real app, this would be an API call
  // For now, we'll use our mock data
  return validateCertificate(identifier);
};

// Simple QR code scanner simulator
// In a real app, this would use a library like zxing
export const scanQRCode = (dataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulate scanning delay
    setTimeout(() => {
      // This would actually extract data from the QR code
      // For demo, we just return a fake certificate number based on the image hash
      const hash = dataUrl.split('').reduce(
        (hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0
      );
      
      // Use hash to pick one of our mock certificates
      const mockIds = ["cert-1234-abcd-5678", "cert-5678-efgh-9012", 
                       "cert-9012-ijkl-3456", "cert-3456-mnop-7890"];
      const id = mockIds[Math.abs(hash) % mockIds.length];
      
      resolve(id);
    }, 1500);
  });
};

// Function to format dates in a readable format
export const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

// Generate a verification status badge class based on certificate status
export const getStatusBadgeClasses = (status: string) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
  
  switch (status) {
    case 'active':
      return `${baseClasses} bg-verify-success/20 text-verify-success`;
    case 'expired':
      return `${baseClasses} bg-verify-pending/20 text-verify-pending`;
    case 'revoked':
      return `${baseClasses} bg-verify-error/20 text-verify-error`;
    default:
      return `${baseClasses} bg-gray-200 text-gray-800`;
  }
};
