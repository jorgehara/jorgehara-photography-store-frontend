// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from '../../../lib/axios';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        try {
          // Registrar el usuario en tu backend
          const response = await axios.post('/auth/register', {
            username: user.name,
            email: user.email,
            password: '', // El backend deberá manejar este caso especial
            googleId: user.id,
            isGoogleUser: true
          });
          return true;
        } catch (error) {
          // Si el usuario ya existe, permitir el inicio de sesión
          if (error.response?.status === 409) {
            return true;
          }
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.googleId = account?.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.googleId = token.googleId;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});