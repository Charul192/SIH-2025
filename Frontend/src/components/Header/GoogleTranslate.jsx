import React, { useEffect, useContext } from "react"; // FIX: useContext import kiya
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { AppContext } from "../../context/AppContext"; // FIX: AppContext import kiya

export default function GoogleTranslate() {
  const { Dark } = useContext(AppContext); // FIX: Get theme state

  const languages = [
    { value: "/auto/en", label: "English" },
    { value: "/auto/hi", label: "हिन्दी" },
    { value: "/auto/pa", label: "ਪੰਜਾਬੀ" },
    { value: "/auto/bn", label: "বাংলা" },
  ];
  
  useEffect(() => {
    // Define the callback function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    // Check if the script already exists and add it if it doesn't
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement("script");
      script.id = 'google-translate-script';
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    if (!langCode) return; // Do nothing if 'Language' is selected
    
    // Set the 'googtrans' cookie that the widget reads on initialization
    document.cookie = `googtrans=${langCode}; path=/`;
    
    // Reload the page to apply the translation
    window.location.reload();
  };
  
  // FIX: Helper variable for dynamic select classes
  const selectClasses = Dark
    ? "text-gray-200 bg-gray-800 border-gray-600 focus:ring-blue-400"
    : "text-gray-800 bg-gray-100 border-gray-300 focus:ring-blue-500";

  return (
    <div className="relative inline-block text-left">
      {/* The original widget is still needed but remains hidden */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="flex items-center">
        {/* FIX: Icon color is now theme-aware */}
        <GlobeAltIcon className={`absolute left-3 h-5 w-5 pointer-events-none ${Dark ? 'text-gray-400' : 'text-gray-500'}`} />
        <select
          onChange={handleLanguageChange}
          // FIX: All theme-related classes are now handled by the 'selectClasses' variable
          className={`pl-10 pr-4 py-2 text-sm font-medium rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 border transition-colors duration-200 ${selectClasses}`}
        >
          {/* Set an empty value for the default option */}
          <option value="">Language</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}