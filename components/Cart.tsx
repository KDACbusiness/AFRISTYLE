
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-4 border-b flex items-center justify-between bg-orange-500 text-white">
          <h2 className="text-xl font-bold">Votre Panier ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-orange-600 rounded-full transition">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <i className="fa-solid fa-cart-shopping text-6xl text-gray-200"></i>
              <p className="text-gray-500">Votre panier est vide.</p>
              <button 
                onClick={onClose}
                className="bg-orange-500 text-white px-6 py-2 rounded font-bold hover:bg-orange-600"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-2 border rounded-lg group">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
                <div className="flex-grow">
                  <h4 className="font-medium text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                  <p className="text-orange-600 font-bold">{item.price.toLocaleString()} FCFA</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total:</span>
              <span className="text-2xl font-black text-gray-900">{total.toLocaleString()} FCFA</span>
            </div>
            <button className="w-full bg-orange-500 text-white py-4 rounded-lg font-black text-lg hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2">
              FINALISER LA COMMANDE <i className="fa-solid fa-arrow-right"></i>
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-2">Paiement sécurisé par Orange Money, Wave ou Carte Bancaire.</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Cart;
