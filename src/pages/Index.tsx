
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Shield, Award, Search, LockKeyhole } from "lucide-react";
import VerificationForm from '@/components/VerificationForm';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container max-w-screen-xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-verify-blue" />
            <span className="font-bold text-xl text-verify-blue">CertVerify</span>
          </div>
          <nav>
            <Button variant="ghost" asChild>
              <Link to="/admin" className="flex items-center gap-2">
                <LockKeyhole size={16} />
                <span>Admin</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-verify-blue/10 text-verify-blue rounded-full text-sm font-medium">
                  Secure Certificate Verification
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-verify-blue leading-tight">
                  Verify Certificate Authenticity in Seconds
                </h1>
                <p className="text-lg text-gray-600">
                  Our blockchain-based verification system ensures that certificates are authentic, 
                  tamper-proof, and instantly verifiable.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="gap-2">
                    <Search size={18} />
                    <span>Verify a Certificate</span>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/admin">
                      Access Admin Panel
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-first md:order-last">
                <div className="badge-pattern bg-white p-8 rounded-lg shadow-lg border">
                  <VerificationForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-verify-blue mb-4">
                How Our Certificate Verification Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our secure verification system ensures the integrity and authenticity 
                of educational and professional certificates.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                <div className="w-12 h-12 bg-verify-blue/20 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-verify-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-verify-blue">
                  Easy Verification
                </h3>
                <p className="text-gray-600">
                  Enter a certificate ID or scan the QR code to instantly verify its authenticity.
                </p>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                <div className="w-12 h-12 bg-verify-blue/20 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-verify-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-verify-blue">
                  Tamper-Proof Records
                </h3>
                <p className="text-gray-600">
                  All certificates are securely stored and cannot be altered once issued.
                </p>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                <div className="w-12 h-12 bg-verify-blue/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-verify-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-verify-blue">
                  Secure Management
                </h3>
                <p className="text-gray-600">
                  Administrators can issue, revoke, and manage certificates with full audit trails.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-verify-blue text-white py-8">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} />
                <span className="font-bold text-lg">CertVerify</span>
              </div>
              <p className="text-blue-100">
                Secure certificate verification platform for educational institutions and professionals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white">Home</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">About Us</a></li>
                <li><Link to="/admin" className="text-blue-100 hover:text-white">Admin Panel</Link></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <address className="not-italic text-blue-100">
                <p>Email: support@certverify.example</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Verification St, Suite 101</p>
              </address>
            </div>
          </div>
          <div className="border-t border-blue-700/50 mt-8 pt-6 text-center text-sm text-blue-200">
            &copy; {new Date().getFullYear()} CertVerify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
