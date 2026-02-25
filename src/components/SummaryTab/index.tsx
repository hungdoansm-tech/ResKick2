import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Save, Sparkles, CheckCircle2, FileText, Link2 } from 'lucide-react';
import { TextInput } from './TextInput';
import { UrlInput } from './UrlInput';
import { StoryBox } from '@/components/StoryBox';
import { generateSummary } from '@/lib/api';
import { SummaryStyle, STYLE_LABELS, SummaryRecord } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function SummaryTab() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState<SummaryStyle>('concise');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [summaries, setSummaries] = useLocalStorage<SummaryRecord[]>('reskick-summaries', []);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setSummary('');
    setNoteSaved(false);
    try {
      const result = await generateSummary(text.slice(0, 5000), style);
      setSummary(result);
      const record: SummaryRecord = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        input: text.slice(0, 500),
        inputType: 'text',
        style,
        summary: result,
      };
      setSummaries(prev => [record, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = () => {
    if (!note.trim() || !summaries[0]) return;
    setSummaries(prev => {
      const updated = [...prev];
      updated[0] = { ...updated[0], note: note.trim() };
      return updated;
    });
    setNoteSaved(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <StoryBox />

      <div className="glass-card-elevated p-6 space-y-6">
        <Tabs defaultValue="text">
          <TabsList className="w-full grid grid-cols-2 glass-card p-1 h-auto">
            <TabsTrigger value="text" className="rounded-xl py-2.5 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
              <FileText className="h-4 w-4 mr-1.5" /> Dán văn bản
            </TabsTrigger>
            <TabsTrigger value="url" className="rounded-xl py-2.5 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
              <Link2 className="h-4 w-4 mr-1.5" /> Nhập URL
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-5">
            <TextInput value={text} onChange={setText} />
          </TabsContent>
          <TabsContent value="url" className="mt-5">
            <UrlInput onContentFetched={content => setText(content)} />
          </TabsContent>
        </Tabs>

        {/* Style selector */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">Chọn kiểu tóm tắt</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(STYLE_LABELS) as SummaryStyle[]).map(s => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 group ${
                  style === s
                    ? 'gradient-primary border-transparent text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'bg-background/50 border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5'
                }`}
              >
                <span className="text-sm font-semibold block mb-0.5">{STYLE_LABELS[s].label}</span>
                <span className={`text-xs leading-relaxed ${style === s ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {STYLE_LABELS[s].description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className="w-full gradient-primary-vibrant glow-button border-0 text-primary-foreground h-13 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
        >
          {loading ? (
            <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Đang tóm tắt...</>
          ) : (
            <><Sparkles className="h-5 w-5 mr-2" /> Tóm tắt ngay</>
          )}
        </Button>

        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive animate-slide-up">
            {error}
          </div>
        )}
      </div>

      {summary && (
        <div className="glass-card-elevated p-6 space-y-4 animate-slide-up relative overflow-hidden">
          {/* Success accent bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-primary to-accent" />
          
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h3 className="font-display font-bold text-lg">Kết quả tóm tắt</h3>
          </div>
          <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{summary}</p>
          <p className="text-xs text-muted-foreground italic bg-muted/30 rounded-lg p-3">
            ⚠️ Bản tóm tắt chỉ là bước khởi đầu, không thay thế việc đọc tài liệu gốc.
          </p>

          <div className="flex gap-2 items-center pt-3 border-t border-border/30">
            <Input
              value={note}
              onChange={e => { setNote(e.target.value); setNoteSaved(false); }}
              placeholder="Thêm ghi chú cho bản tóm tắt này..."
              className="bg-background/50 rounded-xl"
            />
            <Button onClick={handleSaveNote} disabled={!note.trim()} variant="outline" size="icon" className="rounded-xl shrink-0">
              <Save className="h-4 w-4" />
            </Button>
          </div>
          {noteSaved && <p className="text-xs text-success font-medium">✅ Đã lưu ghi chú!</p>}
        </div>
      )}
    </div>
  );
}
