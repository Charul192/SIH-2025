import React from 'react';

// Make sure to replace './path-to-your-logo.png' with the actual path to your image file.
import logoImage from 'C:/Users/Aniket/OneDrive/Desktop/Coding/SIH-2025/Frontend/public/WhatsApp Image 2025-09-19 at 15.29.36_e16afdfa.jpg'
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