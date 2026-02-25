import { Sparkles, BookOpen, StickyNote, Info, Zap, ArrowRight } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SummaryRecord } from '@/types';
import { ThemeToggle } from './ThemeToggle';

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [summaries] = useLocalStorage<SummaryRecord[]>('reskick-summaries', []);
  const noteCount = summaries.filter(s => s.note).length;

  return (
    <aside className={`flex flex-col w-[280px] shrink-0 h-screen sticky top-0 p-3 border-r border-border/30 ${className || ''}`}>
      <div className="glass-card-elevated p-5 space-y-5 flex-1 flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/30">
          <div className="gradient-primary-vibrant rounded-2xl p-2.5 shadow-lg shadow-primary/25">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold gradient-text-vibrant">ResKick</h1>
            <p className="text-[11px] text-muted-foreground tracking-wide">Research Kickstart</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 mb-3">Thống kê</h3>
          <div className="stat-badge">
            <div className="gradient-primary rounded-lg p-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold font-display">{summaries.length}</span>
              <span className="text-xs text-muted-foreground ml-1.5">bản tóm tắt</span>
            </div>
          </div>
          <div className="stat-badge">
            <div className="bg-accent rounded-lg p-1.5">
              <StickyNote className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold font-display">{noteCount}</span>
              <span className="text-xs text-muted-foreground ml-1.5">ghi chú</span>
            </div>
          </div>
        </div>

        {/* Quick guide */}
        <div className="space-y-3 flex-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-1.5">
            <Info className="h-3 w-3" /> Hướng dẫn nhanh
          </h3>
          <div className="space-y-2">
            {[
              'Dán văn bản hoặc URL bài báo',
              'Chọn kiểu tóm tắt phù hợp',
              'Nhấn "Tóm tắt ngay"',
              'Đọc tóm tắt → tự tin đọc bài gốc!',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground group">
                <div className="gradient-primary rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary-foreground mt-0.5 group-hover:shadow-md group-hover:shadow-primary/20 transition-shadow duration-300">
                  {i + 1}
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro tip */}
        <div className="rounded-xl p-3 bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary mb-1">
            <Zap className="h-3 w-3" /> Mẹo hay
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Đọc tóm tắt trước khi đọc bài gốc giúp giảm 60% rào cản khởi đầu!
          </p>
        </div>

        <div className="pt-3 border-t border-border/30 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Giao diện</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
