export function useAuthService() {
  const supabase = useSupabaseClient()

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) return null
    return data.user
  }

  return { getUser, signIn, signOut }
}
