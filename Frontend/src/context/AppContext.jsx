import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
const AppContextProvider=(props)=>{
    const[Dark,setDark]=useState(true);
    const value= {
        Dark,setDark
    }
    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}
export default AppContextProvider
