
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AiShopper from './components/AiShopper';
import CheckoutModal from './components/CheckoutModal';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';

const MERCHANT_NUMBER = "2250141923396";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('tous');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'tous' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    setCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (formData: any) => {
    const message = `🛍️ *NOUVELLE COMMANDE - AFRISTYLE*\n\n` +
      `📦 *Produit:* ${checkoutProduct?.name}\n` +
      `💰 *Prix:* ${checkoutProduct?.price.toLocaleString()} FCFA\n` +
      `👤 *Client:* ${formData.firstName} ${formData.lastName}\n` +
      `📏 *Taille:* ${formData.size}\n` +
      `📍 *Lieu de livraison:* ${formData.location}\n` +
      `💳 *Moyen de paiement:* ${formData.paymentMethod === 'wave' ? 'Wave' : 'Mobile Money'}\n\n` +
      `_Veuillez confirmer la réception du paiement pour lancer l'expédition._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${MERCHANT_NUMBER}?text=${encodedMessage}`;

    setIsCheckoutOpen(false);
    alert(`Paiement réussi ! Votre commande pour "${checkoutProduct?.name}" est confirmée. Redirection vers WhatsApp pour notifier le vendeur...`);
    window.open(whatsappUrl, '_blank');
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchTerm}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar simplifiée */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-star text-orange-500"></i> NOUVEAUTÉS
              </h2>
              <p className="text-sm text-gray-500 mb-6">Découvrez nos ensembles exclusifs 2 pièces, sélectionnés pour votre style.</p>
              
              <div className="border-t pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <i className="fa-solid fa-shield-check text-green-500"></i> Paiement sécurisé
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="fa-solid fa-truck-fast text-orange-500"></i> Livraison 24h/48h
                </div>
              </div>
            </div>
          </aside>

          {/* Liste des articles demandés */}
          <section className="flex-grow">
            <div className="mb-8 flex items-baseline justify-between border-b pb-4">
              <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Nos Ensembles Exclusifs</h1>
              <span className="text-gray-400 font-bold">{filteredProducts.length} Articles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t-4 border-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-orange-500 font-black text-3xl mb-2">AFRISTYLE</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8">La boutique officielle pour vos ensembles 2 pièces premium en Côte d'Ivoire.</p>
          <div className="flex justify-center gap-6 mb-8">
            <i className="fa-brands fa-whatsapp text-2xl hover:text-green-400 cursor-pointer"></i>
            <i className="fa-brands fa-instagram text-2xl hover:text-pink-400 cursor-pointer"></i>
            <i className="fa-brands fa-facebook text-2xl hover:text-blue-400 cursor-pointer"></i>
          </div>
          <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
            © 2024 AfriStyle - Service Client: 01 41 92 33 96
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQty}
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        product={checkoutProduct} 
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
      />

      <AiShopper products={MOCK_PRODUCTS} />
    </div>
  );
};

export default App;
