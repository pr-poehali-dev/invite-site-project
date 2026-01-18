import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  scrollToSection: (id: string) => void;
}

const HeroSection = ({ timeLeft, scrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center gap-8 md:gap-16 mb-8">
          <div className="text-center">
            <img 
              src="https://cdn.poehali.dev/files/Лиза.jpg"
              alt="Елизавета"
              className="w-32 h-32 md:w-48 md:h-48 rounded-2xl shadow-2xl object-cover border-4 border-white/50 mb-4"
            />
            <h2 className="text-3xl md:text-5xl font-light text-primary">Елизавета</h2>
          </div>
          <div className="text-4xl md:text-6xl font-light text-primary">
            &
          </div>
          <div className="text-center">
            <img 
              src="https://cdn.poehali.dev/files/Паша 2.jpg"
              alt="Павел"
              className="w-32 h-32 md:w-48 md:h-48 rounded-2xl shadow-2xl object-cover border-4 border-white/50 mb-4"
            />
            <h2 className="text-3xl md:text-5xl font-light text-primary">Павел</h2>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-light mb-4 text-primary opacity-0 h-0 overflow-hidden">Елизавета & Павел</h1>
        <p className="text-xl md:text-2xl font-medium text-primary mb-2">
          От детской мечты к реальности
        </p>
        <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-8">
          Приглашают вас на торжество
        </p>
        <div className="flex items-center justify-center gap-2 text-xl mb-12">
          <Icon name="Calendar" size={24} className="text-primary" />
          <span className="font-medium">6 августа 2026 • 12:15</span>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <Card key={unit} className="bg-white/60 backdrop-blur border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {unit === 'days' && 'дней'}
                  {unit === 'hours' && 'часов'}
                  {unit === 'minutes' && 'минут'}
                  {unit === 'seconds' && 'секунд'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          size="lg" 
          className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90"
          onClick={() => scrollToSection('invitation')}
        >
          Узнать больше
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;