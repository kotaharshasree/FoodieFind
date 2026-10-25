import React from 'react';
import { useSearchParams } from 'react-router-dom';
import KitchenMatcher from '../components/KitchenMatcher';

const KitchenPage = ({ recipes = [], onSelectRecipe }) => {
  const [searchParams] = useSearchParams();
  const initialIngredient = searchParams.get('ingredient') || '';

  return (
    <div className="py-6">
      <KitchenMatcher
        allRecipes={recipes}
        onSelectRecipe={onSelectRecipe}
        initialIngredient={initialIngredient}
      />
    </div>
  );
};

export default KitchenPage;
