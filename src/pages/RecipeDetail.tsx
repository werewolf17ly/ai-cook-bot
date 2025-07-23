import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, ShoppingCart, Flame } from "lucide-react";
import { toast } from "sonner";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  category: string;
}

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState(false);
  
  const recipe = location.state?.recipe;

  if (!recipe) {
    navigate("/");
    return null;
  }

  // Мок данные для ингредиентов и КБЖУ
  const ingredients: Ingredient[] = [
    { id: "1", name: "Спагетти", amount: "300г", category: "Крупы и макароны" },
    { id: "2", name: "Помидоры черри", amount: "200г", category: "Овощи" },
    { id: "3", name: "Моцарелла", amount: "150г", category: "Молочные продукты" },
    { id: "4", name: "Базилик свежий", amount: "20г", category: "Зелень" },
    { id: "5", name: "Оливковое масло", amount: "2 ст.л.", category: "Масла" },
    { id: "6", name: "Чеснок", amount: "2 зубчика", category: "Овощи" },
  ];

  const nutrition: NutritionInfo = {
    calories: recipe.calories || 450,
    protein: 18,
    carbs: 65,
    fat: 12
  };

  const instructions = [
    "Отварите спагетти в подсоленной воде согласно инструкции на упаковке",
    "Разрежьте помидоры черри пополам, измельчите чеснок",
    "Разогрейте оливковое масло на сковороде, обжарьте чеснок",
    "Добавьте помидоры, тушите 5-7 минут",
    "Смешайте готовые спагетти с соусом",
    "Добавьте кусочки моцареллы и свежий базилик",
    "Подавайте немедленно, пока сыр не расплавился"
  ];

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/cart", { 
        state: { 
          ingredients, 
          recipe: recipe.title 
        } 
      });
      toast.success("Ингредиенты добавлены в корзину!");
    } catch (error) {
      toast.error("Ошибка при добавлении в корзину");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            К рецептам
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <Card className="bg-gradient-warm text-white border-none">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
                {recipe.title}
              </CardTitle>
              <p className="text-white/90 text-lg">{recipe.description}</p>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{recipe.cookTime} мин</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{recipe.servings} порции</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {recipe.difficulty}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Nutrition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                КБЖУ на порцию
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">{nutrition.calories}</div>
                  <div className="text-sm text-muted-foreground">ккал</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">{nutrition.protein}г</div>
                  <div className="text-sm text-muted-foreground">белки</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">{nutrition.carbs}г</div>
                  <div className="text-sm text-muted-foreground">углеводы</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">{nutrition.fat}г</div>
                  <div className="text-sm text-muted-foreground">жиры</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ингредиенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <div className="font-medium">{ingredient.name}</div>
                      <div className="text-sm text-muted-foreground">{ingredient.category}</div>
                    </div>
                    <Badge variant="outline">{ingredient.amount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Приготовление</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instructions.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-foreground leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add to Cart Button */}
          <div className="sticky bottom-4">
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart}
              variant="recipe"
              size="lg"
              className="w-full h-14 text-lg"
            >
              {addingToCart ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Добавляем...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Добавить в корзину
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;