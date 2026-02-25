import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SummaryRecord, STYLE_LABELS } from '@/types';
import { History, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HistoryTab() {
  const [summaries, setSummaries] = useLocalStorage<SummaryRecord[]>('reskick-summaries', []);

  const remove = (id: string) => {
    setSummaries(prev => prev.filter(s => s.id !== id));
  };

  if (!summaries.length) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 mx-auto mb-4 flex items-center justify-center">
          <History className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <p className="text-muted-foreground font-medium">Chưa có lịch sử tóm tắt</p>
        <p className="text-sm text-muted-foreground/60 mt-1">Bắt đầu bằng cách tạo tóm tắt đầu tiên</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-bold">Lịch sử <span className="text-sm font-normal text-muted-foreground ml-1">({summaries.length})</span></h2>
        <Button variant="ghost" size="sm" onClick={() => setSummaries([])} className="text-muted-foreground text-xs rounded-xl hover:text-destructive">
          Xóa tất cả
        </Button>
      </div>
      {summaries.map((s, i) => (
        <div key={s.id} className="glass-card p-4 space-y-2 hover:scale-[1.005] transition-all duration-300" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full gradient-primary text-primary-foreground font-medium shadow-sm">
                  {STYLE_LABELS[s.style].label}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(s.timestamp).toLocaleString('vi-VN')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{s.input.slice(0, 100)}...</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(s.id)} className="shrink-0 rounded-xl hover:text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm leading-relaxed border-t border-border/30 pt-2.5">{s.summary}</p>
        </div>
      ))}
    </div>
  );
}
