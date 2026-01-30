/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ORIGIN: string
  readonly VITE_ENV: 'local' | 'development' | 'production'
  readonly VITE_APP_NAME: string
  // 다른 환경변수들도 여기에 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.svg?react" {
  import React from "react";
  const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
