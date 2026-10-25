import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Heart,
  PlusCircle,
  Menu,
  X,
  Compass,
  Refrigerator,
  Sparkles,
  Dices,
} from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const Navbar = ({ onOpenAddModal, onOpenSurpriseModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favoriteCount } = useFavorites();

  const navLinks = [
    { name: 'Home', path: '/', icon: UtensilsCrossed },
    { name: 'Explore Recipes', path: '/explore', icon: Compass },
    { name: "What's in My Kitchen?", path: '/kitchen', icon: Refrigerator },
    { name: 'Favorites', path: '/favorites', icon: Heart, badge: favoriteCount },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 navbar-glass">
      <div className="container-custom py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-decoration-none group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center text-white shadow-md shadow-orange-500/20"
          >
            <UtensilsCrossed size={22} className="stroke-[2.2]" />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-2xl text-[#292524] tracking-tight">
                Foodie<span className="text-[#F97316]">Find</span>
              </span>
              <span className="bg-[#FFE5D0] text-[#EA580C] text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Smart
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] -mt-1 font-medium hidden sm:block">
              Your Kitchen • Your Discovery
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-decoration-none ${
                  active
                    ? 'text-[#EA580C] bg-[#FFE5D0]/60'
                    : 'text-[#292524] hover:text-[#EA580C] hover:bg-[#FFE5D0]/30'
                }`}
              >
                <Icon size={16} className={active ? 'text-[#EA580C]' : 'text-[#78716C]'} />
                <span>{link.name}</span>
                {link.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-0.5 bg-[#EA580C] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center"
                  >
                    {link.badge}
                  </motion.span>
                )}
                {active && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full border border-[#FDBA74] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Surprise Me Button */}
          <button
            onClick={onOpenSurpriseModal}
            className="btn-secondary !py-2 !px-3.5 text-xs sm:text-sm font-semibold text-[#EA580C]"
            title="Surprise me with a random recipe!"
          >
            <Dices size={16} className="text-[#EA580C]" />
            <span>Surprise Me!</span>
          </button>

          {/* Add Recipe Button */}
          <button
            onClick={onOpenAddModal}
            className="btn-primary !py-2 !px-4 text-xs sm:text-sm font-semibold"
          >
            <PlusCircle size={16} />
            <span>Add Recipe</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenSurpriseModal}
            className="p-2 rounded-full bg-[#FFE5D0] text-[#EA580C]"
            aria-label="Surprise Me"
          >
            <Dices size={18} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#292524] hover:bg-[#FFE5D0] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#FED7AA] bg-[#FFF8F0]/95 backdrop-blur-md px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-base font-semibold text-decoration-none ${
                    active ? 'bg-[#FFE5D0] text-[#EA580C]' : 'text-[#292524] hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={active ? 'text-[#EA580C]' : 'text-[#78716C]'} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge > 0 && (
                    <span className="bg-[#EA580C] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#FED7AA]/50 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddModal();
                }}
                className="btn-primary w-full justify-center !py-2.5 text-sm"
              >
                <PlusCircle size={18} />
                <span>Add Your Recipe</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
