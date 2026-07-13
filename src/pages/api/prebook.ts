import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { str, isBot, json, readBody, FAIL_MSG } from '@/lib/validation';

// SSR endpoint — keeps the service role key server-side only.
export const prerender = false;

const PACKAGES = ['entry', 'unlimited', 'vip'];

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);

  // Honeypot — silently accept so bots don't learn they were caught.
  if (isBot(body)) return json({ ok: true });

  const name = str(body.name, 120);
  const whatsapp = str(body.whatsapp, 40);
  const email = str(body.email, 200);
  let pkg = str(body.package, 20);
  const guestsRaw = Number(body.guests);
  const guests = Number.isFinite(guestsRaw) && guestsRaw > 0 ? Math.min(Math.floor(guestsRaw), 50) : 1;

  if (!name) return json({ ok: false, error: 'Please add your name.' }, 400);
  if (!whatsapp) return json({ ok: false, error: 'A WhatsApp number is required.' }, 400);
  if (pkg && !PACKAGES.includes(pkg)) pkg = null;

  try {
    const supabase = getServerClient();
    const { error } = await supabase.from('prebookings').insert({
      name,
      whatsapp,
      email,
      package: pkg,
      guests,
      source: 'the-final-page',
    });
    if (error) {
      console.error('[api/prebook] insert error', error);
      return json({ ok: false, error: FAIL_MSG }, 500);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[api/prebook]', err);
    return json({ ok: false, error: FAIL_MSG }, 500);
  }
};
