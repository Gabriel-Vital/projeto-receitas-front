import RecipeCard from "./RecipeCard";
import pastaImage from "@/assets/pasta-dish.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";
import saladImage from "@/assets/fresh-salad.jpg";

const FeaturedRecipes = () => {
  const featuredRecipes = [
    {
      id: "1",
      title: "Pasta Cremosa com Cogumelos",
      image: pastaImage,
      cookTime: "25 min",
      difficulty: "Fácil",
      rating: 4.8,
      category: "Massas",
      description: "Uma deliciosa pasta cremosa com cogumelos frescos e ervas aromáticas. Perfeita para um jantar especial.",
      isFavorite: true
    },
    {
      id: "2", 
      title: "Bolo de Chocolate Decadente",
      image: cakeImage,
      cookTime: "45 min",
      difficulty: "Médio",
      rating: 4.9,
      category: "Sobremesas",
      description: "Um bolo de chocolate úmido e rico, coberto com ganache sedosa e frutas vermelhas frescas.",
      isFavorite: false
    },
    {
      id: "3",
      title: "Salada Mediterranean Fresh",
      image: saladImage,
      cookTime: "15 min", 
      difficulty: "Fácil",
      rating: 4.6,
      category: "Saladas",
      description: "Salada fresca e colorida com vegetais crocantes, abacate e um molho mediterrâneo especial.",
      isFavorite: true
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <RecipeCard {...recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;