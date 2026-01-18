import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RSVPSectionProps {
  visibleSections: Set<string>;
  formData: {
    name: string;
    attendance: string;
    guests: string;
    alcohol: string[];
    message: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    attendance: string;
    guests: string;
    alcohol: string[];
    message: string;
  }>>;
  formSubmitted: boolean;
  handleAlcoholToggle: (drink: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const RSVPSection = ({ 
  visibleSections, 
  formData, 
  setFormData, 
  formSubmitted, 
  handleAlcoholToggle, 
  handleSubmit 
}: RSVPSectionProps) => {
  return (
    <section id="rsvp" className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-2xl">
        <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('rsvp') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-light mb-4 text-primary">Подтверждение присутствия</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
        </div>

        <Card className={`bg-white/80 backdrop-blur border-primary/20 transition-all duration-700 delay-200 ${visibleSections.has('rsvp') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <CardContent className="p-8">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-medium text-primary mb-2">Спасибо!</h3>
                <p className="text-muted-foreground">Ваш ответ принят. Ждём вас на празднике!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Придёте ли вы? *</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        required
                        checked={formData.attendance === 'yes'}
                        onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Да, обязательно буду!</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={formData.attendance === 'no'}
                        onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                        className="w-4 h-4 text-primary"
                      />
                      <span>К сожалению, не смогу</span>
                    </label>
                  </div>
                </div>

                {formData.attendance === 'yes' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Количество гостей</label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring"
                      >
                        <option value="1">1 человек</option>
                        <option value="2">2 человека</option>
                        <option value="3">3 человека</option>
                        <option value="4">4 человека</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Предпочтения по алкоголю</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Вино белое', 'Вино красное', 'Шампанское', 'Водка', 'Виски', 'Ром', 'Джин'].map((drink) => (
                          <label key={drink} className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-input hover:bg-muted/50 transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.alcohol.includes(drink)}
                              onChange={() => handleAlcoholToggle(drink)}
                              className="w-4 h-4 text-primary rounded"
                            />
                            <span className="text-sm">{drink}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Пожелания или комментарии</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent min-h-[100px]"
                    placeholder="Есть ли у вас пожелания или особые запросы?"
                  />
                </div>

                <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
                  Отправить подтверждение
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;
