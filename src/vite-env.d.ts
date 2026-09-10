/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ADSENSE_SLOT_HEADER?: string;
  readonly VITE_ADSENSE_SLOT_INARTICLE?: string;
  readonly VITE_ADSENSE_SLOT_SIDEBAR?: string;
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly [key: string]: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
