/**
 * Fire-and-forget notification via ntfy.sh (no API key needed).
 * Set NTFY_TOPIC in server env to receive push notifications on new leads.
 * Graceful no-op when unset.
 */
export async function notify(title: string, message: string): Promise<void> {
  const topic = import.meta.env.NTFY_TOPIC;
  if (!topic || topic === '__set_in_env__') return;
  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      headers: { Title: title, Priority: '4', Tags: 'bell' },
      body: message,
    });
  } catch (err) {
    console.warn('[notify] failed', err);
  }
}
