import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { isEmail, str, isBot, json, readBody, FAIL_MSG } from '@/lib/validation';

export const prerender = false;

const SEGMENTS = ['venue', 'artist', 'brand', 'event', 'other'];

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);
  if (isBot(body)) return json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const websiteUrl = str(body.website_url, 300);
  const instagram = str(body.instagram, 120);
  let segment = str(body.segment, 20);

  if (!email || !isEmail(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);
  if (segment && !SEGMENTS.includes(segment)) segment = 'other';

  try {
    const supabase = getServerClient();
    const { error } = await supabase.from('audit_requests').insert({
      name,
      email,
      website_url: websiteUrl,
      instagram,
      segment,
    });
    if (error) {
      console.error('[api/audit] insert error', error);
      return json({ ok: false, error: FAIL_MSG }, 500);
    }

    // Optional: forward to MailerLite as a subscriber (best-effort, non-blocking).
    await maybeSubscribeMailerLite(email, name);

    return json({ ok: true });
  } catch (err) {
    console.error('[api/audit]', err);
    return json({ ok: false, error: FAIL_MSG }, 500);
  }
};

async function maybeSubscribeMailerLite(email: string, name: string | null) {
  const key = import.meta.env.MAILERLITE_API_KEY;
  if (!key || key === '__set_in_env__') return;
  try {
    await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ email, fields: name ? { name } : undefined }),
    });
  } catch (err) {
    console.warn('[api/audit] MailerLite forward failed', err);
  }
}
