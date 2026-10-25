import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Heart, RotateCcw, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { recipeService } from '../services/api';

const Footer = ({ onReseedSuccess }) => {
  const handleReseed = async () => {
    try {
      const res = await recipeService.seedRecipes();
      toast.success(res.message || 'Database successfully reseeded!');
      if (onReseedSuccess) onReseedSuccess();
    } catch (e) {
      toast.error('Failed to reseed database');
    }
  };

  return (
    <footer className="mt-auto border-t border-[#FED7AA] bg-[#FFF8F0] pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center text-white shadow-sm">
                <UtensilsCrossed size={18} />
              </div>
              <span className="font-display font-bold text-2xl text-[#292524] tracking-tight">
                Foodie<span className="text-[#F97316]">Find</span>
              </span>
            </Link>
            <p className="text-sm text-[#78716C] max-w-sm leading-relaxed">
              "Your ingredients. Your cravings. Your next delicious discovery." Smart recipe discovery platform built for food lovers.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#EA580C] bg-[#FFE5D0] px-3 py-1 rounded-full w-fit">
              <Sparkles size={13} />
              <span>Full Stack Development (FSD) Lab Project</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#292524] mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#78716C]">
              <li>
                <Link to="/" className="hover:text-[#EA580C] transition-colors text-decoration-none">
                  Home Discovery
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#EA580C] transition-colors text-decoration-none">
                  Explore All Recipes
                </Link>
              </li>
              <li>
                <Link to="/kitchen" className="hover:text-[#EA580C] transition-colors text-decoration-none">
                  What's in My Kitchen?
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[#EA580C] transition-colors text-decoration-none">
                  Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* College Demo / Database Tools */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#292524] mb-2">
              Demo & Lab Utilities
            </h4>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Need fresh sample data during your lab evaluation? Reset MongoDB with 22+ realistic dishes in 1-click:
            </p>
            <button
              onClick={handleReseed}
              className="btn-secondary !py-2 !px-3.5 text-xs font-semibold text-[#EA580C] border-orange-300"
            >
              <RotateCcw size={14} />
              <span>Reseed Sample Database</span>
            </button>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 border-t border-[#FED7AA]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-3">
          <p>© {new Date().getFullYear()} FoodieFind. Built with ReactJS, Vite, Node.js & MongoDB.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={14} className="text-rose-500 fill-current" /> for delicious home cooking
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
