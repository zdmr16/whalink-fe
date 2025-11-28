import React, { useState } from 'react';
import { X, QrCode, Smartphone, Loader2, Check } from 'lucide-react';
import { api } from '../../services/mockApi';

interface AddAccountModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ onClose, onComplete }) => {
  const [method, setMethod] = useState<'qr' | 'code'>('code');
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateCode = async () => {
    if (!phone || !name) return;
    setLoading(true);
    try {
      // Simulate API call to get code
      const code = await api.generatePairingCode(phone);
      setPairingCode(code);
      setStep(2);
      
      // Simulate the user confirming on their phone after 5 seconds
      setTimeout(async () => {
        await api.addAccount(phone, name);
        onComplete();
      }, 8000); // Long delay to simulate user action
    } finally {
      setLoading(false);
    }
  };

  const handleQRSimulate = () => {
    setLoading(true);
    setTimeout(async () => {
       await api.addAccount('+1 555 999 9999', 'New QR Device');
       setLoading(false);
       onComplete();
    }, 4000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Add WhatsApp Account</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Method Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
            <button 
              onClick={() => setMethod('code')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2
              ${method === 'code' ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Smartphone size={16} />
              <span>Pairing Code</span>
            </button>
            <button 
               onClick={() => setMethod('qr')}
               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2
               ${method === 'qr' ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <QrCode size={16} />
              <span>QR Code</span>
            </button>
          </div>

          {method === 'code' && (
            <div className="space-y-4">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="e.g. Sales Support"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="+1 555 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button 
                    disabled={!phone || !name || loading}
                    onClick={handleGenerateCode}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                    <span>Generate Code</span>
                  </button>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
                    <p className="text-sm text-gray-500 mb-2">Enter this code in WhatsApp:</p>
                    <div className="text-3xl font-mono font-bold text-gray-800 tracking-wider">
                      {pairingCode}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex items-center space-x-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">1</div>
                        <span>Open WhatsApp on your phone</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">2</div>
                        <span>Tap Menu &gt; Linked Devices &gt; Link a Device</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">3</div>
                        <span>Select "Link with phone number"</span>
                     </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-green-600 animate-pulse">
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-sm font-medium">Waiting for connection...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {method === 'qr' && (
             <div className="flex flex-col items-center justify-center space-y-6 py-4">
                {loading ? (
                   <div className="text-center">
                      <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                         <div className="text-center">
                            <Check size={48} className="text-green-500 mx-auto mb-2" />
                            <p className="font-bold text-gray-800">Connected!</p>
                         </div>
                      </div>
                      <p className="text-green-600 font-medium">Redirecting...</p>
                   </div>
                ) : (
                  <>
                     <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                        <img src="https://picsum.photos/250" alt="QR Code" className="w-64 h-64 rounded bg-gray-200 object-cover grayscale" />
                     </div>
                     <p className="text-center text-sm text-gray-500 max-w-xs">
                        Open WhatsApp on your phone and scan the QR code to connect.
                     </p>
                     <button onClick={handleQRSimulate} className="text-sm text-blue-600 hover:underline">
                        Simulate Scan (Demo)
                     </button>
                  </>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};