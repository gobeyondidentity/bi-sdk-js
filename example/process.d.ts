declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    TENANT_ID: string
    API_TOKEN: string
    REALM_ID: string
    AUTHENTICATOR_CONFIG_ID: string
    APPLICATION_ID: string
    APP_CLIENT_ID: string
    APP_CLIENT_SECRET: string
    REGION: string
  }
}
