import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Helper function to get a cookie by name
  function getCookie(name) {
    const cookieNameToFind = name + "=";
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieNameToFind) === 0) {
        return cookie.substring(cookieNameToFind.length, cookie.length);
      }
    }
    return null;
  }

  // Helper function to set a cookie
  function setCookie(name, value, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  }

  // FIX 1: Initialize state by checking if the cookie's value is the string 'true'
  // FIX 2: JavaScript uses lowercase 'false', not 'False'
  const [Dark, setDark] = useState(getCookie('Dark') === 'true');

  // ADDED: A useEffect to save the theme to a cookie whenever 'Dark' state changes
  useEffect(() => {
    // This will run every time the user toggles the theme
    setCookie('Dark', Dark, 365); // Save the preference for 1 year
  }, [Dark]);

  // The value to be passed to consuming components
  const value = {
    Dark,
    setDark
    // You don't need to pass setCookie in the context unless other components need to set cookies
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
