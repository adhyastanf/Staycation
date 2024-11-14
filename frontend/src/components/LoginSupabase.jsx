import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared';

const supabase = createClient(
  'https://qddrhalhpdriozyvztoe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZHJoYWxocGRyaW96eXZ6dG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNTc1NTYsImV4cCI6MjA0MTczMzU1Nn0.5vaj_9AsKnurwRsb6M593uAS_Dk5Etlcu26zd8-NNdw'
);

export default function LoginDialog() {
  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
}
