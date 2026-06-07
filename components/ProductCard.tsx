
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative border border-gray-100 h-full">
      {discount > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </span>
      )}
      
      <div className="relative overflow-hidden aspect-[4/5]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-white text-orange-500 font-bold py-2 rounded shadow-lg hover:bg-orange-50 transition-all duration-300"
          >
            PANIER
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">{product.brand}</p>
        <h3 className="text-gray-800 text-sm mb-1 truncate font-medium group-hover:text-orange-500 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">{product.price.toLocaleString()} FCFA</span>
          </div>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through">{product.originalPrice.toLocaleString()} FCFA</span>
          )}
          
          <div className="flex items-center gap-1 mt-1 mb-3">
            <div className="flex text-orange-400 text-[9px]">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-200'}`}></i>
              ))}
            </div>
            <span className="text-[9px] text-gray-400">({product.reviews})</span>
          </div>

          <button 
            onClick={() => onBuyNow(product)}
            className="w-full bg-orange-500 text-white font-black text-xs py-2.5 rounded hover:bg-orange-600 transition-colors shadow-sm uppercase"
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
