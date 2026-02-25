import { Textarea } from '@/components/ui/textarea';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">Dán văn bản tiếng Anh tại đây</label>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste your English academic text here..."
        className="min-h-[180px] resize-y bg-background/40 backdrop-blur-sm rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Tối đa 5.000 ký tự</p>
        <p className="text-xs text-muted-foreground">{value.length.toLocaleString()} / 5.000</p>
      </div>
    </div>
  );
}
