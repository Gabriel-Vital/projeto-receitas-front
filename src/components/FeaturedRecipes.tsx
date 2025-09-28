import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { recipesApi, Recipe } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedRecipes = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await recipesApi.getAll();
      
        const sortedRecipes = response.data.sort((a, b) => b.rating - a.rating);
        const topRecipes = sortedRecipes.slice(0, 3);
        
        setFeaturedRecipes(topRecipes);
      } catch (err) {
        setError("Erro ao carregar receitas. Tente novamente mais tarde.");
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Receitas em <span className="gradient-text">Destaque</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Descubra as receitas mais populares e bem avaliadas da nossa comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="glass-card rounded-2xl overflow-hidden h-full">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between items-center pt-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Receitas em <span className="gradient-text">Destaque</span>
            </h2>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Receitas em <span className="gradient-text">Destaque</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra as receitas mais populares e bem avaliadas da nossa comunidade
          </p>
        </div>

        {/* Recipes Grid */}
        {featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <RecipeCard 
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image || "/placeholder-recipe.jpg"}
                  cookTime={recipe.cookTime}
                  difficulty={recipe.difficulty}
                  rating={recipe.rating}
                  category={recipe.category}
                  description={recipe.description}
                  isFavorite={isFavorite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma receita encontrada. Que tal criar a primeira?
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRecipes;