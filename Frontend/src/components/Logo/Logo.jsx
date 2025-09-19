import React from 'react';

// Make sure to replace './path-to-your-logo.png' with the actual path to your image file.
import logoImage from '../../../public/logo.jpg'
function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src={logoImage} 
        alt="Company Logo" 
        className="h-25 w-70" // You can adjust the size here
      />
    </div>
  );
}

export default Logo;