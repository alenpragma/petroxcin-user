/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_BOT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
