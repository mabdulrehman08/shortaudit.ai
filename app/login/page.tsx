'use client';

import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { Badge, Card, Section } from '@/components/ui';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function signInWithEmail() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage('Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable Supabase auth.');
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    setMessage(error ? error.message : 'Check your email for a secure login link.');
  }

  async function signInWithGoogle() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage('Supabase environment variables are missing.');
      return;
    }
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } });
  }

  return (
    <main>
      <Section className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge icon={Lock}>Supabase Auth</Badge>
          <h1 className="mt-5 text-5xl font-black tracking-tight">Log in to your creator intelligence workspace.</h1>
          <p className="mt-4 text-lg leading-8 text-slate-400">Use Google sign-in or passwordless email. The app is ready for Supabase session cookies and protected dashboard routes.</p>
        </div>
        <Card>
          <button onClick={signInWithGoogle} className="w-full rounded-2xl bg-white px-5 py-4 font-black text-ink transition hover:bg-neon">Continue with Google</button>
          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500"><span className="h-px flex-1 bg-white/10" />or email<span className="h-px flex-1 bg-white/10" /></div>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-300">Email</span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
              <Mail className="h-5 w-5 text-slate-500" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="creator@studio.com" className="w-full bg-transparent text-white outline-none placeholder:text-slate-600" />
            </div>
          </label>
          <button onClick={signInWithEmail} className="mt-4 w-full rounded-2xl bg-neon px-5 py-4 font-black text-ink">Send magic link</button>
          {message && <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{message}</p>}
        </Card>
      </Section>
    </main>
  );
}
