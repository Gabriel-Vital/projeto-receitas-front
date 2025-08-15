import { Button } from "@/components/ui/button";
import { ChefHat, Search, Heart, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">DigitalCook</h1>
              <p className="text-xs text-muted-foreground">App de Receitas</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 min-w-[300px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar receitas..."
              className="bg-transparent border-0 outline-none flex-1 text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4 flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar receitas..."
            className="bg-transparent border-0 outline-none flex-1 text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;