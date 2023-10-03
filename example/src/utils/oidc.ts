export function wellKnownUrl(): string {
  switch (process.env.ENVIRONMENT) {
    case "rolling": {
      return "https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/862e4b72cfdce072/applications/0102be04-e6cd-4f83-a558-a89a5e260380/.well-known/openid-configuration";
    }
    case "staging": {
      return "https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/862e4b72cfdce072/applications/af579a2a-1215-40c7-b83c-5ab33b758099/.well-known/openid-configuration";
    }
    default: {
      return "https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/862e4b72cfdce072/applications/2d19c741-74e5-48f1-8709-cc2c5f0f101e/.well-known/openid-configuration";
    }
  }
}

export function clientId(): string {
  switch (process.env.ENVIRONMENT) {
    case "rolling": {
      return "95UgLkdVoycV_In6ypVFz9CB";
    }
    case "staging": {
      return "_j314WT9gS1PlCDbVeYtNixq";
    }
    default: {
      return "31eQMDR_ftmj7tGoD3PZWb-n";
    }
  }
}

export function clientSecret(): string {
  switch (process.env.ENVIRONMENT) {
    case "rolling": {
      return "lljJQ9rb6eZboI3IHYKjyx929KEBq4K2SXM0go4d2QDphVG4";
    }
    case "staging": {
      return "pCsaHtE3GlyzylMNUL1F2yRBHzlILUkDeSraIiYZZEuuugff";
    }
    default: {
      return "6-BdFQed42oiZI6QyHaG_KFbONHFX_wUcg1pfHRhlfEb4Wyj";
    }
  }
}