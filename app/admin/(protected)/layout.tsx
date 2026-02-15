import { requireAuthWithRedirect } from '@/lib/auth'
import { signOut } from '@/lib/auth-config'
import Button from '@/components/ui/Button'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuthWithRedirect()

  async function handleSignOut() {
    'use server'
    await signOut({ redirectTo: '/admin/login' })
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <header className="border-b border-foreground-white/20 bg-background-dark/80 backdrop-blur-xs sticky top-0 z-50">
        <div className="max-w-container mx-auto px-section-x py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-anegra text-2xl font-semibold text-foreground-white">
                CA Agency Admin
              </h1>
              <p className="text-sm text-foreground-white/70 mt-1">
                Logged in as {session.user.email}
              </p>
            </div>
            <form action={handleSignOut}>
              <Button type="submit" variant="dark" size="sm">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-container mx-auto px-section-x py-8">
        {children}
      </main>
    </div>
  )
}
