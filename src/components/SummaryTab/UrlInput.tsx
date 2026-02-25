import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Loader2 } from 'lucide-react';
import { fetchUrlContent } from '@/lib/api';

interface UrlInputProps {
  onContentFetched: (content: string) => void;
}

export function UrlInput({ onContentFetched }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const content = await fetchUrlContent(url);
      onContentFetched(content);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải nội dung');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Dán URL bài báo tiếng Anh</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="pl-10 bg-background/50 backdrop-blur-sm"
          />
        </div>
        <Button onClick={handleFetch} disabled={loading || !url.trim()} className="gradient-primary border-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Tải'}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
