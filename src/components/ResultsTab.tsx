import { MetricCard } from './MetricCard';
import { TestimonialCard } from './TestimonialCard';
import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const testimonials = [
  { quote: 'Lần đầu mình đọc hết một bài báo tiếng Anh mà không bỏ giữa chừng.', author: 'Bạn N.H' },
  { quote: 'Đọc tóm tắt xong thấy bài không đáng sợ như mình tưởng.', author: 'Bạn T.A' },
  { quote: 'Có nhóm chat thấy mọi người cũng đọc, mình không muốn bị bỏ lại phía sau.', author: 'Bạn M.K' },
  { quote: 'Mình không nghĩ một thứ nhỏ như bản tóm tắt lại có thể giúp ích đến vậy.', author: 'Bạn P.L' },
];

export function ResultsTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold mb-2 gradient-text">Kết quả thử nghiệm</h2>
        <p className="text-sm text-muted-foreground mb-6">Dữ liệu thu thập từ nghiên cứu thực tế với học sinh THPT</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard emoji="📉" label="Giảm rào cản khởi đầu" value="-1.2 điểm" />
          <MetricCard emoji="📈" label="Tần suất bắt đầu đọc" value="+60%" />
          <MetricCard emoji="💪" label="Tự tin hơn" value="85%" />
        </div>
      </div>

      <div className="glass-card-elevated p-6 animate-slide-up-delayed">
        <div className="flex items-center gap-2 mb-5">
          <TrendingDown className="h-5 w-5 text-success" />
          <h3 className="font-display font-bold text-lg">So sánh điểm SRI</h3>
        </div>
        <div className="rounded-xl overflow-hidden border border-border/30">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Nhóm</TableHead>
                <TableHead className="text-center font-semibold">Trước</TableHead>
                <TableHead className="text-center font-semibold">Sau</TableHead>
                <TableHead className="text-center font-semibold">Mức giảm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-primary/5 transition-colors">
                <TableCell className="font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full gradient-primary" />
                    E (có ResKick)
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono">3.8</TableCell>
                <TableCell className="text-center font-mono">2.6</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1 font-bold text-success">
                    <TrendingDown className="h-3.5 w-3.5" /> -1.2
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    C (đối chứng)
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono">3.7</TableCell>
                <TableCell className="text-center font-mono">3.5</TableCell>
                <TableCell className="text-center text-muted-foreground font-mono">-0.2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="animate-slide-up-delayed">
        <h3 className="font-display font-bold text-lg mb-5">💬 Cảm nhận từ người dùng</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} author={t.author} />
          ))}
        </div>
      </div>
    </div>
  );
}
