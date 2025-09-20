import React, { useEffect } from "react";
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function GoogleTranslate() {
  const languages = [
    { value: "/auto/en", label: "English" },
    { value: "/auto/hi", label: "हिन्दी" },
    {value: "/auto/pa", label: "ਪੰਜਾਬੀ"},
    { value: "/auto/bn", label: "বাংলা" },
  ];
  
  // This useEffect handles loading the Google Translate script
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

  // CHANGE: Rewrote this function for a more reliable cookie-based method.
  const handleLanguageChange = (e) => {
    const langCode = e.target.value; // This will be "/auto/hi", "/auto/es", etc.
    
    // Set the 'googtrans' cookie that the widget reads on initialization
    document.cookie = `googtrans=${langCode}; path=/`;
    
    // Reload the page to apply the translation
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      {/* The original widget is still needed but remains hidden */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="flex items-center">
        <GlobeAltIcon className="absolute left-3 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        <select
          onChange={handleLanguageChange}
          className="
            pl-10 pr-4 py-2 
            text-sm font-medium 
            text-gray-800 dark:text-gray-200 
            bg-gray-100 dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            rounded-md 
            appearance-none 
            cursor-pointer 
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            transition-colors duration-200
          "
        >
          <option>Language</option>
          {languages.map((lang) => (
            // CHANGE: The value of the option is now lang.value (e.g., "/auto/hi")
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}