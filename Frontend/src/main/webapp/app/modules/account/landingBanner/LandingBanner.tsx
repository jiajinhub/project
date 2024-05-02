import React from 'react';

const LandingBanner = () => {
  return (
    <div>
      <div className="left">
        <div className="groceryTracker-font">Grocery Checker</div>
        <div className="image-container">
          <img
            src="../../../content/images/Webpage Cover Banner.jpg"
            alt="Left Image"
            style={{ width: '100%', height: '90%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
 );
}

export default LandingBanner;
