
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import AdminLogin from '@/components/AdminLogin';
import CertificateList from '@/components/CertificateList';

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="container max-w-screen-xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-verify-blue">Admin Panel</h1>
          <p className="text-muted-foreground">Manage certificates and view verification logs</p>
        </div>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2">
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <CertificateList />
    </div>
  );
};

export default AdminPanel;
