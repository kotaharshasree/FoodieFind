import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import KitchenPage from './pages/KitchenPage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetailModal from './components/RecipeDetailModal';
import RecipeFormModal from './components/RecipeFormModal';
import SurpriseMeModal from './components/SurpriseMeModal';
import { recipeService } from './services/api';
import toast from 'react-hot-toast';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);

  // Fetch all recipes from backend
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const res = await recipeService.getRecipes();
      if (res && res.data) {
        setRecipes(res.data);
      }
    } catch (error) {
      console.error('Failed to load recipes from backend API:', error);
      toast.error('Could not connect to backend API. Please make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // Handle Edit Recipe
  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(null);
    setRecipeToEdit(recipe);
    setIsAddModalOpen(true);
  };

  // Handle Delete Recipe
  const handleDeleteRecipe = async (id) => {
    try {
      await recipeService.deleteRecipe(id);
      toast.success('Recipe deleted successfully');
      setSelectedRecipe(null);
      loadRecipes();
    } catch (error) {
      console.error('Delete recipe error:', error);
      toast.error('Failed to delete recipe');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF8F0] text-[#292524] selection:bg-[#FED7AA] selection:text-[#EA580C]">
      {/* Toast Notifications Provider */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#292524',
            border: '1px solid #FED7AA',
            boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.15)',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 600,
          },
          success: {
            iconTheme: {
              primary: '#65A30D',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#DC2626',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenAddModal={() => {
          setRecipeToEdit(null);
          setIsAddModalOpen(true);
        }}
        onOpenSurpriseModal={() => setIsSurpriseModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#FED7AA] border-t-[#EA580C] animate-spin" />
            <p className="font-display text-lg font-bold text-[#292524]">
              Preparing Your Culinary Discovery...
            </p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <ExplorePage
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                />
              }
            />
            <Route
              path="/kitchen"
              element={
                <KitchenPage
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                />
              }
            />
            <Route
              path="*"
              element={
                <HomePage
                  recipes={recipes}
                  onSelectRecipe={(r) => setSelectedRecipe(r)}
                />
              }
            />
          </Routes>
        )}
      </main>

      {/* Recipe Detail View Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={Boolean(selectedRecipe)}
        onClose={() => setSelectedRecipe(null)}
        onEdit={handleEditRecipe}
        onDelete={handleDeleteRecipe}
      />

      {/* Add / Edit Recipe Modal */}
      <RecipeFormModal
        isOpen={isAddModalOpen}
        recipeToEdit={recipeToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setRecipeToEdit(null);
        }}
        onSuccess={() => {
          loadRecipes();
        }}
      />

      {/* Surprise Me Modal */}
      <SurpriseMeModal
        isOpen={isSurpriseModalOpen}
        onClose={() => setIsSurpriseModalOpen(false)}
        recipes={recipes}
        onSelectRecipe={(r) => setSelectedRecipe(r)}
      />

      {/* Footer */}
      <Footer onReseedSuccess={loadRecipes} />
    </div>
  );
}

export default App;
