export type SummaryStyle = 'concise' | 'detailed' | 'easy';

export interface SummaryRecord {
  id: string;
  timestamp: number;
  input: string;
  inputType: 'text' | 'url';
  style: SummaryStyle;
  summary: string;
  note?: string;
}

export interface NoteRecord {
  id: string;
  summaryId: string;
  content: string;
  timestamp: number;
}

export const STYLE_LABELS: Record<SummaryStyle, { label: string; description: string }> = {
  concise: { label: 'Ngắn gọn', description: '2-3 câu tóm lược' },
  detailed: { label: 'Chi tiết', description: '5-7 câu bao quát các ý chính' },
  easy: { label: 'Dễ hiểu', description: 'Giải thích đơn giản như nói chuyện' },
};
