import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from 'js-cookie';
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const LOGIN_URL = `${process.env.NEXT_PUBLIC_USER_URL}/user/login`
        const data = {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
        }
        const res = await fetch(LOGIN_URL, data)

        const user = await res.json();
        Cookies.set('token', user.token);
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn:"/recommendations",
    signOut: "/",
  },
});
export { handler as GET, handler as POST };
