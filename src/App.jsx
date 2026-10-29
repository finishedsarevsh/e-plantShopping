import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="landing-overlay">
            <div className="landing-content">
              <h1 className="landing-title">Welcome To Paradise Nursery</h1>
              <p className="landing-tagline">
                🌿 Where Green Dreams Come to Life 🌿
              </p>
              <p className="landing-subtitle">
                Bring nature indoors with our handpicked collection of beautiful,
                healthy houseplants — curated for every home and lifestyle.
              </p>
              <button className="get-started-btn" onClick={handleGetStartedClick}>
                Get Started
              </button>
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={handleHomeClick} onGoHome={handleHomeClick} />
      )}
    </div>
  );
}

export default App;
