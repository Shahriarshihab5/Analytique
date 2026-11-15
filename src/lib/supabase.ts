import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://enyniyygyakbkhuinwwd.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_WYe7M9ElnWGsM_IwLf2omw_6yU4t9WF";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

