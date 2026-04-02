import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, User, SlidersHorizontal, X, Plus, Minus, Trash2, ArrowRight, ChevronDown, MessageCircle, Edit2, Save, Info } from 'lucide-react';

// --- CATEGORIES ---
const categories = ['Jewel Sets', 'Necklaces', 'Earrings'];

// --- PRODUCTS DATA WITH INLINE IMAGES ---
const products = [
  { 
    id: 1, 
    name: 'Alloy gold jewel set', 
    price: 1000, 
    originalPrice: 1400, 
    type: 'Jewel Sets', 
    images: [
      '/alloyjewel1000.jpeg'
    ] 
  },
  { 
    id: 2, 
    name: 'RUBANS Brass gold plated Red|Green Jewel set', 
    price: 1050, 
    originalPrice: 1500, 
    type: 'Jewel Sets', 
    images: [
      '/RUBANS1.jpeg',
      '/RUBANS2.jpeg',
      '/RUBANS3.jpeg',
      '/RUBANS4.jpeg'
    ] 
  },
  { 
    id: 3, 
    name: 'YIMBLI Brass gold plated Jewel set', 
    price: 800, 
    originalPrice: 1200, 
    type: 'Jewel Sets', 
    images: [
      '/YIMBLI.jpeg'
    ] 
  },
  { 
    id: 4, 
    name: 'Pearl Jewel set', 
    price: 600, 
    originalPrice: 850, 
    type: 'Jewel Sets', 
    images: [
      '/pearljewelset.jpeg'
    ] 
  },
  { 
    id: 5, 
    name: 'Gold plated Jewel set', 
    price: 900, 
    originalPrice: 1300, 
    type: 'Jewel Sets', 
    images: [
      '/goldplated900.jpeg'
    ] 
  },
  { 
    id: 6, 
    name: 'RUBANS Gold plated Jewel set', 
    price: 750, 
    originalPrice: 1100, 
    type: 'Jewel Sets', 
    images: [
      '/RUBANSjewelset750.jpeg',
      '/RUBANSjewelset750earrings.jpeg'
    ] 
  },
  { 
    id: 7, 
    name: 'Gold plated temple jewellery set', 
    price: 1300, 
    originalPrice: 1800, 
    type: 'Jewel Sets', 
    images: [
      '/templejewel.jpeg'
    ] 
  },
  { 
    id: 8, 
    name: 'Brass Gold Multicolor Jewel set', 
    price: 1900, 
    originalPrice: 2500, 
    type: 'Jewel Sets', 
    images: [
      '/brassgoldmulticolorjewelset1900.jpeg' 
   ] 
  },
  { 
    id: 9, 
    name: 'RUBANS Multicolour Jewel set', 
    price: 2000, 
    originalPrice: 2800, 
    type: 'Jewel Sets', 
    images: [
      '/RUBANSjewelset2000.jpeg'
    ] 
  },
  { 
    id: 10, 
    name: 'Brass gold plated necklace', 
    price: 800, 
    originalPrice: 1150, 
    type: 'Necklaces', 
    images: [
      '/necklace800.jpeg'
    ] 
  },
  { 
    id: 11, 
    name: 'RUBANS Gold plated Jewel set', 
    price: 1050, 
    originalPrice: 1450, 
    type: 'Jewel Sets', 
    images: [
      '/RUBANS1050red.jpeg',
      '/RUBANS1050green.jpeg'   
    ] 
  },
  { 
    id: 12, 
    name: 'RUBANS Gold plated Jewel set', 
    price: 1400, 
    originalPrice: 1900, 
    type: 'Jewel Sets', 
    images: [
      '/RUBANS14001.jpeg',
      '/RUBANS1400.jpeg'
    ] 
  },
  { 
    id: 13, 
    name: 'Gold plated Jewel set', 
    price: 1100, 
    originalPrice: 1600, 
    type: 'Jewel Sets', 
    images: [
      '/jewelset1100.jpeg'
    
    ] 
  },
  { 
    id: 14, 
    name: 'Gold plated Jewel set', 
    price: 2200, 
    originalPrice: 3000, 
    type: 'Jewel Sets', 
    images: [
      '/set2200.jpeg',
      '/set2200.jpeg'
    ] 
  },
  { 
    id: 15, 
    name: 'Ruby pink AD & white CZ studded ear cuff jhumka earrings', 
    price: 1700, 
    originalPrice: 2400, 
    type: 'Earrings', 
    images: [
      '/rd.jpeg',
      '/rd1.jpeg'
    ] 
  },
  { 
    id: 16, 
    name: 'Gold plated Jewel set', 
    price: 900, 
    originalPrice: 1250, 
    type: 'Jewel Sets', 
    images: [
      '/goldplatedjewelset900.jpeg',
      '/goldplatedjewelset9001.jpeg'
    ] 
  },
  { 
    id: 17, 
    name: 'Pearl Jewel set', 
    price: 500, 
    originalPrice: 750, 
    type: 'Jewel Sets', 
    images: [
      '/pearljewelset500.jpeg',
      '/pearljewelset5001.jpeg'
    ] 
  },
  { 
    id: 18, 
    name: 'Ruby pink & white Kundan lotus design ear cuffs', 
    price: 1000, 
    originalPrice: 1500, 
    type: 'Earrings', 
    images: [
      '/kundanlotuscuffs.jpeg',
      '/kundanlotuscuffs1.jpeg'
    ] 
  },
];

