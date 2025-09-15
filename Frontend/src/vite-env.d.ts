interface ImportMetaEnv {
    readonly VITE_MAPS_API: string;
    // aur env vars agar chahiye ho to yaha add kar do
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }