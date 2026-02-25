import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STYLE_PROMPTS: Record<string, string> = {
  concise: 'Tóm tắt bài viết tiếng Anh sau bằng tiếng Việt trong 2-3 câu ngắn gọn, súc tích.',
  detailed: 'Tóm tắt bài viết tiếng Anh sau bằng tiếng Việt trong 5-7 câu, bao quát các ý chính và luận điểm quan trọng.',
  easy: 'Tóm tắt bài viết tiếng Anh sau bằng tiếng Việt với ngôn ngữ đơn giản, dễ hiểu, như đang giải thích cho một học sinh cấp 3. Tránh dùng thuật ngữ phức tạp.',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, style } = await req.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Vui lòng cung cấp văn bản' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.concise;
    const apiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text.slice(0, 5000) },
        ],
        max_tokens: 1024,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('AI Gateway error:', errText);
      return new Response(JSON.stringify({ error: 'Lỗi khi gọi AI. Vui lòng thử lại.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || 'Không thể tạo tóm tắt';

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Summarize error:', err);
    return new Response(JSON.stringify({ error: 'Đã xảy ra lỗi server' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
