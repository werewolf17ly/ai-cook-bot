import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchInput = ({ onSearch, loading }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Что приготовить? Например: паста с курицей, веганский суп..."
            className="pl-10 h-12 text-base border-accent/30 bg-card/50 backdrop-blur-sm"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          variant="recipe" 
          size="lg"
          disabled={loading || !query.trim()}
          className="h-12 px-6"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-spin" />
              Генерирую...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Найти рецепты
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};