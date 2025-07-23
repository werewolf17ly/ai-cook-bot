import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ExternalLink, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  category: string;
}

interface Alternative {
  id: string;
  name: string;
  price: string;
  store: string;
}

interface CartItem extends Ingredient {
  selected: boolean;
  alternatives: Alternative[];
}

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [finalizing, setFinalizing] = useState(false);
  
  const ingredients = location.state?.ingredients || [];
  const recipeName = location.state?.recipe || "";

  // Инициализация корзины с альтернативами
  const [cartItems, setCartItems] = useState<CartItem[]>(
    ingredients.map((ingredient: Ingredient) => ({
      ...ingredient,
      selected: true,
      alternatives: [
        {
          id: `${ingredient.id}-1`,
          name: ingredient.name,
          price: `${Math.floor(Math.random() * 200 + 50)} ₽`,
          store: "Пятёрочка"
        },
        {
          id: `${ingredient.id}-2`, 
          name: `${ingredient.name} (премиум)`,
          price: `${Math.floor(Math.random() * 300 + 100)} ₽`,
          store: "Пятёрочка"
        },
        {
          id: `${ingredient.id}-3`,
          name: `${ingredient.name} (эко)`,
          price: `${Math.floor(Math.random() * 400 + 150)} ₽`,
          store: "Пятёрочка"
        }
      ]
    }))
  );

  const [selectedAlternatives, setSelectedAlternatives] = useState<{[key: string]: Alternative}>(() => {
    const initial: {[key: string]: Alternative} = {};
    cartItems.forEach(item => {
      initial[item.id] = item.alternatives[0];
    });
    return initial;
  });

  const toggleItem = (itemId: string) => {
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAlternative = (itemId: string, alternative: Alternative) => {
    setSelectedAlternatives(prev => ({
      ...prev,
      [itemId]: alternative
    }));
  };

  const handleFinalizeCart = async () => {
    const selectedItems = cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      toast.error("Выберите хотя бы один ингредиент");
      return;
    }

    setFinalizing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Генерация ссылок для каждого выбранного продукта
      const productLinks = selectedItems.map(item => {
        const alternative = selectedAlternatives[item.id];
        const searchName = encodeURIComponent(alternative.name);
        return `https://5ka.ru/search/?text=${searchName}`;
      });

      // В реальном телеграм боте здесь был бы вызов API
      console.log("Product links:", productLinks);
      
      toast.success("Корзина отправлена! Ссылки на продукты будут в боте.");
      
      // Возврат к главной странице
      navigate("/", { 
        state: { 
          message: "Корзина подтверждена! Проверьте бота для получения ссылок на продукты." 
        } 
      });
    } catch (error) {
      toast.error("Ошибка при оформлении корзины");
    } finally {
      setFinalizing(false);
    }
  };

  if (!ingredients.length) {
    navigate("/");
    return null;
  }

  const selectedCount = cartItems.filter(item => item.selected).length;
  const totalPrice = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => {
      const price = parseInt(selectedAlternatives[item.id]?.price || "0");
      return sum + price;
    }, 0);

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
            К рецепту
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <Card className="bg-gradient-warm text-white border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">
                <ShoppingBag className="inline-block mr-2 h-6 w-6" />
                Корзина для: {recipeName}
              </CardTitle>
              <p className="text-white/90">
                Выберите продукты и их альтернативы для покупки
              </p>
            </CardHeader>
          </Card>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className={`transition-all ${item.selected ? 'ring-2 ring-primary/30 bg-card' : 'bg-muted/50'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          item.selected 
                            ? 'bg-primary border-primary text-primary-foreground' 
                            : 'border-muted-foreground'
                        }`}
                      >
                        {item.selected && <Check className="h-4 w-4" />}
                      </button>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.amount} • {item.category}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{item.amount}</Badge>
                  </div>
                </CardHeader>

                {item.selected && (
                  <CardContent>
                    <h4 className="font-medium mb-3">Выберите вариант:</h4>
                    <div className="space-y-2">
                      {item.alternatives.map((alternative) => (
                        <button
                          key={alternative.id}
                          onClick={() => selectAlternative(item.id, alternative)}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            selectedAlternatives[item.id]?.id === alternative.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-accent'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{alternative.name}</div>
                              <div className="text-sm text-muted-foreground">{alternative.store}</div>
                            </div>
                            <div className="font-semibold text-primary">{alternative.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-lg font-semibold mb-4">
                <span>Выбрано товаров: {selectedCount}</span>
                <span>Примерная сумма: {totalPrice} ₽</span>
              </div>
              
              <Button
                onClick={handleFinalizeCart}
                disabled={finalizing || selectedCount === 0}
                variant="recipe"
                size="lg"
                className="w-full h-14 text-lg"
              >
                {finalizing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Оформляем заказ...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Подтвердить корзину ({selectedCount} товаров)
                  </div>
                )}
              </Button>
              
              {selectedCount > 0 && (
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  После подтверждения вы получите ссылки на все выбранные товары в боте
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;