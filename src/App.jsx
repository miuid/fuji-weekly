import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import SearchBar from './components/SearchBar';
import Header from './components/Header';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'

  useEffect(() => {
    // Fetch recipes data
    fetch('/recipes.json')
      .then(response => response.json())
      .then(data => {
        setRecipes(data.data || []);
        setFilteredRecipes(data.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading recipes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter recipes based on search term
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.recipe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.recipeType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.simulation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.cameras?.some(camera => camera.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedRecipe(null);
  };

  if (loading) {
    return (
      <div className="app loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        title="Fuji Camera Recipes"
        showBack={currentView === 'detail'}
        onBack={handleBackToList}
      />

      {currentView === 'list' ? (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            placeholder="Search recipes, cameras, or types..."
          />
          <RecipeList
            recipes={filteredRecipes}
            onRecipeSelect={handleRecipeSelect}
          />
        </>
      ) : (
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}

export default App;
