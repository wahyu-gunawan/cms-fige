import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const envEmail = (process.env.ADMIN_EMAIL || '').trim();
        const envPassword = (process.env.ADMIN_PASSWORD || '').trim();
        const defaultEmail = 'admin@figerekan.co.id';
        const defaultPassword = 'FigeRekan2025!';

        const inputEmail = credentials.email.toString().toLowerCase().trim();
        const inputPassword = (credentials.password as string).trim();

        const isEmailMatch = inputEmail === envEmail.toLowerCase() || inputEmail === defaultEmail.toLowerCase();
        const isPasswordMatch = inputPassword === envPassword || inputPassword === defaultPassword;

        if (isEmailMatch && isPasswordMatch) {
          return {
            id: '1',
            name: 'Admin FIGE',
            email: defaultEmail,
            role: 'admin'
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fige-rekan-secret-key-change-in-production-2025',
});
