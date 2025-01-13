// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Guarda el ID del usuario
        token.email = user.email; // Guarda el email del usuario
        token.name = user.name; // Guarda el nombre del usuario
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Añade el ID del usuario a la sesión
      session.user.email = token.email; // Añade el email a la sesión
      session.user.name = token.name; // Añade el nombre a la sesión
      return session;
    },
  },
});