import { useState, useEffect } from 'react';
import HeroSection from '@/components/wedding/HeroSection';
import InvitationSection from '@/components/wedding/InvitationSection';
import RSVPSection from '@/components/wedding/RSVPSection';
import InfoSections from '@/components/wedding/InfoSections';

const Index = () => {
  const weddingDate = new Date('2026-08-06T12:15:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: '1',
    alcohol: [] as string[],
    alcoholPriority: [] as string[],
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAlcoholToggle = (drink: string) => {
    setFormData(prev => ({
      ...prev,
      alcohol: prev.alcohol.includes(drink)
        ? prev.alcohol.filter(d => d !== drink)
        : [...prev.alcohol, drink]
    }));
  };

  const handlePriorityChange = (drink: string, priority: string) => {
    setFormData(prev => {
      const newPriority = [...prev.alcoholPriority];
      const index = newPriority.findIndex(item => item.startsWith(drink + ':'));
      
      if (index !== -1) {
        newPriority[index] = `${drink}:${priority}`;
      } else {
        newPriority.push(`${drink}:${priority}`);
      }
      
      return { ...prev, alcoholPriority: newPriority };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-muted/30">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-6 flex-wrap">
            {['hero', 'invitation', 'rsvp', 'dresscode', 'program', 'gifts', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {section === 'hero' && 'Главная'}
                {section === 'invitation' && 'Приглашение'}
                {section === 'rsvp' && 'Подтверждение'}
                {section === 'dresscode' && 'Дресс-код'}
                {section === 'program' && 'Программа'}
                {section === 'gifts' && 'Подарки'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <HeroSection timeLeft={timeLeft} scrollToSection={scrollToSection} />
      <InvitationSection visibleSections={visibleSections} />
      <RSVPSection 
        visibleSections={visibleSections}
        formData={formData}
        setFormData={setFormData}
        formSubmitted={formSubmitted}
        handleAlcoholToggle={handleAlcoholToggle}
        handlePriorityChange={handlePriorityChange}
        handleSubmit={handleSubmit}
      />
      <InfoSections visibleSections={visibleSections} />

      <footer className="py-12 px-4 bg-primary/5 text-center">
        <div className="container mx-auto">
          <p className="text-muted-foreground mb-2">
            С любовью, Елизавета и Павел
          </p>
          <p className="text-sm text-muted-foreground">
            6 августа 2026 • До встречи!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;