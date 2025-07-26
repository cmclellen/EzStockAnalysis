import NextAuth from "next-auth";
import { OAuthUserConfig } from "next-auth/providers";
import Google, { GoogleProfile } from "next-auth/providers/google";

const googleParams: OAuthUserConfig<GoogleProfile> = {
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [Google(googleParams)],
  callbacks: {
    authorized({ auth, _request }: any) {
      return !!auth?.user;
    },
    async signIn({ _user, account, profile }: any) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  pages: {
    signIn: "/login",
  },
});
