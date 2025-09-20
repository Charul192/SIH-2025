import React, { useState, useEffect } from "react";
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function GoogleTranslate() {
  const languages = [
    { value: "/auto/en", label: "English" },
    { value: "/auto/hi", label: "हिन्दी" },
    { value: "/auto/pa", label: "ਪੰਜਾਬੀ" },
    { value: "/auto/bn", label: "বাংলা" },
  ];

  const getCookie = (name) => {
    // Corrected this function's syntax
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const cookieLang = getCookie('googtrans');
    // Ensure the cookie value exists in our language list
    if (cookieLang && languages.some(lang => lang.value === cookieLang)) {
      return cookieLang;
    }
    return '/auto/en'; // Default to English
  });

  useEffect(() => {
    // Define the callback function for the Google Translate script
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    // Add the Google Translate script to the page if it doesn't exist
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
    setSelectedLanguage(langCode);
    // Corrected this line's syntax
    document.cookie = `googtrans=${langCode}; path=/;`;
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left notranslate">
      {/* This div is used by Google Translate, it should be hidden */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="flex items-center">
        <GlobeAltIcon className="absolute left-3 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        <select
          value={selectedLanguage}
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
