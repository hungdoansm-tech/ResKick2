import { BookOpen, Quote } from 'lucide-react';

export function StoryBox() {
  return (
    <div className="glass-card-elevated p-6 gradient-border animate-fade-in relative overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="gradient-primary-vibrant rounded-2xl p-3 shrink-0 shadow-lg shadow-primary/20">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold gradient-text">Câu chuyện của chúng mình</h3>
          <div className="relative">
            <Quote className="h-4 w-4 text-primary/30 absolute -left-1 -top-1" />
            <p className="text-muted-foreground leading-relaxed italic pl-4 text-[15px]">
              Có lần mình mở một bài báo tiếng Anh để làm bài tập nhóm, nhưng đọc chưa tới 1 phút đã đóng lại vì thấy quá khó. Lúc đó mình nhận ra: đôi khi tụi mình không thiếu khả năng, chỉ thiếu một điểm bắt đầu đủ dễ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
