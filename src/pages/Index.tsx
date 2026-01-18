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
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/5fffadb7-d741-406f-be76-25b42a5a2f60', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
      } else {
        console.error('Error submitting form:', data);
        alert('Ошибка при отправке формы. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка при отправке формы. Попробуйте позже.');
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-muted/30">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-primary">Елизавета & Павел</h3>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-light text-primary">Меню</h3>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Закрыть"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                {['hero', 'invitation', 'rsvp', 'dresscode', 'program', 'gifts', 'contacts'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="w-full text-left px-4 py-3 rounded-lg text-lg hover:bg-primary/10 transition-colors"
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
          </div>
        </div>
      )}

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