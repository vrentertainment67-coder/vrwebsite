import type { APIRoute } from 'astro';
import { getServerClient } from '@/lib/supabase';
import { isEmail, str, isBot, json, readBody, FAIL_MSG } from '@/lib/validation';
import { notify } from '@/lib/notify';

export const prerender = false;

const TYPES = ['venue', 'artist', 'hospitality', 'events', 'other'];

export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);
  if (isBot(body)) return json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const message = str(body.message, 4000);
  const source = str(body.source, 40) ?? 'contact';
  let businessType = str(body.business_type, 20);
  if (businessType && !TYPES.includes(businessType)) businessType = 'other';

  if (!name) return json({ ok: false, error: 'Please add your name.' }, 400);
  if (!email || !isEmail(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);

  try {
    const supabase = getServerClient();
    const { error } = await supabase.from('enquiries').insert({
      name,
      email,
      phone,
      business_type: businessType,
      message,
      source,
    });
    if (error) {
      console.error('[api/enquiry] insert error', error);
      return json({ ok: false, error: FAIL_MSG }, 500);
    }
    await notify('New enquiry', `${name} · ${email}${phone ? ' · ' + phone : ''} · ${businessType ?? '—'}`);
    return json({ ok: true });
  } catch (err) {
    console.error('[api/enquiry]', err);
    return json({ ok: false, error: FAIL_MSG }, 500);
  }
};
