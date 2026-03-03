import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, User, SlidersHorizontal, X, Plus, Minus, Trash2, ArrowRight, ChevronDown } from 'lucide-react';

// --- RELIABLE HIGH-RES DATA ---
const categories = ['Necklaces', 'Rings', 'Earrings', 'Bracelets'];

const products = [
  { id: 1, name: 'Sapphire Drop Necklace', price: 1250, type: 'Necklaces', image: 'https://images.unsplash.com/photo-1717596224524-da0362396d70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FwcGhpcmUlMjBkcm9wJTIwbmVja2xhY2V8ZW58MHwxfDB8fHwy' },
  { id: 2, name: 'Diamond Tennis Choker', price: 3400, type: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Rose Gold Pearl Pendant', price: 850, type: 'Necklaces', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Solitaire Engagement Ring', price: 4200, type: 'Rings', image: 'https://media.istockphoto.com/id/1278589747/photo/single-solitaire-diamond-wedding-ring-in-4-prong-setting-yellow-gold-front-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=EdgogxVwC-ZqRamxxoV5jAcd6O8ohhrndjVjpjgHJGY=' },
  { id: 5, name: 'Vintage Emerald Band', price: 1800, type: 'Rings', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Platinum Halo Ring', price: 2900, type: 'Rings', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800' },
  { id: 7, name: 'Crystal Drop Earrings', price: 650, type: 'Earrings', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=800' },
  { id: 8, name: 'Gold Hoop Classics', price: 450, type: 'Earrings', image: 'https://media.istockphoto.com/id/2167059394/photo/elegant-gold-bracelet-with-intricate-patterns-on-a-dark-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wobidr4-3RiPnSy94ZfJ-IQp0KbGse5i48dk2qLZ10w=' },
  { id: 9, name: 'Diamond Tennis Bracelet', price: 5600, type: 'Bracelets', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800' }, 
];

// --- CUSTOM ELEGANT DROPDOWN COMPONENT ---
const CustomDropdown = ({ value, options, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/20 hover:bg-white/80 transition-all text-left"
      >
        <span className={value === 'All' ? 'text-slate-400' : 'text-slate-800'}>
          {value === 'All' ? placeholder : value}
        </span>
        {Icon ? <Icon className="w-4 h-4 text-slate-400" /> : <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-2xl border border-white/50 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-1"
          >
            <div 
              onClick={() => { onChange('All'); setIsOpen(false); }}
              className={`px-5 py-3 cursor-pointer transition-colors ${value === 'All' ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              {placeholder}
            </div>
            {options.map(opt => (
              <div 
                key={opt} onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`px-5 py-3 cursor-pointer transition-colors ${value === opt ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- QUICK VIEW MODAL ---
const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[2rem] overflow-hidden shadow-2xl max-w-5xl w-full flex flex-col md:flex-row relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm group">
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="md:w-1/2 h-80 md:h-[600px] relative overflow-hidden bg-slate-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-slate-500 uppercase border border-slate-200 rounded-full w-max">
            {product.type}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 leading-tight">{product.name}</h2>
          <p className="text-2xl text-slate-600 mb-8 font-light tracking-wide">₹{product.price.toLocaleString()}</p>
          
          <div className="space-y-4 mb-10 text-slate-500 font-light leading-relaxed">
            <p>Meticulously crafted for the modern connoisseur, this exquisite piece from our {product.type} collection embodies timeless elegance.</p>
            <p>Designed to capture the light from every angle, it serves as a perfect statement piece or a cherished gift for a loved one.</p>
          </div>

          <button 
            onClick={() => { onAddToCart(product); onClose(); }}
            className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest text-sm uppercase hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AvirraJewels() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // New States for UX
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- LOGIC ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const globallyFilteredProducts = products.filter(p => {
    const matchesType = selectedType === 'All' || p.type === selectedType;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesPrice = true;
    if (priceRange === 'Under 1000') matchesPrice = p.price < 1000;
    if (priceRange === '1000-3000') matchesPrice = p.price >= 1000 && p.price <= 3000;
    if (priceRange === 'Over 3000') matchesPrice = p.price > 3000;
    return matchesType && matchesSearch && matchesPrice;
  });

  const handleClearFilters = () => { setSearchQuery(''); setSelectedType('All'); setPriceRange('All'); };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.qty, 0);

  // Dynamic styling based on scroll position
  const navTextColor = scrolled ? 'text-slate-900' : 'text-white';
  const navIconColor = scrolled ? 'text-slate-800 hover:text-slate-500' : 'text-white hover:text-white/70';

  // --- ANIMATIONS ---
  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
  };

  const menuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-slate-200">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => setIsMenuOpen(true)} className={`p-2 -ml-2 transition-colors ${navIconColor}`}>
              <Menu className="w-6 h-6" />
            </button>
            <div className={`text-3xl tracking-[0.2em] font-serif font-medium absolute left-1/2 -translate-x-1/2 transition-colors duration-500 ${navTextColor}`}>
              AVIRRA
            </div>
            <div className="flex items-center gap-4">
              <button className={`p-2 hidden sm:block transition-colors ${navIconColor}`}><User className="w-5 h-5" /></button>
              <button onClick={() => setIsCartOpen(true)} className={`p-2 relative group transition-colors ${navIconColor}`}>
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className={`absolute top-1 right-1 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${scrolled ? 'bg-slate-900 text-white border-white' : 'bg-white text-slate-900 border-transparent'}`}>
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDE MENU DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" />
            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 left-0 h-full w-full sm:w-96 bg-white/95 backdrop-blur-2xl shadow-2xl z-50 flex flex-col border-r border-white/50">
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                <span className="font-serif tracking-widest text-xl">MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col p-8 space-y-8 font-serif text-2xl">
                {['Home', 'Latest Collections', 'Bridal', 'Our Story', 'Contact'].map((item) => (
                  <a key={item} href="#" className="group flex items-center gap-4 text-slate-600 hover:text-slate-900 transition-colors">
                    <span className="w-0 h-[1px] bg-slate-900 group-hover:w-8 transition-all duration-300"></span>
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" />
            <motion.div variants={drawerVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 right-0 h-full w-full sm:w-[28rem] bg-white/95 backdrop-blur-2xl shadow-2xl z-50 flex flex-col border-l border-white/50">
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                <span className="font-serif tracking-widest text-xl">YOUR CART ({cartItemCount})</span>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <ShoppingBag className="w-12 h-12 opacity-50" />
                    <p>Your collection is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-slate-900">{item.name}</h4>
                          <p className="text-slate-500 text-sm mt-1">₹{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-3 bg-slate-50 rounded-full px-3 py-1">
                            <button onClick={() => updateCartQty(item.id, -1)} className="text-slate-400 hover:text-slate-900"><Minus className="w-4 h-4" /></button>
                            <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="text-slate-400 hover:text-slate-900"><Plus className="w-4 h-4" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-white/50">
                  <div className="flex justify-between items-center mb-6 text-lg font-serif">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-900">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest text-sm uppercase hover:bg-slate-800 hover:shadow-xl transition-all duration-300">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/herobg.png" 
            alt="Luxury Jewelry Background" 
            className="w-full h-full object-cover object-center scale-105 animate-slow-pan"
          />
          {/* Enhanced gradient overlay to ensure perfect text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/60 mix-blend-multiply"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
            Elegance <span className="italic font-light">Redefined.</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
            Discover our meticulously crafted collection of fine jewelry, designed for life's most precious and unforgettable moments.
          </p>
          <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="group bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full tracking-widest text-sm uppercase hover:bg-white hover:text-slate-900 transition-all duration-500 flex items-center gap-3 mx-auto">
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* ADVANCED SEARCH & FILTER BAR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-10 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white/85 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" placeholder="Search our collections..." 
              className="w-full pl-14 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/20 hover:bg-white/80 transition-all placeholder:text-slate-400"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-56 z-20">
            <CustomDropdown 
              value={selectedType} 
              options={categories} 
              onChange={setSelectedType} 
              placeholder="All Categories" 
              icon={SlidersHorizontal}
            />
          </div>
          
          <div className="w-full md:w-56 z-10">
            <CustomDropdown 
              value={priceRange} 
              options={['Under 1000', '1000-3000', 'Over 3000']} 
              onChange={setPriceRange} 
              placeholder="Any Price" 
              icon={SlidersHorizontal}
            />
          </div>
        </motion.div>
      </div>

      {/* CATEGORY SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32 min-h-[50vh]">
        {globallyFilteredProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-2xl font-serif text-slate-900">No pieces found</h3>
            <p className="text-slate-500 max-w-md mx-auto">We couldn't find any jewelry matching your exact criteria. Try adjusting your search or filters.</p>
            <button onClick={handleClearFilters} className="mt-4 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all font-medium text-sm tracking-wide">
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          categories.map((category) => {
            const categoryProducts = globallyFilteredProducts.filter(p => p.type === category);
            if (categoryProducts.length === 0) return null;

            return (
              <section key={category} className="space-y-12">
                <div className="flex items-end justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-4xl font-serif text-slate-900">{category}</h2>
                  <a href="#" className="text-sm font-medium tracking-widest text-slate-500 hover:text-slate-900 transition-colors uppercase group flex items-center gap-2">
                    View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence>
                    {categoryProducts.map((product, index) => (
                      <motion.div 
                        key={product.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group cursor-pointer flex flex-col"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white mb-6 shadow-sm border border-slate-100">
                          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                            <button onClick={() => setSelectedProduct(product)} className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 bg-white/95 text-slate-900 px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase shadow-2xl hover:bg-slate-900 hover:text-white">
                              Quick View
                            </button>
                          </div>
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                        </div>
                        <div className="text-center space-y-2 flex-1">
                          <h3 className="text-lg font-medium text-slate-900 font-serif">{product.name}</h3>
                          <p className="text-slate-500 tracking-wide">₹{product.price.toLocaleString()}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* NEW CRAFTSMANSHIP SECTION */}
      <section className="bg-slate-900 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=2000" alt="Jewelry Craftsmanship" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="text-sm tracking-[0.3em] text-slate-300 mb-6 uppercase">Our Heritage</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight max-w-3xl">The Art of <br/> Uncompromising Quality.</h2>
          <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-12">
            Every piece of Avirra jewelry is a testament to generations of master craftsmanship. We source only the most ethically responsible materials, resulting in creations that transcend time and trends.
          </p>
          <button className="border border-white/50 px-10 py-4 rounded-full tracking-widest text-sm uppercase hover:bg-white hover:text-slate-900 transition-all duration-300">
            Discover Our Process
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
            <div>
              <h2 className="text-3xl font-serif text-slate-900 tracking-widest mb-6">AVIRRA</h2>
              <p className="font-light text-slate-500 max-w-sm mx-auto md:mx-0">
                Preserving timeless beauty in every piece. Elevate your everyday with Avirra Jewels.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="font-serif text-lg text-slate-900 mb-2">Customer Care</h4>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Contact Us</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Shipping & Returns</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Care Guide</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="font-serif text-lg text-slate-900 mb-2">The Brand</h4>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Our Story</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Sustainability</a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Boutiques</a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Avirra Jewels. All rights reserved.</div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* RENDER MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}