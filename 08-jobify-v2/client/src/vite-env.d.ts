/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BACKEND_URL: string
  VITE_API_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
