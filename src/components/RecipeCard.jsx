import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'color': return '#4CAF50';
      case 'b&w': return '#424242';
      default: return '#007aff';
    }
  };

  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-image-container">
        {!imageError && recipe.featurePicture ? (
          <img
            src={recipe.featurePicture}
            alt={recipe.recipe}
            className="recipe-image"
            onError={handleImageError}
          />
        ) : (
          <div className="recipe-image-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
              <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        )}
        <div className="recipe-type-badge" style={{backgroundColor: getTypeColor(recipe.recipeType)}}>
          {recipe.recipeType}
        </div>
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.recipe}</h3>
        <p className="recipe-simulation">{recipe.simulation}</p>

        <div className="recipe-meta">
          <span className="recipe-date">{recipe.date}</span>
          <span className="recipe-id">#{recipe.recipeId}</span>
        </div>

        <div className="recipe-cameras">
          {recipe.cameras?.slice(0, 3).map((camera, index) => (
            <span key={index} className="camera-tag">{camera}</span>
          ))}
          {recipe.cameras?.length > 3 && (
            <span className="camera-more">+{recipe.cameras.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;