import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property, PropertyType } from '../../types';
import {
  X,
  Home,
  MapPin,
  Key,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ isOpen, onClose }) => {
  const { addProperty } = useApp();

  const [name, setName] = useState('');
  const [type, setType] = useState<PropertyType>('villa');
  const [city, setCity] = useState<Property['city']>('Kozhikode');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(4);
  const [sqFt, setSqFt] = useState(2800);
  const [landCents, setLandCents] = useState(15);
  const [keyAccess, setKeyAccess] = useState('Master Lockbox on Porch (Code: 5821)');
  const [emergencyContact, setEmergencyContact] = useState('Anil Kumar (Brother) - +91 98471 88990');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      name,
      type,
      tagline: `${type === 'land' ? `${landCents} Cents Plot` : `${bedrooms} BHK ${type.toUpperCase()}`} in ${city}`,
      location: `${address.split(',')[0] || 'Central'}, ${city}`,
      city,
      district: city,
      address,
      geoCoordinates: '11.2588° N, 75.7804° E',
      coverImage:
        type === 'land'
          ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
          : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      ],
      healthScore: 92,
      status: 'healthy',
      lastInspectionDate: 'Pending Initial Verification',
      nextInspectionDate: 'Scheduled in 3 Days',
      subscriptionPlan: 'Standard',
      dedicatedManager: {
        name: 'Vipin Chandran',
        phone: '+91 98470 12345',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        designation: `Regional Property Lead (${city})`
      },
      keyAccessInfo: keyAccess,
      emergencyContact: {
        name: emergencyContact.split('-')[0]?.trim() || 'Family Contact',
        relation: 'Local Contact',
        phone: emergencyContact.split('-')[1]?.trim() || '+91 98470 00000'
      },
      specs: {
        bedrooms: type === 'land' ? undefined : bedrooms,
        builtAreaSqFt: type === 'land' ? undefined : sqFt,
        landCents,
        waterSource: 'Automatic Well & KWA',
        powerBackup: 'Sine Wave Inverter',
        cctvOnline: true,
        monsoonReadinessScore: 90
      }
    };

    addProperty(newProp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e1b17] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#13231e] border-b border-emerald-900/40 flex items-start justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-700/60">
              Add New Property
            </span>
            <h2 className="text-xl font-black text-white mt-1 font-['Outfit']">
              Register Kerala Home or Land
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#0c1613] text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs no-scrollbar">
          
          <div>
            <label className="text-slate-300 font-bold block mb-1">Property Name / House Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Heritage Teak Villa, Kozhikode"
              className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="apartment">Apartment / Flat</option>
                <option value="land">Agricultural Land / Plot</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">City / Region (Kerala)</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as Property['city'])}
                className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Kozhikode">Kozhikode (Calicut)</option>
                <option value="Kannur">Kannur</option>
                <option value="Thalassery">Thalassery</option>
                <option value="Vadakara">Vadakara</option>
                <option value="Wayanad">Wayanad</option>
                <option value="Malappuram">Malappuram</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Full Postal Address / Landmark</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="E.g. Beach Road, Near Corporation Office, Kozhikode, 673001"
              className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {type !== 'land' && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white"
                  min="1"
                />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Built Sq.Ft</label>
                <input
                  type="number"
                  value={sqFt}
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Land (Cents)</label>
                <input
                  type="number"
                  value={landCents}
                  onChange={(e) => setLandCents(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 font-bold block mb-1">Key & Lockbox Information</label>
            <input
              type="text"
              value={keyAccess}
              onChange={(e) => setKeyAccess(e.target.value)}
              placeholder="E.g. Porch Lockbox PIN 8492"
              className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Local Relative / Emergency Point of Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Name - Phone number"
              className="w-full p-2.5 rounded-xl bg-[#0c1613] border border-emerald-900/40 text-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all"
            >
              Add Property & Assign Regional Guardian
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
