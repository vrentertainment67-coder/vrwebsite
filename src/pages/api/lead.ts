import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { isEmail, str, isBot, json, readBody } from '@/lib/validation';

// SSR endpoint — keeps the service role key server-side only.
export const prerender = false;

const SEGMENTS = ['venue', 'artist', 'brand', 'event', 'other'];
const SOURCES = ['homepage', 'service-page', 'referral', 'the-vic-fix', 'ads', 'contact'];

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);

  // Honeypot — silently accept so bots don't learn they were caught.
  if (isBot(body)) return json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 4000);
  const phone = str(body.phone, 40);
  let segment = str(body.segment, 20);
  let source = str(body.source, 30);

  if (!name) return json({ ok: false, error: 'Please add your name.' }, 400);
  if (!email || !isEmail(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);

  if (segment && !SEGMENTS.includes(segment)) segment = 'other';
  if (source && !SOURCES.includes(source)) source = 'homepage';

  try {
    const supabase = getServerClient();
    const { error } = await supabase.from('leads').insert({
      name,
      email,
      phone,
      segment,
      message,
      source: source ?? 'homepage',
    });
    if (error) {
      console.error('[api/lead] insert error', error);
      return json({ ok: false, error: 'Could not submit right now. Please try again.' }, 500);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[api/lead]', err);
    return json({ ok: false, error: 'Server not configured.' }, 500);
  }
};
