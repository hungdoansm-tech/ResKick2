import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppSidebar } from '@/components/AppSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SummaryTab } from '@/components/SummaryTab';
import { ResultsTab } from '@/components/ResultsTab';
import { NotesTab } from '@/components/NotesTab';
import { HistoryTab } from '@/components/HistoryTab';
import { Sparkles, Menu, FileText, BarChart3, BookmarkCheck, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mesh-light flex">
      {/* Floating orbs for ambient depth */}
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />

      {/* Desktop sidebar */}
      <AppSidebar className="hidden lg:flex" />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 h-full animate-slide-in-right" style={{ animationDuration: '0.25s' }}>
            <AppSidebar className="bg-background" />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 relative z-10">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 backdrop-blur-2xl border-b border-border/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="gradient-primary-vibrant rounded-xl p-1.5 shadow-lg shadow-primary/20">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg gradient-text-vibrant">ResKick</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <div className="p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-10 hidden lg:block animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="gradient-primary-vibrant rounded-2xl p-3 shadow-lg shadow-primary/25">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight">
                  Chào mừng đến với <span className="gradient-text-vibrant">ResKick</span>
                </h1>
                <p className="text-muted-foreground text-base mt-1">
                  Vượt qua rào cản khởi đầu khi đọc tài liệu tiếng Anh với tóm tắt AI tiếng Việt
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="summary" className="animate-slide-up">
            <TabsList className="w-full grid grid-cols-4 glass-card p-1.5 mb-8 h-auto">
              <TabsTrigger value="summary" className="rounded-xl py-2.5 px-3 text-sm font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300">
                <FileText className="h-4 w-4 mr-1.5" /> Tóm tắt
              </TabsTrigger>
              <TabsTrigger value="results" className="rounded-xl py-2.5 px-3 text-sm font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300">
                <BarChart3 className="h-4 w-4 mr-1.5" /> Kết quả
              </TabsTrigger>
              <TabsTrigger value="notes" className="rounded-xl py-2.5 px-3 text-sm font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300">
                <BookmarkCheck className="h-4 w-4 mr-1.5" /> Ghi chú
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl py-2.5 px-3 text-sm font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300">
                <Clock className="h-4 w-4 mr-1.5" /> Lịch sử
              </TabsTrigger>
            </TabsList>
            <TabsContent value="summary"><SummaryTab /></TabsContent>
            <TabsContent value="results"><ResultsTab /></TabsContent>
            <TabsContent value="notes"><NotesTab /></TabsContent>
            <TabsContent value="history"><HistoryTab /></TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
