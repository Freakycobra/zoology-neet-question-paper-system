import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wemdfssaxehpnnvakpkg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_sAZsyaREpuhuOXm3pzvCNw_fI13BB2d'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
