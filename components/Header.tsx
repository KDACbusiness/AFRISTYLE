
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onSearch }) => {
  return (
    <header className="sticky top-0 z-40 bg-orange-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="bg-white p-2 rounded-lg text-orange-600 font-bold text-xl">AS</div>
          <span className="text-2xl font-black tracking-tighter hidden sm:inline">AFRISTYLE</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Chercher un produit, une marque, une catégorie..."
            className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 p-1.5 rounded-md hover:bg-orange-700 transition">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-sm cursor-pointer group">
            <span className="flex items-center gap-1 group-hover:text-orange-100">
              <i className="fa-regular fa-user text-lg"></i> Se connecter
            </span>
          </div>
          
          <div className="hidden md:flex flex-col text-sm cursor-pointer group">
            <span className="flex items-center gap-1 group-hover:text-orange-100">
              <i className="fa-regular fa-circle-question text-lg"></i> Aide
            </span>
          </div>

          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 hover:bg-orange-600 p-2 rounded-md transition"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            <span className="hidden sm:inline font-bold">Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-orange-500">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
