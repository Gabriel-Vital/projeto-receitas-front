import { Button } from "@/components/ui/button";
import { ChefHat, Star } from "lucide-react";
import heroImage from "@/assets/hero-kitchen.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 text-sm">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-primary-foreground">Mais de 1000 receitas</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Descubra o
              <span className="gradient-text block">Sabor Perfeito</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore receitas incríveis, compartilhe seus pratos favoritos e transforme sua cozinha em um verdadeiro laboratório culinário.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="hero" className="animate-glow-pulse">
              <ChefHat className="h-5 w-5" />
              Explorar Receitas
            </Button>
            <Button variant="glass" size="hero">
              Ver Categorias
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Receitas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Usuários</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;