import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  difficulty: "Легко" | "Средне" | "Сложно";
  image?: string;
  calories?: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легко": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Средне": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Сложно": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-recipe bg-gradient-secondary border-accent/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {recipe.title}
          </CardTitle>
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
      </CardHeader>

      <CardContent className="py-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime} мин</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} порции</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.calories || 0} ккал</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button 
          onClick={() => onSelect(recipe)}
          variant="recipe" 
          className="w-full"
        >
          Открыть рецепт
        </Button>
      </CardFooter>
    </Card>
  );
};