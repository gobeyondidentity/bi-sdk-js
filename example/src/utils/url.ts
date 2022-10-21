export function authUrl(): URL {
  switch (process.env.REGION) {
    case "us": {
      return new URL("https://auth-us.beyondidentity.com");
    }
    case "eu": {
      return new URL("https://auth-eu.beyondidentity.com");
    }
    default: {
      throw new Error(`Unsupported or unrecognized region: ${process.env.REGION}`);
    }
  }
}

export function apiUrl(): URL {
  switch (process.env.REGION) {
    case "us": {
      return new URL("https://api-us.beyondidentity.com");
    }
    case "eu": {
      return new URL("https://api-eu.beyondidentity.com");
    }
    default: {
      throw new Error(`Unsupported or unrecognized region: ${process.env.REGION}`);
    }
  }
}
