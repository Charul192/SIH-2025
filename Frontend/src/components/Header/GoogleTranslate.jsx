import React, { useState, useEffect, useContext } from "react";
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { AppContext } from "../../context/AppContext";

export default function GoogleTranslate() {
  const { Dark } = useContext(AppContext);

  const languages = [
    { value: "/auto/en", label: "English" },
    { value: "/auto/hi", label: "हिन्दी" },
    { value: "/auto/pa", label: "ਪੰਜਾਬੀ" },
    { value: "/auto/bn", label: "বাংলা" },
  ];

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const cookieLang = getCookie('googtrans');
    if (cookieLang && languages.some(lang => lang.value === cookieLang)) {
      return cookieLang;
    }
    return '/auto/en'; // Default to English
  });

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

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
    
    // Set the 'googtrans' cookie
    document.cookie = `googtrans=${langCode}; path=/`;
    
    // Reload the page to apply the translation
    window.location.reload();
  };
  
  const selectClasses = Dark
    ? "text-gray-200 bg-gray-800 border-gray-600 focus:ring-blue-400"
    : "text-gray-800 bg-gray-100 border-gray-300 focus:ring-blue-500";

  return (
    <div className="relative inline-block text-left notranslate">
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="flex items-center">
        <GlobeAltIcon className={`absolute left-3 h-5 w-5 pointer-events-none ${Dark ? 'text-gray-400' : 'text-gray-500'}`} />
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className={`pl-10 pr-4 py-2 text-sm font-medium rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 border transition-colors duration-200 ${selectClasses}`}
        >
          {/* "Language" OPTION HAS BEEN REMOVED FROM HERE */}
          
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