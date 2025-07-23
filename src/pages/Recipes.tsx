import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  difficulty: "Легко" | "Средне" | "Сложно";
  calories: number;
}

const Recipes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const query = location.state?.query || "";

  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }
    generateRecipes(query);
  }, [query, navigate]);

  const generateRecipes = async (searchQuery: string) => {
    setLoading(true);
    try {
      // Симуляция ИИ генерации рецептов
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRecipes: Recipe[] = [
        {
          id: "1",
          title: `Итальянская паста по запросу "${searchQuery}"`,
          description: "Ароматная паста с свежими помидорами, базиликом и моцареллой",
          cookTime: 25,
          servings: 4,
          difficulty: "Легко",
          calories: 450
        },
        {
          id: "2", 
          title: `Домашний суп "${searchQuery}"`,
          description: "Наваристый суп с овощами и специями по особому рецепту",
          cookTime: 45,
          servings: 6,
          difficulty: "Средне",
          calories: 320
        },
        {
          id: "3",
          title: `Запеченная рыба в стиле "${searchQuery}"`,
          description: "Нежная рыба, запеченная с травами и лимоном",
          cookTime: 35,
          servings: 2,
          difficulty: "Средне",
          calories: 380
        },
        {
          id: "4",
          title: `Веганский салат "${searchQuery}"`,
          description: "Свежий и полезный салат с авокадо и киноа",
          cookTime: 15,
          servings: 3,
          difficulty: "Легко",
          calories: 290
        },
        {
          id: "5",
          title: `Десерт по мотивам "${searchQuery}"`,
          description: "Нежный десерт с ягодами и кремом",
          cookTime: 30,
          servings: 8,
          difficulty: "Сложно",
          calories: 520
        }
      ];
      
      setRecipes(mockRecipes);
      toast.success("Рецепты сгенерированы!");
    } catch (error) {
      toast.error("Ошибка при генерации рецептов");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 mx-auto text-primary animate-spin" />
          <h2 className="text-2xl font-semibold text-foreground">Генерирую рецепты...</h2>
          <p className="text-muted-foreground">ИИ подбирает лучшие рецепты по вашему запросу</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к поиску
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Рецепты по запросу: "{query}"
          </h1>
          <p className="text-muted-foreground">
            ИИ сгенерировал {recipes.length} рецептов специально для вас
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onSelect={handleRecipeSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;