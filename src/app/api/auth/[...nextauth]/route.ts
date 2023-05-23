import {PrismaAdapter} from '@next-auth/prisma-adapter';
import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {prisma} from '@/utils/prisma';
import * as bcrypt from 'bcrypt';
import {User} from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({session, token}) => {
      console.log('Session callback', {session, token});
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({token, user}) => {
      console.log('JWT callback', {token, user});

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'jsmith@email.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        console.log('creds', credentials);

        if (!credentials?.password || !credentials?.email) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          randomKey: 'text typo',
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
