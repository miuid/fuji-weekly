import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, onRecipeSelect }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="recipe-list-empty">
        <p>No recipes found</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => onRecipeSelect(recipe)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;