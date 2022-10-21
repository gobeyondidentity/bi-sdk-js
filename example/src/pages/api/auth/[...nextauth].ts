import NextAuth, { NextAuthOptions } from "next-auth"

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
