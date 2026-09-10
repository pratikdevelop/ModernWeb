/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ADSENSE_SLOT_HEADER?: string;
  readonly VITE_ADSENSE_SLOT_HERO_FEATURES?: string;
  readonly VITE_ADSENSE_SLOT_AISTUDIO_IN?: string;
  readonly VITE_ADSENSE_SLOT_AISTUDIO_SIDEBAR?: string;
  readonly VITE_ADSENSE_SLOT_DEMO_STATS?: string;
  readonly VITE_ADSENSE_SLOT_PRE_CONTACT?: string;
  readonly VITE_ADSENSE_SLOT_FOOTER?: string;
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly [key: string]: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
