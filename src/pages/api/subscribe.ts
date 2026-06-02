import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { isEmail, str, isBot, json, readBody } from '@/lib/validation';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);
  if (isBot(body)) return json({ ok: true });

  const email = str(body.email, 200);
  if (!email || !isEmail(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);

  try {
    const supabase = getServerClient();
    // upsert on the unique email so re-subscribing is idempotent
    const { error } = await supabase
      .from('subscribers')
      .upsert({ email }, { onConflict: 'email', ignoreDuplicates: true });
    if (error) {
      console.error('[api/subscribe] insert error', error);
      return json({ ok: false, error: 'Could not subscribe right now.' }, 500);
    }

    const key = import.meta.env.MAILERLITE_API_KEY;
    if (key && key !== '__set_in_env__') {
      try {
        await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.warn('[api/subscribe] MailerLite forward failed', err);
      }
    }

    return json({ ok: true });
  } catch (err) {
    console.error('[api/subscribe]', err);
    return json({ ok: false, error: 'Server not configured.' }, 500);
  }
};
