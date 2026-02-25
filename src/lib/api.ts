import { supabase } from '@/integrations/supabase/client';
import type { SummaryStyle } from '@/types';

export async function generateSummary(text: string, style: SummaryStyle): Promise<string> {
  const { data, error } = await supabase.functions.invoke('summarize', {
    body: { text, style },
  });

  if (error) throw new Error(error.message || 'Không thể tạo tóm tắt');
  if (data?.error) throw new Error(data.error);
  return data.summary;
}

export async function fetchUrlContent(url: string): Promise<string> {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxyUrl);
  if (!res.ok) throw new Error('Không thể tải nội dung từ URL');
  const html = await res.text();
  // Extract text content from HTML
  const doc = new DOMParser().parseFromString(html, 'text/html');
  // Remove scripts and styles
  doc.querySelectorAll('script, style, nav, footer, header').forEach(el => el.remove());
  const text = doc.body?.textContent?.replace(/\s+/g, ' ').trim() || '';
  if (!text) throw new Error('Không tìm thấy nội dung văn bản');
  return text.slice(0, 5000); // Limit to ~5000 chars
}
