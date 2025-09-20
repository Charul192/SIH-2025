import React, { useContext } from 'react';
import logoImage from '../../../public/logo.png'; // Make sure this path is correct
import { AppContext } from '../../context/AppContext';

function Logo() {
  const { Dark } = useContext(AppContext);

  return (
    <div className="flex items-center space-x-2"> {/* Removed bg-black/bg-white from here, let parent control */}
      <img 
        src={logoImage} 
        alt="Company Logo" 
        className={`h-25 w-70 ${
          !Dark 
            ? 'filter  invert' // For logos that are originally dark on light background
            : '' 
        }`}
        // Agar aapka logo already light hai aur dark background par dikhana hai, toh sirf 'brightness-0 invert' lagao.
        // Agar aapka logo already dark hai aur dark mode mein light karna hai toh 'filter invert' laga do
      />
    </div>
  );
}

export default Logo;