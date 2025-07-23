import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Sparkles, Clock, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-cooking.jpg";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Симуляция поиска
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/recipes", { state: { query } });
    } catch (error) {
      toast.error("Ошибка при поиске рецептов");
      setLoading(false);
    }
  };

  const popularQueries = [
    "Паста с креветками",
    "Веганский суп",
    "Быстрый завтрак",
    "Десерт без сахара",
    "Салат с авокадо"
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  <span className="font-semibold">ИИ Кулинарный Помощник</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Найди идеальный 
                <span className="text-transparent bg-clip-text bg-gradient-primary"> рецепт</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                ИИ сгенерирует персональные рецепты по вашему запросу и поможет найти все ингредиенты в магазинах
              </p>
            </div>

            <SearchInput onSearch={handleSearch} loading={loading} />

            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground">Популярные запросы:</span>
              {popularQueries.map((query) => (
                <Button
                  key={query}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSearch(query)}
                  className="text-sm text-muted-foreground hover:text-primary"
                  disabled={loading}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center group hover:shadow-recipe transition-all duration-300 bg-gradient-secondary border-accent/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>ИИ Генерация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Умный ИИ создает персональные рецепты на основе ваших предпочтений и доступных ингредиентов
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-recipe transition-all duration-300 bg-gradient-secondary border-accent/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Подробные рецепты</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Полные инструкции, список ингредиентов и расчет КБЖУ для каждого рецепта
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-recipe transition-all duration-300 bg-gradient-secondary border-accent/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ChefHat className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Умная корзина</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Автоматический поиск альтернатив для ингредиентов и прямые ссылки на покупку в магазинах
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-warm text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-white/80">Рецептов</div>
            </div>
            <div>
              <div className="text-3xl font-bold">⚡</div>
              <div className="text-white/80">Быстрая генерация</div>
            </div>
            <div>
              <div className="text-3xl font-bold">🛒</div>
              <div className="text-white/80">Умная корзина</div>
            </div>
            <div>
              <div className="text-3xl font-bold">📱</div>
              <div className="text-white/80">В Telegram</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
