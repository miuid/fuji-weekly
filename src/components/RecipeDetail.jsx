import React, { useState } from 'react';
import ImageGallery from './ImageGallery';
import './RecipeDetail.css';

const RecipeDetail = ({ recipe, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!recipe) return null;

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'color': return '#4CAF50';
      case 'b&w': return '#424242';
      default: return '#007aff';
    }
  };

  const renderSettingsTable = () => {
    const settings = [
      { label: 'Film Simulation', value: recipe.simulation },
      { label: 'Dynamic Range', value: recipe.dynamicRange },
      { label: 'Highlight', value: recipe.highlight },
      { label: 'Shadow', value: recipe.shadow },
      { label: 'Color', value: recipe.color },
      { label: 'Noise Reduction', value: recipe.noiseReduction },
      { label: 'Sharpening', value: recipe.sharpening },
      { label: 'Clarity', value: recipe.clarity },
      { label: 'Grain Effect', value: recipe.grainEffect },
      { label: 'Color Chrome Effect', value: recipe.colorChromeEffect },
      { label: 'Color Chrome Blue', value: recipe.ColorChromeEffectBlue },
      { label: 'White Balance', value: recipe.WhiteBalance },
      { label: 'WB Shift Red', value: recipe.WBShiftRed },
      { label: 'WB Shift Blue', value: recipe.WBShiftBlue },
      { label: 'ISO Range', value: recipe.ios },
      { label: 'Exposure Compensation', value: recipe.exposureCompensation },
    ];

    return (
      <div className="settings-table">
        {settings.map((setting, index) => (
          setting.value && (
            <div key={index} className="setting-row">
              <span className="setting-label">{setting.label}</span>
              <span className="setting-value">{setting.value}</span>
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <div className="recipe-title-section">
          <h1 className="recipe-name">{recipe.recipe}</h1>
          <div className="recipe-badges">
            <span className="type-badge" style={{backgroundColor: getTypeColor(recipe.recipeType)}}>
              {recipe.recipeType}
            </span>
            <span className="id-badge">#{recipe.recipeId}</span>
            <span className="date-badge">{recipe.date}</span>
          </div>
        </div>
      </div>

      <div className="recipe-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
      </div>

      <div className="recipe-tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="camera-compatibility">
              <h3>Compatible Cameras</h3>
              <div className="camera-list">
                {recipe.cameras?.map((camera, index) => (
                  <span key={index} className="camera-chip">{camera}</span>
                ))}
              </div>
            </div>

            <div className="quick-settings">
              <h3>Key Settings</h3>
              <div className="quick-settings-grid">
                <div className="quick-setting">
                  <span className="label">Simulation</span>
                  <span className="value">{recipe.simulation}</span>
                </div>
                <div className="quick-setting">
                  <span className="label">Dynamic Range</span>
                  <span className="value">{recipe.dynamicRange}</span>
                </div>
                <div className="quick-setting">
                  <span className="label">ISO Range</span>
                  <span className="value">{recipe.ios}</span>
                </div>
              </div>
            </div>

            {recipe.recipeWebsite && (
              <div className="external-link">
                <a href={recipe.recipeWebsite} target="_blank" rel="noopener noreferrer" className="website-link">
                  View Original Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-content">
            {renderSettingsTable()}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="photos-content">
            <ImageGallery images={recipe.photographs || []} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;