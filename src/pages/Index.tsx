import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const weddingDate = new Date('2026-08-06T12:15:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

  const galleryImages = [
    'https://cdn.poehali.dev/projects/815cbadf-2537-4302-b45f-a54b8c125829/files/3d06be8e-5ca3-4618-9bb5-9cae487e9b91.jpg',
    'https://cdn.poehali.dev/projects/815cbadf-2537-4302-b45f-a54b8c125829/files/310c3a5b-07e0-4dd5-b056-c79da837aeea.jpg',
    'https://cdn.poehali.dev/projects/815cbadf-2537-4302-b45f-a54b8c125829/files/5b1c5ddd-2017-453d-a10a-03b2f8a2f5c8.jpg',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-muted/30">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-6 flex-wrap">
            {['hero', 'invitation', 'dresscode', 'program', 'gifts', 'gallery', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {section === 'hero' && 'Главная'}
                {section === 'invitation' && 'Приглашение'}
                {section === 'dresscode' && 'Дресс-код'}
                {section === 'program' && 'Программа'}
                {section === 'gifts' && 'Подарки'}
                {section === 'gallery' && 'Галерея'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <img 
              src="https://cdn.poehali.dev/files/Мы.jpg"
              alt="Елизавета и Павел"
              className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl shadow-2xl object-cover border-4 border-white/50"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-light mb-4 text-primary">Елизавета & Павел</h1>
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

      <section id="invitation" className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('invitation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Дорогие гости!</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </div>

          <Card className={`bg-white/80 backdrop-blur border-primary/20 mb-8 transition-all duration-700 delay-200 ${visibleSections.has('invitation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CardContent className="p-12 text-center">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Узнали этих малышей? Время пролетело незаметно. И вот наступил момент, когда наши детские мечты стали реальностью. 
                Разделите с нами это главное событие лета - подарите нам своё внимание и поддержку!
              </p>
              <img 
                src="https://cdn.poehali.dev/files/Мы.jpg"
                alt="Елизавета и Павел"
                className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-2xl shadow-xl object-cover"
              />
            </CardContent>
          </Card>

          <Card className={`bg-white/80 backdrop-blur border-primary/20 transition-all duration-700 delay-500 ${visibleSections.has('invitation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CardContent className="p-12 text-center">
              <div className="mb-6 text-6xl">💌</div>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Дорогие наши друзья и родные! Это официальное приглашение на нашу свадьбу! 
                А получили вы его потому, что мы очень хотим видеть вас в этот день рядом с нами!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="dresscode" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('dresscode') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Дресс-код</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </div>

          <Card className={`bg-white/80 backdrop-blur border-primary/20 mb-12 transition-all duration-700 delay-200 ${visibleSections.has('dresscode') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-medium mb-6">Цветовая палитра</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Будем рады видеть вас в нарядах оливковых, бежевых, кремовых и белых оттенков
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ backgroundColor: '#8B9168' }}></div>
                  <p className="text-sm text-muted-foreground">Оливковый</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ backgroundColor: '#D4C5B0' }}></div>
                  <p className="text-sm text-muted-foreground">Бежевый</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ backgroundColor: '#F5F1E8' }}></div>
                  <p className="text-sm text-muted-foreground">Кремовый</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-muted mx-auto mb-2" style={{ backgroundColor: '#FFFFFF' }}></div>
                  <p className="text-sm text-muted-foreground">Белый</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur border-primary/20 animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-4 text-center">Для мужчин</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <img 
                    src="https://cdn.poehali.dev/files/ом1.jpg"
                    alt="Мужской образ 1"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <img 
                    src="https://cdn.poehali.dev/files/ом2.jpg"
                    alt="Мужской образ 2"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <img 
                    src="https://cdn.poehali.dev/files/ом3.jpg"
                    alt="Мужской образ 3"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <img 
                    src="https://cdn.poehali.dev/files/ом4.jpg"
                    alt="Мужской образ 4"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                </div>
                <img 
                  src="https://cdn.poehali.dev/files/образы м.jpg"
                  alt="Мужские образы"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            <Card className={`bg-white/80 backdrop-blur border-primary/20 transition-all duration-700 delay-700 ${visibleSections.has('dresscode') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-4 text-center">Для женщин</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <img 
                    src="https://cdn.poehali.dev/files/ож2.jpg"
                    alt="Женский образ 1"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <img 
                    src="https://cdn.poehali.dev/files/ож3.jpg"
                    alt="Женский образ 2"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <img 
                    src="https://cdn.poehali.dev/files/ож4.jpg"
                    alt="Женский образ 3"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <img 
                    src="https://cdn.poehali.dev/files/ож5.jpg"
                    alt="Женский образ 4"
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                </div>
                <img 
                  src="https://cdn.poehali.dev/files/образы.jpg"
                  alt="Женские образы"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="program" className="py-24 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('program') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Программа торжества</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              { time: '11:40', title: 'Сбор гостей', icon: 'Users', desc: 'Встреча и приветствие гостей' },
              { time: '12:15', title: 'Церемония регистрации', icon: 'Heart', desc: 'Торжественная регистрация брака' },
              { time: '16:00', title: 'Фуршет', icon: 'Wine', desc: 'Легкие закуски и шампанское' },
              { time: '16:30', title: 'Банкет', icon: 'Utensils', desc: 'Праздничный ужин с развлечениями' },
              { time: '23:00', title: 'Завершение вечера', icon: 'Moon', desc: 'Прощание и благодарность' },
            ].map((item, index) => (
              <Card key={index} className={`bg-white/80 backdrop-blur border-primary/20 hover:shadow-lg transition-all duration-700 ${visibleSections.has('program') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-2xl font-bold text-primary mb-1">{item.time}</div>
                    <div className="text-xl font-medium mb-1">{item.title}</div>
                    <div className="text-muted-foreground">{item.desc}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gifts" className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('gifts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Реестр подарков</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </div>

          <Card className={`bg-white/80 backdrop-blur border-primary/20 transition-all duration-700 delay-200 ${visibleSections.has('gifts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CardContent className="p-8 text-center">
              <div className="mb-6 text-6xl">🎁</div>
              <h3 className="text-2xl font-medium mb-4">Ваше присутствие - лучший подарок!</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Но если вы хотите нас порадовать, мы будем благодарны за вклад в наше свадебное путешествие 
                или небольшую помощь в обустройстве нашего семейного гнездышка.
              </p>
              
              <div className="space-y-4 max-w-md mx-auto">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-2">Банковская карта</div>
                  <div className="text-sm text-muted-foreground">2200 7000 1234 5678</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-2">СБП</div>
                  <div className="text-sm text-muted-foreground">+7 (900) 123-45-67</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="gallery" className="py-24 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Наша галерея</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className={`hover-scale rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img 
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('contacts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Детали события</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`bg-white/80 backdrop-blur border-primary/20 transition-all duration-700 delay-200 ${visibleSections.has('contacts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-8">
                <Icon name="MapPin" size={32} className="text-primary mb-4" />
                <h3 className="text-2xl font-medium mb-3">Место проведения</h3>
                <p className="text-muted-foreground mb-4">
                  Банкетный зал "Романтика"<br />
                  ул. Садовая, 15<br />
                  Москва, 101000
                </p>
                <Button variant="outline" className="w-full">
                  <Icon name="Navigation" size={18} className="mr-2" />
                  Построить маршрут
                </Button>
              </CardContent>
            </Card>

            <Card className={`bg-white/80 backdrop-blur border-primary/20 transition-all duration-700 delay-500 ${visibleSections.has('contacts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-8">
                <Icon name="Users" size={32} className="text-primary mb-4" />
                <h3 className="text-2xl font-medium mb-3">Контакты организаторов</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Phone" size={18} />
                    <span>+7 (900) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Mail" size={18} />
                    <span>wedding@example.com</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Написать в WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className={`mt-8 bg-primary/10 backdrop-blur border-primary/30 transition-all duration-700 delay-700 ${visibleSections.has('contacts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-medium mb-3">Дресс-код</h3>
              <p className="text-muted-foreground text-lg">
                Мы будем рады видеть вас в нарядах пастельных оттенков: 
                розовый, лавандовый, персиковый, кремовый
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

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