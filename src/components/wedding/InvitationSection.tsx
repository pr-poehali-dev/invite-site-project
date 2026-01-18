import { Card, CardContent } from '@/components/ui/card';

interface InvitationSectionProps {
  visibleSections: Set<string>;
}

const InvitationSection = ({ visibleSections }: InvitationSectionProps) => {
  return (
    <section id="invitation" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('invitation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Дорогие гости!</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
        </div>

        <Card className={`bg-white/80 backdrop-blur border-primary/20 mb-8 transition-all duration-700 delay-200 ${visibleSections.has('invitation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <CardContent className="p-12 text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Узнали этих малышей?
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Время пролетело незаметно. И вот наступил момент, когда наши детские мечты стали реальностью. 
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
  );
};

export default InvitationSection;
