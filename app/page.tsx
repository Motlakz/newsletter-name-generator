import { HeroSection } from '@/components/hero-section';
import { NameGenerator } from '@/components/name-generator';
import { BackgroundGradient } from '@/components/background-gradient';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-background">
      <BackgroundGradient />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />
        <NameGenerator />
      </div>
    </main>
  );
}