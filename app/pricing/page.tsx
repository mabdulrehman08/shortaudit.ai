import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, CreditCard } from 'lucide-react';
import { Badge, Card, Section, cn } from '@/components/ui';

export const metadata: Metadata = { title: 'Pricing' };

const plans = [
  { name: 'Free', price: '$0', audits: '5 audits / month', features: ['Upload preview', 'Basic AI score', 'Hook and caption checks', 'Community support'] },
  { name: 'Pro Creator', price: '$29', audits: '150 audits / month', featured: true, features: ['Full AI report dashboard', 'Timeline heatmap', 'PDF exports', 'Best thumbnail second', 'Caption and hashtag generation'] },
  { name: 'Agency', price: '$149', audits: 'Unlimited team audits', features: ['Team workspaces', 'Client reporting', 'API access', 'Compare against viral videos', 'Priority model tuning'] },
];

export default function PricingPage() {
  return (
    <main>
      <Section className="pt-20 text-center">
        <Badge icon={CreditCard}>Creator-friendly subscriptions</Badge>
        <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-black tracking-tight">Start free. Upgrade when every upload matters.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">Stripe-ready plan structure for solo creators, faceless content brands, and agencies scaling across TikTok, Reels, and Shorts.</p>
        <div className="mt-12 grid gap-5 text-left lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(plan.featured && 'border-neon/50 bg-neon/10 shadow-glow')}>
              {plan.featured && <span className="mb-4 inline-flex rounded-full bg-neon px-3 py-1 text-xs font-black text-ink">Most popular</span>}
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <div className="mt-4 flex items-end gap-2"><span className="text-5xl font-black">{plan.price}</span><span className="pb-2 text-slate-400">/mo</span></div>
              <p className="mt-2 text-slate-400">{plan.audits}</p>
              <Link href="/upload" className={cn('mt-6 inline-flex w-full justify-center rounded-full px-5 py-3 font-black', plan.featured ? 'bg-neon text-ink' : 'bg-white text-ink')}>Start auditing</Link>
              <ul className="mt-6 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm text-slate-300"><Check className="h-5 w-5 text-neon" />{feature}</li>)}</ul>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
