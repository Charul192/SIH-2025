interface ImportMetaEnv {
    readonly VITE_MAPS_KEY: string;
    readonly VITE_API_KEY: string;
    // aur env vars agar chahiye ho to yaha add kar do
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }