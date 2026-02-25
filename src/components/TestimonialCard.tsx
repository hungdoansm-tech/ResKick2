import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
}

export function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <div className="glass-card p-5 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-0.5 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <Quote className="h-5 w-5 text-primary/40 mb-3 group-hover:text-primary/70 transition-colors duration-300" />
      <p className="text-sm leading-relaxed mb-4 text-foreground/85">{quote}</p>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
          {author.split(' ').pop()?.charAt(0)}
        </div>
        <p className="text-xs font-medium text-muted-foreground">{author}</p>
      </div>
    </div>
  );
}
