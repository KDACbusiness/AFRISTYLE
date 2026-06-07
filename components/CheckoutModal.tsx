
import React, { useState } from 'react';
import { Product } from '../types';

interface CheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    size: 'M',
    location: '',
    paymentMethod: 'wave'
  });

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-orange-500 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black">FINALISER L'ACHAT</h2>
            <p className="text-orange-100 text-sm">Produit: {product.name}</p>
          </div>
          <button onClick={onClose} className="hover:bg-orange-600 p-2 rounded-full transition">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom</label>
              <input 
                required
                type="text" 
                className="w-full border-gray-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Votre nom"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prénom</label>
              <input 
                required
                type="text" 
                className="w-full border-gray-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Taille</label>
            <select 
              className="w-full border-gray-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              value={formData.size}
              onChange={(e) => setFormData({...formData, size: e.target.value})}
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lieu de livraison</label>
            <input 
              required
              type="text" 
              className="w-full border-gray-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Ex: Abidjan, Cocody Angré"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Moyen de paiement</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'wave'})}
                className={`flex items-center justify-center gap-2 border-2 py-3 rounded-xl transition-all ${formData.paymentMethod === 'wave' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
              >
                <i className="fa-solid fa-water"></i> Wave
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'mobile_money'})}
                className={`flex items-center justify-center gap-2 border-2 py-3 rounded-xl transition-all ${formData.paymentMethod === 'mobile_money' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
              >
                <i className="fa-solid fa-mobile-screen"></i> Mobile Money
              </button>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-between items-center mb-4 text-gray-700">
              <span className="font-medium">Total à payer:</span>
              <span className="text-xl font-black text-orange-600">{product.price.toLocaleString()} FCFA</span>
            </div>
            <button 
              type="submit"
              className="w-full bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-orange-700 transition transform hover:-translate-y-1"
            >
              CONFIRMER L'ACHAT
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
