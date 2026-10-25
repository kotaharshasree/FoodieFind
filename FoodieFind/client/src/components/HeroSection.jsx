import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, ChefHat, Flame, Clock } from 'lucide-react';

const HeroSection = ({ onQuickSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (onQuickSearch) {
      onQuickSearch(searchTerm.trim());
    } else {
      navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleFloatingClick = (ingredient) => {
    navigate(`/kitchen?ingredient=${encodeURIComponent(ingredient)}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FFE5D0]/80 via-[#FDBA74]/20 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FEF08A]/20 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Search Area */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Animated pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE5D0] border border-[#FED7AA] text-[#EA580C] text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <Sparkles size={15} className="text-[#F97316] animate-spin" style={{ animationDuration: '6s' }} />
              <span>✨ Discover something delicious</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#292524] leading-[1.15] tracking-tight mb-5"
            >
              Your Kitchen Has{' '}
              <span className="relative inline-block text-[#EA580C]">
                More Possibilities
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#F97316]/40 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Than You Think.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#78716C] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8"
            >
              Discover delicious recipes using the ingredients you already have. No grocery runs, no wasted food — just pure culinary joy.
            </motion.p>

            {/* Prominent Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-orange-900/5 border-2 border-[#FED7AA] focus-within:border-[#F97316] transition-all max-w-xl mx-auto lg:mx-0 flex items-center gap-2"
            >
              <div className="pl-3 text-[#78716C]">
                <Search size={22} className="text-[#F97316]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipe by name or ingredient (e.g., Paneer, Biryani)..."
                className="w-full bg-transparent border-none outline-none text-[#292524] text-sm sm:text-base font-medium placeholder:text-[#A8A29E]"
              />
              <button
                type="submit"
                className="btn-primary !py-2.5 !px-5 whitespace-nowrap text-sm font-semibold shrink-0"
              >
                <span>Find Recipes</span>
                <ArrowRight size={16} />
              </button>
            </motion.form>

            {/* Popular quick ingredients tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-[#78716C]"
            >
              <span className="font-semibold text-[#292524]">Try with:</span>
              {['Paneer', 'Tomato', 'Chicken', 'Potato', 'Eggs', 'Rice'].map((ing) => (
                <button
                  key={ing}
                  type="button"
                  onClick={() => handleFloatingClick(ing)}
                  className="bg-white/80 hover:bg-[#FFE5D0] hover:text-[#EA580C] px-3 py-1 rounded-full border border-[#FED7AA] transition-colors text-xs font-medium cursor-pointer"
                >
                  +{ing}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Visual Image & Floating Badges Collage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Featured Food Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/20 border-4 border-white group"
            >
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                alt="Vegetable Biryani"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Bottom Card Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#65A30D] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Chef's Choice
                  </span>
                  <div className="flex items-center gap-1 text-xs text-orange-200">
                    <Clock size={13} />
                    <span>40 mins</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight mb-1">
                  Vegetable Dum Biryani
                </h3>
                <p className="text-xs text-stone-200 line-clamp-2">
                  Aromatic basmati rice layered with garden-fresh veggies and saffron milk.
                </p>
              </div>
            </motion.div>

            {/* Floating Ingredient Badge 1: Paneer */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#FED7AA] flex items-center gap-2.5 z-20 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleFloatingClick('Paneer')}
            >
              <span className="text-2xl">🧀</span>
              <div>
                <p className="text-[11px] text-[#78716C] font-medium leading-none">In your kitchen?</p>
                <p className="text-sm font-bold text-[#292524] leading-tight">Fresh Paneer</p>
              </div>
            </motion.div>

            {/* Floating Ingredient Badge 2: Tomato */}
            <motion.div
              animate={{ y: [6, -6, 6], rotate: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#FED7AA] flex items-center gap-2.5 z-20 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleFloatingClick('Tomato')}
            >
              <span className="text-2xl">🍅</span>
              <div>
                <p className="text-[11px] text-[#78716C] font-medium leading-none">Instant Match</p>
                <p className="text-sm font-bold text-[#292524] leading-tight">Ripe Tomatoes</p>
              </div>
            </motion.div>

            {/* Floating Ingredient Badge 3: Match Rate */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 left-6 bg-[#292524] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-[#65A30D] flex items-center justify-center font-bold text-sm">
                95%
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Smart Match Rate</p>
                <p className="text-[11px] text-stone-300 leading-none">Zero wasted ingredients</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
