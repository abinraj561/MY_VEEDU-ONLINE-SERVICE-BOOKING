import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { DeviceFrame } from './components/common/DeviceFrame';
import { PropertyOverview } from './components/customer/PropertyOverview';
import { ProofOfWorkModal } from './components/customer/ProofOfWorkModal';
import { EmergencyRequestModal } from './components/customer/EmergencyRequestModal';
import { AIInspectionReportModal } from './components/customer/AIInspectionReportModal';
import { ServiceBookingModal } from './components/customer/ServiceBookingModal';
import { SubscriptionPlansModal } from './components/customer/SubscriptionPlansModal';
import { PreArrivalConcierge } from './components/customer/PreArrivalConcierge';
import { AddPropertyModal } from './components/customer/AddPropertyModal';
import { LandManagementView } from './components/customer/LandManagementView';
import { WorkerAppView } from './components/worker/WorkerAppView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { ShieldCheck, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { role, toastMessage, activeProperty } = useApp();

  // Modal Visibility States
  const [isPowModalOpen, setIsPowModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAIReportModalOpen, setIsAIReportModalOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPreArrivalModalOpen, setIsPreArrivalModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [customerActiveSubView, setCustomerActiveSubView] = useState<'property' | 'land'>('property');
  const [mobileTab, setMobileTab] = useState('home');

  const handleOpenPow = (_powId: string) => {
    setIsPowModalOpen(true);
  };

  const handleMobileTabChange = (tab: string) => {
    setMobileTab(tab);
    if (tab === 'land') {
      setCustomerActiveSubView('land');
    } else if (tab === 'home') {
      setCustomerActiveSubView('property');
    }
  };

  return (
    <div className="min-h-screen flex flex-col kerala-mesh-bg text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Universal Top Header */}
      <Header
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenAIReport={() => setIsAIReportModalOpen(true)}
        onOpenAddProperty={() => setIsAddPropertyModalOpen(true)}
      />

      {/* Main Content Body inside Dual Device Viewport Frame */}
      <main className="flex-1 flex flex-col">
        <DeviceFrame
          activeTab={mobileTab}
          onTabChange={handleMobileTabChange}
          onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          onOpenServices={() => setIsServicesModalOpen(true)}
          onOpenAI={() => setIsAIReportModalOpen(true)}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
            
            {/* View Switching based on Persona Role */}
            {role === 'customer' && (
              <>
                {/* View Switcher for Residential vs Agricultural Land */}
                {activeProperty.type === 'land' || customerActiveSubView === 'land' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCustomerActiveSubView('property')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                      >
                        ← Back to Residential Properties
                      </button>
                    </div>
                    <LandManagementView
                      onOpenBooking={() => setIsServicesModalOpen(true)}
                    />
                  </div>
                ) : (
                  <PropertyOverview
                    onOpenPowModal={handleOpenPow}
                    onOpenServicesModal={() => setIsServicesModalOpen(true)}
                    onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
                    onOpenAIReportModal={() => setIsAIReportModalOpen(true)}
                    onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
                    onOpenPreArrivalModal={() => setIsPreArrivalModalOpen(true)}
                    onOpenAddPropertyModal={() => setIsAddPropertyModalOpen(true)}
                    onOpenLandManagement={() => setCustomerActiveSubView('land')}
                  />
                )}
              </>
            )}

            {role === 'worker' && <WorkerAppView />}

            {role === 'admin' && <AdminDashboardView />}

          </div>
        </DeviceFrame>
      </main>

      {/* Footer Branding (Desktop View) */}
      <footer className="py-6 border-t border-emerald-950/80 bg-[#09100e]/90 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">MyVeedu</span>
            <span>•</span>
            <span>“Your home is in Kerala. You don’t have to be.”</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Kozhikode</span>
            <span>Kannur</span>
            <span>Thalassery</span>
            <span>Vadakara</span>
            <span>Wayanad</span>
            <span>Malappuram</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProofOfWorkModal
        isOpen={isPowModalOpen}
        onClose={() => setIsPowModalOpen(false)}
      />

      <EmergencyRequestModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <AIInspectionReportModal
        isOpen={isAIReportModalOpen}
        onClose={() => setIsAIReportModalOpen(false)}
      />

      <ServiceBookingModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
      />

      <SubscriptionPlansModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />

      <PreArrivalConcierge
        isOpen={isPreArrivalModalOpen}
        onClose={() => setIsPreArrivalModalOpen(false)}
      />

      <AddPropertyModal
        isOpen={isAddPropertyModalOpen}
        onClose={() => setIsAddPropertyModalOpen(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 max-w-md bg-[#132620] border-2 border-emerald-400 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold leading-snug">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
