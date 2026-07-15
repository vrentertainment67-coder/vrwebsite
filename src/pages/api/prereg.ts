import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { isEmail, str, isBot, json, readBody, FAIL_MSG } from '@/lib/validation';

// SSR endpoint — keeps the service role key server-side only.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);

  // Honeypot — silently accept so bots don't learn they were caught.
  if (isBot(body)) return json({ ok: true });

  const name = str(body.name, 120);
  const whatsapp = str(body.whatsapp, 40);
  const email = str(body.email, 200);
  const sizeRaw = Number(body.party_size);
  const partySize = Number.isFinite(sizeRaw) && sizeRaw > 0 ? Math.min(Math.floor(sizeRaw), 50) : 1;

  if (!name) return json({ ok: false, error: 'Please add your name.' }, 400);
  if (!whatsapp || whatsapp.replace(/\D/g, '').length < 8) {
    return json({ ok: false, error: 'A valid WhatsApp number is required.' }, 400);
  }
  if (email && !isEmail(email)) return json({ ok: false, error: 'That email doesn’t look right.' }, 400);

  try {
    const supabase = getServerClient();
    const { error } = await supabase.from('prereg_the_final').insert({
      name,
      whatsapp,
      email,
      party_size: partySize,
    });
    if (error) {
      console.error('[api/prereg] insert error', error);
      return json({ ok: false, error: FAIL_MSG }, 500);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[api/prereg]', err);
    return json({ ok: false, error: FAIL_MSG }, 500);
  }
};