// --- CUSTOM ELEGANT DROPDOWN ---
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
            <div onClick={() => { onChange('All'); setIsOpen(false); }} className={`px-5 py-3 cursor-pointer transition-colors ${value === 'All' ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              {placeholder}
            </div>
            {options.map(opt => (
              <div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className={`px-5 py-3 cursor-pointer transition-colors ${value === opt ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- RESPONSIVE PRODUCT PAGE/MODAL ---
const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [mainImage, setMainImage] = useState(product?.images[0]);
  
  useEffect(() => { if(product) setMainImage(product.images[0]); }, [product]);

  if (!product) return null;

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      // On mobile: pure white background. On desktop: darkened backdrop.
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center bg-white md:bg-slate-900/70 md:backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        // On mobile: full width, full height, no rounded corners. On desktop: card style.
        className="bg-white w-full max-w-6xl flex flex-col lg:flex-row relative min-h-screen md:min-h-0 md:max-h-[90vh] md:rounded-[2rem] md:shadow-2xl md:overflow-hidden md:border md:border-slate-200"
      >
        {/* Close Button - Stays absolute to scroll with content so it doesn't block text on mobile */}
        <button onClick={onClose} className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-md border border-slate-200 group">
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Left Side: Amazon/Flipkart Style Image Gallery */}
        <div className="lg:w-1/2 flex flex-col-reverse lg:flex-row p-4 md:p-6 lg:p-8 gap-4 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-100">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-24 shrink-0 no-scrollbar py-2 lg:py-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx} onClick={() => setMainImage(img)}
                className={`relative aspect-square w-20 lg:w-full rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${mainImage === img ? 'border-slate-900 shadow-md scale-95' : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image View */}
          <div className="flex-1 relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 mt-10 md:mt-0">
            {discountPercent > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-[#8B0000] text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full shadow-lg uppercase">
                {discountPercent}% OFF
              </div>
            )}
            <motion.img 
              key={mainImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
              src={mainImage} alt={product.name} className="w-full h-full object-cover object-center" 
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col md:overflow-y-auto">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-slate-500 uppercase border border-slate-200 rounded-full w-max">
            {product.type}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-4 leading-tight">{product.name}</h2>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-3xl font-medium text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <div className="space-y-4 mb-8 text-slate-600 font-light leading-relaxed">
            <p>Meticulously crafted for the modern connoisseur, this exquisite piece from our {product.type} collection embodies timeless elegance.</p>
            <p>Designed to capture the light from every angle, it serves as a perfect statement piece or a cherished gift for a loved one.</p>
          </div>

          {/* Shipping Note */}
          <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-10">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-900">Important Note:</span> Shipping and delivery charges are calculated separately based on your specific location and will be finalized via WhatsApp.
            </p>
          </div>

          <button 
            onClick={() => { onAddToCart(product); onClose(); }}
            className="w-full bg-slate-900 text-white py-4 lg:py-5 rounded-full tracking-widest text-sm uppercase hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-auto"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AvirraJewels() {
  // --- VIRTUAL ROUTING STATE ---
  const [currentView, setCurrentView] = useState('Home'); 

  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // --- CART & UX STATE ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- CHECKOUT & WHATSAPP STATE ---
  const [checkoutStep, setCheckoutStep] = useState('cart'); 
  const [isEditingCustomer, setIsEditingCustomer] = useState(true);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

  // Load customer data from Local Storage on mount
  useEffect(() => {
    const savedCustomer = localStorage.getItem('avirra_customer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
      setIsEditingCustomer(false); 
    }
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LOGIC ---
  const globallyFilteredProducts = products.filter(p => {
    const matchesView = currentView === 'Home' || p.type === currentView;
    const matchesType = selectedType === 'All' || p.type === selectedType;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesPrice = true;
    if (priceRange === 'Under 1000') matchesPrice = p.price < 1000;
    if (priceRange === '1000-3000') matchesPrice = p.price >= 1000 && p.price <= 3000;
    if (priceRange === 'Over 3000') matchesPrice = p.price > 3000;
    return matchesView && matchesType && matchesSearch && matchesPrice;
  });

  const handleClearFilters = () => { setSearchQuery(''); setSelectedType('All'); setPriceRange('All'); };

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleClearFilters();
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const updateCartQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item));
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.qty, 0);

  // --- WHATSAPP & LOCAL STORAGE LOGIC ---
  const handleSaveCustomer = () => {
    localStorage.setItem('avirra_customer', JSON.stringify(customer));
    setIsEditingCustomer(false);
  };

  const handleDeleteCustomer = () => {
    localStorage.removeItem('avirra_customer');
    setCustomer({ name: '', phone: '', address: '' });
    setIsEditingCustomer(true);
  };

  const sendWhatsAppOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in and save your delivery details first.");
      return setIsEditingCustomer(true);
    }
    
    let msg = `*New Order Request - Avirra Jewels* 💎\n\n`;
    msg += `*Customer Details:*\n👤 Name: ${customer.name}\n📞 Phone: ${customer.phone}\n📍 Address: ${customer.address}\n\n`;
    msg += `*Order Items:*\n`;
    cart.forEach(item => {
      msg += `▪️ ${item.qty}x ${item.name} - ₹${(item.price * item.qty).toLocaleString()}\n`;
    });
    msg += `\n*Subtotal: ₹${cartTotal.toLocaleString()}*\n_(Note: Shipping & delivery charges will be added based on location)_\n\nPlease confirm my order. Thank you!`;

    const businessPhone = "9182834127"; 
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${businessPhone}?text=${encodedMsg}`, '_blank');
  };

  const isDarkNav = scrolled || currentView !== 'Home';
  const navTextColor = isDarkNav ? 'text-slate-900' : 'text-white';
  const navIconColor = isDarkNav ? 'text-slate-800 hover:text-slate-500' : 'text-white hover:text-white/70';

  // --- ANIMATIONS ---
  const drawerVariants = { hidden: { x: '100%', opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }, exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } } };
  const menuVariants = { hidden: { x: '-100%', opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }, exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } } };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-slate-200">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isDarkNav ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => setIsMenuOpen(true)} className={`p-2 -ml-2 transition-colors ${navIconColor}`}>
              <Menu className="w-6 h-6" />
            </button>
            <div onClick={() => handleNavClick('Home')} className={`text-2xl md:text-3xl tracking-[0.2em] font-serif font-medium absolute left-1/2 -translate-x-1/2 transition-colors duration-500 cursor-pointer ${navTextColor}`}>
              AVIRRA
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className={`p-2 hidden sm:block transition-colors ${navIconColor}`}><User className="w-5 h-5" /></button>
              <button onClick={() => setIsCartOpen(true)} className={`p-2 relative group transition-colors ${navIconColor}`}>
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className={`absolute top-0 right-0 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${isDarkNav ? 'bg-slate-900 text-white border-white' : 'bg-[#8B0000] text-white border-transparent'}`}>
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
                <span className="font-serif tracking-widest text-xl">NAVIGATION</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col p-8 space-y-6 font-serif text-2xl">
                <button onClick={() => handleNavClick('Home')} className={`group flex items-center gap-4 transition-colors text-left ${currentView === 'Home' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                  <span className={`h-[1px] bg-slate-900 transition-all duration-300 ${currentView === 'Home' ? 'w-8' : 'w-0 group-hover:w-4'}`}></span> Home
                </button>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => handleNavClick(cat)} className={`group flex items-center gap-4 transition-colors text-left ${currentView === cat ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                    <span className={`h-[1px] bg-slate-900 transition-all duration-300 ${currentView === cat ? 'w-8' : 'w-0 group-hover:w-4'}`}></span> {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SHOPPING CART & CHECKOUT DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" />
            <motion.div variants={drawerVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 right-0 h-full w-full sm:w-[32rem] bg-white/95 backdrop-blur-2xl shadow-2xl z-50 flex flex-col border-l border-white/50">
              <div className="p-6 flex justify-between items-center border-b border-slate-100 bg-white/50">
                <span className="font-serif tracking-widest text-lg md:text-xl">
                  {checkoutStep === 'cart' ? `YOUR CART (${cartItemCount})` : 'CHECKOUT DETAILS'}
                </span>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 no-scrollbar">
                {checkoutStep === 'cart' ? (
                  cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                      <ShoppingBag className="w-12 h-12 opacity-50" />
                      <p>Your collection is empty.</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-start gap-3">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>Shipping & delivery charges are calculated separately based on your location during the WhatsApp checkout.</p>
                      </div>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100">
                          <img src={item.images[0]} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl" />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif text-slate-900 line-clamp-2 leading-tight">{item.name}</h4>
                              <p className="text-slate-500 text-sm mt-1">₹{item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center gap-2 md:gap-3 bg-slate-50 rounded-full px-2 py-1 border border-slate-100">
                                <button onClick={() => updateCartQty(item.id, -1)} className="text-slate-400 hover:text-slate-900 p-1"><Minus className="w-3 h-3 md:w-4 md:h-4" /></button>
                                <span className="text-xs md:text-sm font-medium w-4 text-center">{item.qty}</span>
                                <button onClick={() => updateCartQty(item.id, 1)} className="text-slate-400 hover:text-slate-900 p-1"><Plus className="w-3 h-3 md:w-4 md:h-4" /></button>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="text-red-300 hover:text-red-500 transition-colors p-2">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )
                ) : (
                  <div className="space-y-6">
                    <button onClick={() => setCheckoutStep('cart')} className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-4">
                      <ArrowRight className="w-4 h-4 rotate-180" /> Back to Cart
                    </button>
                    
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100 relative">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-lg text-slate-900">Delivery Details</h3>
                        {!isEditingCustomer && (
                          <div className="flex gap-2">
                            <button onClick={() => setIsEditingCustomer(true)} className="p-2 text-slate-400 hover:text-slate-900 bg-white rounded-full shadow-sm"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={handleDeleteCustomer} className="p-2 text-red-400 hover:text-red-600 bg-white rounded-full shadow-sm"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        )}
                      </div>

                      {isEditingCustomer ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Full Name</label>
                            <input type="text" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 outline-none transition-all text-sm" placeholder="Jane Doe" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">WhatsApp Number</label>
                            <input type="tel" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 outline-none transition-all text-sm" placeholder="+91 98765 43210" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Delivery Address</label>
                            <textarea value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} rows="3" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 outline-none transition-all resize-none text-sm" placeholder="Your full shipping address..." />
                          </div>
                          <button onClick={handleSaveCustomer} className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-900 py-3.5 rounded-xl hover:bg-slate-300 transition-colors font-medium">
                            <Save className="w-4 h-4" /> Save Details
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3 text-slate-700 bg-white p-5 rounded-xl border border-slate-100 text-sm">
                          <p className="flex items-center gap-3"><User className="w-4 h-4 text-slate-400" /> {customer.name}</p>
                          <p className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-slate-400" /> {customer.phone}</p>
                          <p className="flex items-start gap-3"><span className="w-4 h-4 mt-0.5 block text-slate-400">📍</span> {customer.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 md:p-6 border-t border-slate-100 bg-white/80 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-4 md:mb-6 text-lg font-serif">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-900 font-medium">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  {checkoutStep === 'cart' ? (
                    <button onClick={() => setCheckoutStep('checkout')} className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest text-sm uppercase hover:bg-slate-800 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={sendWhatsAppOrder} className="w-full bg-[#25D366] text-white py-4 rounded-full tracking-widest text-sm uppercase hover:bg-[#1ebd5a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 font-semibold">
                      <MessageCircle className="w-5 h-5" /> Confirm on WhatsApp
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONDITIONAL HERO SECTION */}
      {currentView === 'Home' && (
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 w-full h-full">
            <img src="/herobg.png" alt="Luxury Jewelry Background" className="w-full h-full object-cover object-center scale-105 animate-slow-pan" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/60 mix-blend-multiply"></div>
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
              Elegance <span className="italic font-light">Redefined.</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-10 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
              Discover our meticulously crafted collection of fine jewelry, designed for life's most precious and unforgettable moments.
            </p>
            <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="group bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 md:px-10 py-4 rounded-full tracking-widest text-xs md:text-sm uppercase hover:bg-white hover:text-slate-900 transition-all duration-500 flex items-center gap-3 mx-auto">
              Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </section>
      )}

      {/* PAGE HEADER FOR CATEGORIES */}
      {currentView !== 'Home' && (
        <div className="pt-32 pb-12 text-center border-b border-slate-100 bg-white px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900">{currentView}</h1>
          <p className="text-slate-500 mt-4 font-light tracking-wide">Explore our exclusive collection of {currentView.toLowerCase()}.</p>
        </div>
      )}

      {/* ADVANCED SEARCH & FILTER BAR */}
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 ${currentView === 'Home' ? '-mt-10' : 'mt-12'}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/85 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input type="text" placeholder="Search collections..." className="w-full pl-14 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/20 hover:bg-slate-100 transition-all placeholder:text-slate-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          
          <div className="w-full md:w-56 z-20">
            <CustomDropdown value={selectedType} options={categories} onChange={setSelectedType} placeholder="All Categories" icon={SlidersHorizontal} />
          </div>
          
          <div className="w-full md:w-56 z-10">
            <CustomDropdown value={priceRange} options={['Under 1000', '1000-3000', 'Over 3000']} onChange={setPriceRange} placeholder="Any Price" icon={SlidersHorizontal} />
          </div>
        </motion.div>
      </div>

      {/* PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 min-h-[50vh]">
        {globallyFilteredProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-2xl font-serif text-slate-900">No pieces found</h3>
            <p className="text-slate-500 max-w-md mx-auto">We couldn't find any jewelry matching your exact criteria.</p>
            <button onClick={handleClearFilters} className="mt-4 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-all font-medium text-sm tracking-wide">
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          categories.filter(cat => currentView === 'Home' || currentView === cat).map((category) => {
            const categoryProducts = globallyFilteredProducts.filter(p => p.type === category);
            if (categoryProducts.length === 0) return null;

            return (
              <section key={category} className="space-y-12">
                {currentView === 'Home' && (
                  <div className="flex items-end justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900">{category}</h2>
                    <button onClick={() => handleNavClick(category)} className="text-xs md:text-sm font-medium tracking-widest text-slate-500 hover:text-slate-900 transition-colors uppercase group flex items-center gap-1 md:gap-2">
                      View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  <AnimatePresence>
                    {categoryProducts.map((product, index) => {
                      const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                      
                      return (
                        <motion.div key={product.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group flex flex-col">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white mb-4 md:mb-6 shadow-sm border border-slate-100">
                            {/* Premium Discount Ribbon */}
                            {discountPercent > 0 && (
                              <div className="absolute top-4 left-4 z-20 bg-[#8B0000] text-white text-xs font-bold tracking-widest px-3 py-1 rounded-full shadow-lg uppercase">
                                {discountPercent}% OFF
                              </div>
                            )}
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                          </div>
                          
                          {/* Updated Persistent Action Area */}
                          <div className="text-center space-y-2 flex-1 px-4 pb-5 flex flex-col justify-end">
                            <h3 className="text-base md:text-lg font-medium text-slate-900 font-serif line-clamp-2">{product.name}</h3>
                            <div className="flex justify-center items-center gap-2 mb-3">
                              <span className="text-slate-900 font-medium">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-slate-400 text-sm line-through">₹{product.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                            <button 
                              onClick={() => setSelectedProduct(product)} 
                              className="w-full py-2.5 md:py-3 border border-slate-200 text-slate-800 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
                            >
                              View Details
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* CRAFTSMANSHIP SECTION */}
      {currentView === 'Home' && (
        <section className="bg-slate-900 text-white py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
             <img src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=2000" alt="Jewelry Craftsmanship" className="w-full h-full object-cover mix-blend-luminosity" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-sm tracking-[0.3em] text-slate-300 mb-6 uppercase">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight max-w-3xl">The Art of <br/> Uncompromising Quality.</h2>
            <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-12">
              Every piece of Avirra jewelry is a testament to generations of master craftsmanship.
            </p>
            <button className="border border-white/50 px-10 py-4 rounded-full tracking-widest text-sm uppercase hover:bg-white hover:text-slate-900 transition-all duration-300">
              Discover Our Process
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-white py-16 md:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
           <h2 className="text-3xl font-serif text-slate-900 tracking-widest mb-6 text-center">AVIRRA</h2>
           <p className="text-sm text-slate-400 text-center">&copy; {new Date().getFullYear()} Avirra Jewels. All rights reserved.</p>
        </div>
      </footer>

      {/* RENDER FULL-PAGE MOBILE / DESKTOP MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
        )}
      </AnimatePresence>
    </div>
  );
}