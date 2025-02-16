// app/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,      // set in .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // set in .env.local
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // set in .env.local
});
