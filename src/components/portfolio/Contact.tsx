import { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send, Loader2, Download } from 'lucide-react';
import { toast } from 'sonner';
import { socials, profile, downloadResume, CRM_SUBSCRIBE_URL } from '@/data/portfolio';
import { supabase } from '@/lib/supabase';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import SocialIcon from './SocialIcon';

const inputCls =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-sky-500 focus:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-sky-400/60 dark:focus:bg-white/[0.05]';

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      toast.success(`${text} copied to clipboard`);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error('Could not copy');
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const payload = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    };

    try {
      // Save to database and add to CRM in parallel
      const [dbResult, crmResult] = await Promise.allSettled([
        supabase.from('contact_messages').insert(payload),
        fetch(CRM_SUBSCRIBE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: payload.email,
            name: payload.name || undefined,
            phone: payload.phone || undefined,
            sms_opt_in: smsOptIn === true,
            source: 'contact-form',
            tags: ['portfolio-contact', 'lead'],
            message: payload.message,
          }),
        }),
      ]);

      const dbError =
        dbResult.status === 'rejected' ? dbResult.reason : dbResult.value.error;
      if (dbError) throw dbError;

      if (crmResult.status === 'rejected' || !crmResult.value.ok) {
        console.warn('CRM subscribe failed', crmResult);
      }

      // Fire-and-forget owner notification email (doesn't block the visitor)
      supabase.functions
        .invoke('notify-contact-message', { body: { id: payload.id } })
        .then(({ error }) => error && console.warn('Notification failed', error))
        .catch((err) => console.warn('Notification failed', err));

      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      toast.success("Message sent! I'll get back to you soon.");
    } catch (err) {
      console.error('Contact submit failed', err);
      toast.error('Something went wrong. Please try again or reach me directly.');
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-zinc-200 dark:border-white/5 overflow-hidden">
      <div className="absolute right-0 top-1/3 h-[480px] w-[480px] rounded-full bg-sky-500/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title="Let's build something great together."
          description="Whether you need an AI platform, a full-time engineer, or just want to say hi — my inbox is always open."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Socials */}
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {socials.map((s, i) => (
                <Reveal key={s.key} delay={i * 70}>
                  <div className="group relative flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-sky-400/40 hover:bg-sky-50/40 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-sky-400/30 dark:hover:bg-white/[0.04]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-white/5 dark:text-zinc-300">
                      <SocialIcon name={s.key} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-zinc-500">{s.label}</p>
                      <a
                        href={s.url}
                        target={s.key === 'email' || s.key === 'phone' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="block truncate text-sm font-medium text-zinc-900 hover:text-sky-700 dark:text-white dark:hover:text-sky-400"
                      >
                        {s.handle}
                      </a>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => copy(s.key, s.handle)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white"
                        aria-label={`Copy ${s.label}`}
                      >
                        {copied === s.key ? <Check className="h-4 w-4 text-sky-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <a
                        href={s.url}
                        target={s.key === 'email' || s.key === 'phone' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white"
                        aria-label={`Open ${s.label}`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Resume block */}
            <Reveal delay={200} className="mt-6">
              <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-400/10 via-transparent to-sky-400/5 p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">Resume</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Want the full picture?</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Download my resume for a detailed overview of {profile.yearsExperience} years of experience, skills and education.
                </p>
                <button
                  onClick={downloadResume}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-medium text-white transition-all hover:bg-sky-500 hover:shadow-[0_16px_36px_-18px_rgba(2,132,199,0.55)]"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </button>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal>
            <form onSubmit={submit} noValidate className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-[0_30px_80px_-46px_rgba(15,23,42,0.45)] backdrop-blur md:p-10 dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_30px_80px_-46px_rgba(56,189,248,0.28)]">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center animate-fade-in">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-400">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-white">Thanks for reaching out!</h3>
                  <p className="mt-2 max-w-sm text-zinc-600 dark:text-zinc-400">Your message is on its way. I usually reply within 24 hours.</p>
                  <button type="button" onClick={() => setSent(false)} className="mt-8 text-sm text-sky-700 dark:text-sky-400 link-underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Send me a message</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-zinc-600 dark:text-zinc-400">Name</label>
                      <input value={form.name} onChange={set('name')} placeholder="Jane Doe" className={inputCls} />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-zinc-600 dark:text-zinc-400">Email</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" className={inputCls} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-zinc-600 dark:text-zinc-400">Phone number (optional)</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-zinc-600 dark:text-zinc-400">Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell me about your project or role..."
                      className={`${inputCls} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 text-xs text-zinc-500 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={smsOptIn}
                      onChange={(e) => setSmsOptIn(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-sky-400"
                    />
                    Text me updates. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-4 font-medium text-white transition-colors hover:bg-sky-600 hover:text-white disabled:opacity-60 dark:bg-white dark:text-black"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
