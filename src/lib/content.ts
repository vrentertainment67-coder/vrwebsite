/**
 * Centralized content data-access layer.
 *
 * ALL Supabase reads for editable content live here (not inline in pages) so a
 * future admin UI can hook in cleanly and pages stay declarative. Every function
 * fails soft: if creds are missing or the table is empty, it returns [] / null
 * rather than throwing, so the build never breaks.
 *
 * TODO(admin-ui): a future /admin page would call matching write helpers here
 * (createPost/updatePost/…) guarded by Supabase auth. Reads stay public-safe.
 */
import { getReadClient } from '@/lib/supabase';

export interface Testimonial {
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  body_md: string | null;
  cover_image: string | null;
  published_at: string | null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = getReadClient();
    const { data } = await supabase
      .from('testimonials')
      .select('name, role, company, quote, avatar')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = getReadClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, body_md, cover_image, published_at')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = getReadClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, body_md, cover_image, published_at')
      .eq('published', true)
      .eq('slug', slug)
      .maybeSingle();
    return data ?? null;
  } catch {
    return null;
  }
}
