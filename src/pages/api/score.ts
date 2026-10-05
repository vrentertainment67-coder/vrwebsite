import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { isEmail, str, isBot, json, readBody, FAIL_MSG } from '@/lib/validation';
import { notify } from '@/lib/notify';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);
  if (isBot(body)) return json({ ok: true });

  const url = str(body.url, 300);
  const email = str(body.email, 200);
  const utm = body.utm && typeof body.utm === 'object' ? body.utm : null;

  if (!url) return json({ ok: false, error: 'Please add your website.' }, 400);
  if (!email || !isEmail(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);

  try {
    const supabase = getServerClient();
    const { error } = await supabase.from('score_requests').insert({ url, email, utm });
    if (error) {
      console.error('[api/score] insert error', error);
      return json({ ok: false, error: FAIL_MSG }, 500);
    }
    await notify('New Site Score request', `${url} · ${email}`);
    return json({ ok: true });
  } catch (err) {
    console.error('[api/score]', err);
    return json({ ok: false, error: FAIL_MSG }, 500);
  }
};
