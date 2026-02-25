interface MetricCardProps {
  emoji: string;
  label: string;
  value: string;
  description?: string;
}

export function MetricCard({ emoji, label, value, description }: MetricCardProps) {
  return (
    <div className="glass-card-elevated p-6 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 animate-slide-up group cursor-default">
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-1.5">{label}</p>
      <p className="text-3xl font-display font-bold gradient-text-vibrant">{value}</p>
      {description && <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed">{description}</p>}
    </div>
  );
}
