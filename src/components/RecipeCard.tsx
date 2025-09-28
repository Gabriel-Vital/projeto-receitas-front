import { Button } from "@/components/ui/button";
import { Clock, Star, Heart, BookOpen } from "lucide-react";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  difficulty: string;
  rating: number;
  category: string;
  description: string;
  isFavorite?: boolean;
}

const RecipeCard = ({ 
  id,
  title, 
  image, 
  cookTime, 
  difficulty, 
  rating, 
  category, 
  description,
  isFavorite = false 
}: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="recipe-image w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Favorite Button */}
        <Button 
          variant="glass" 
          size="icon" 
          className="absolute top-3 right-3 h-8 w-8"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
        </Button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium">
          {category}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{difficulty}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full" variant="outline">
          Ver Receita
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;