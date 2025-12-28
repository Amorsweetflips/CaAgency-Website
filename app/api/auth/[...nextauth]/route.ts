import NextAuth from 'next-auth'
import AzureAD from 'next-auth/providers/azure-ad'

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: '/api/auth',
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID || process.env.AZ_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || process.env.AZ_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID || process.env.AZ_TENANT_ID!,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow users with @caagency.com email domain
      if (user.email && user.email.endsWith('@caagency.com')) {
        return true
      }
      return false
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export const { GET, POST } = handlers
