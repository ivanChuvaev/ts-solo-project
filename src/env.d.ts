/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_WEATHER_API_KEY: string;
  readonly VITE_APP_NINJA_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
