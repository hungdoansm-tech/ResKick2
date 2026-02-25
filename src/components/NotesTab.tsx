import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SummaryRecord } from '@/types';
import { StickyNote, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotesTab() {
  const [summaries, setSummaries] = useLocalStorage<SummaryRecord[]>('reskick-summaries', []);
  const withNotes = summaries.filter(s => s.note);

  const removeNote = (id: string) => {
    setSummaries(prev => prev.map(s => s.id === id ? { ...s, note: undefined } : s));
  };

  if (!withNotes.length) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 mx-auto mb-4 flex items-center justify-center">
          <StickyNote className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <p className="text-muted-foreground font-medium">Chưa có ghi chú nào</p>
        <p className="text-sm text-muted-foreground/60 mt-1">Thêm ghi chú sau khi tạo tóm tắt</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <h2 className="font-display text-xl font-bold mb-5">Ghi chú <span className="text-sm font-normal text-muted-foreground ml-1">({withNotes.length})</span></h2>
      {withNotes.map(s => (
        <div key={s.id} className="glass-card p-4 flex items-start justify-between gap-3 hover:scale-[1.005] transition-all duration-300 group">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <StickyNote className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">{s.note}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {s.input.slice(0, 80)}...
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {new Date(s.timestamp).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeNote(s.id)} className="shrink-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
