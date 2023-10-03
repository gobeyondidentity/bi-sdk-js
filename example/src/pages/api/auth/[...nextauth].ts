import NextAuth, { NextAuthOptions } from "next-auth"
import { clientId, clientSecret, wellKnownUrl } from "../../../utils/oidc"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: "beyondidentity",
      name: "Beyond Identity",
      type: "oauth",
      wellKnown: wellKnownUrl(),
      authorization: { params: { scope: "openid" } },
      clientId: clientId(),
      clientSecret: clientSecret(),
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
