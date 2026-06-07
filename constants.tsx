
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'tous', name: 'Tous les produits', icon: 'fa-layer-group' },
  { id: 'hommes', name: 'Hommes', icon: 'fa-person' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Ensemble Fashion 2 Pièces - Gris",
    price: 10000,
    originalPrice: 12500,
    category: "hommes",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop", // Placeholder représentatif du premier article
    rating: 4.9,
    reviews: 24,
    brand: "Fashion",
    description: "Un ensemble gris 2 pièces (T-shirt et short) confortable et stylé, idéal pour les sorties décontractées."
  },
  {
    id: 2,
    name: "Ensemble Sport 'A' 2 Pièces - Bleu",
    price: 12000,
    originalPrice: 15000,
    category: "hommes",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop", // Placeholder représentatif du deuxième article
    rating: 4.8,
    reviews: 18,
    brand: "Sport Style",
    description: "Ensemble bleu électrique avec logo 'A' blanc, comprenant un T-shirt oversize et son short assorti."
  },
  {
    id: 3,
    name: "Ensemble Dragon 3D - Rouge & Noir",
    price: 15000,
    originalPrice: 18000,
    category: "hommes",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", // Placeholder représentatif du troisième article
    rating: 5.0,
    reviews: 42,
    brand: "Dragon Myth",
    description: "Design audacieux avec impression dragon 3D sur fond noir et rouge. Set complet T-shirt et short."
  }
];
