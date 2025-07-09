import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gwymkfydqfvnojcoxkvz.supabase.co';
const supabaseKey = process.env.PUBLIC_SUPABASE_SERVICE_ROLE || '';
export const supabase = createClient(supabaseUrl, supabaseKey);
