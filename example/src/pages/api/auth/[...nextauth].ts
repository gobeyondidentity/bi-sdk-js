import NextAuth, { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import OktaProvider from "next-auth/providers/okta"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: "beyondidentity",
      name: "Beyond Identity",
      type: "oauth",
      wellKnown: `https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/862e4b72cfdce072/applications/2d19c741-74e5-48f1-8709-cc2c5f0f101e/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid" } },
      clientId: "31eQMDR_ftmj7tGoD3PZWb-n",
      clientSecret: "6-BdFQed42oiZI6QyHaG_KFbONHFX_wUcg1pfHRhlfEb4Wyj",
      idToken: true,
      checks: ["state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          email: profile.sub,
        }
      },
    },
    Auth0Provider({
      clientId: "q1cubQfeZWnajq5YkeZVD3NauRqU4vNs",
      clientSecret: "2NXvQo_WYo7PeLoutxGyhNryhBWK807wMuibBfxZvHH6e5ZGK7k0glQUZUBLdufU",
      authorization: "https://dev-pt10fbkg.us.auth0.com/authorize?connection=Example-App-Web",
      issuer: "https://dev-pt10fbkg.us.auth0.com",
      profile(profile) {
        let split = profile.sub.split("|");
        let email = split[split.length - 1];
        return {
          id: email,
          name: email,
          email: email,
        }
      },
    }),
    OktaProvider({
      clientId: "0oa6xervrvbPQ1F4H5d7",
      clientSecret: "xPUMnQa3Vt0oDADtIV6YmJvYe3WwuoapxU5jtYFd",
      authorization: "https://dev-43409302.okta.com/oauth2/v1/authorize?idp=0oa5rszht04BEucVQ5d7",
      issuer: "https://dev-43409302.okta.com",
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
