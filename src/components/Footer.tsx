import { Button } from "@/components/ui/button";
import { ChefHat, Heart, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-dark border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">DigitalCook</h3>
                <p className="text-xs text-muted-foreground">App de Receitas</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Transforme sua cozinha em um laboratório culinário. Descubra, compartilhe e saboreie as melhores receitas.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Receitas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categorias</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Favoritos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Perfil</a></li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Populares</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Massas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sobremesas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Saladas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Frutos do Mar</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carnes</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Newsletter</h4>
            <p className="text-muted-foreground text-sm">
              Receba as melhores receitas diretamente no seu email.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Seu email"
                className="w-full bg-card/50 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="w-full" size="sm">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 DigitalCook. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com <Heart className="h-4 w-4 text-primary mx-1" /> para amantes da culinária
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;