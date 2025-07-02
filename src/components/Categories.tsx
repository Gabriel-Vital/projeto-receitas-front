import { Button } from "@/components/ui/button";
import { 
  UtensilsCrossed, 
  Coffee, 
  Cake, 
  Salad, 
  Pizza, 
  IceCream,
  Fish,
  Beef
} from "lucide-react";

const Categories = () => {
  const categories = [
    { name: "Massas", icon: UtensilsCrossed, count: "150+", color: "from-orange-500 to-red-500" },
    { name: "Sobremesas", icon: Cake, count: "200+", color: "from-pink-500 to-purple-500" },
    { name: "Saladas", icon: Salad, count: "120+", color: "from-green-500 to-emerald-500" },
    { name: "Pizzas", icon: Pizza, count: "80+", color: "from-yellow-500 to-orange-500" },
    { name: "Frutos do Mar", icon: Fish, count: "90+", color: "from-blue-500 to-cyan-500" },
    { name: "Carnes", icon: Beef, count: "160+", color: "from-red-600 to-pink-600" },
    { name: "Bebidas", icon: Coffee, count: "70+", color: "from-amber-600 to-orange-600" },
    { name: "Gelados", icon: IceCream, count: "50+", color: "from-cyan-400 to-blue-500" },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore por <span className="gradient-text">Categorias</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encontre exatamente o que você está procurando navegando pelas nossas categorias
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.name}
                variant="glass"
                className={`h-auto p-6 flex-col gap-3 hover-glow animate-fade-in group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{category.count}</div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Ver Todas as Categorias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;