import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Filter, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { recipesApi, Recipe } from "@/lib/api";
import path from "path";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    cookTime: "",
    difficulty: "Fácil",
    rating: 5,
    category: "Pratos Principais",
    ingredients: [""],
    instructions: [""],
  });
  
  const categories = [
    "Pratos Principais",
    "Sobremesas",
    "Saladas",
    "Aperitivos",
    "Bebidas",
    "Café da Manhã",
  ];

  const difficulties = ["Fácil", "Médio", "Difícil"];

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipesApi.getAll();
      setRecipes(response.data);
    } catch (error) {
      toast({
        title: "Erro",
        description:
          "Erro ao carregar receitas. Verifique se a API está rodando.",
        variant: "destructive",
      });
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate() 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.filter((ing) => ing.trim()),
        instructions: formData.instructions.filter((inst) => inst.trim()),
      };

      if (editingRecipe) {
        await recipesApi.update(editingRecipe.id, recipeData);
        toast({ title: "Sucesso", description: "Receita atualizada!" });
      } else {
        await recipesApi.create(recipeData);
        toast({ title: "Sucesso", description: "Receita criada!" });
      }

      loadRecipes();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar receita",
        variant: "destructive",
      });
    }
  };

  const handleReturn = () => {
    navigate('/')
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta receita?")) return;

    try {
      await recipesApi.delete(id);
      toast({ title: "Sucesso", description: "Receita deletada!" });
      loadRecipes();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar receita",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      rating: recipe.rating,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      cookTime: "",
      difficulty: "Fácil",
      rating: 5,
      category: "Pratos Principais",
      ingredients: [""],
      instructions: [""],
    });
    setEditingRecipe(null);
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? value : ing
      ),
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) =>
        i === index ? value : inst
      ),
    }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-elegant pt-24">
      <div className="container mx-auto px-4 py-8">
        <div onClick={handleReturn}>
          <ArrowLeft size={32} />
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Gerencie suas receitas
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="glass-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Receita
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                    {editingRecipe ? "Editar Receita" : "Nova Receita"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cookTime">Tempo de Preparo</Label>
                      <Input
                        id="cookTime"
                        value={formData.cookTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cookTime: e.target.value,
                          }))
                        }
                        placeholder="ex: 30 min"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">URL da Imagem</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty">Dificuldade</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            difficulty: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((diff) => (
                            <SelectItem key={diff} value={diff}>
                              {diff}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rating">Avaliação</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            rating: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Ingredientes</Label>
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={ingredient}
                          onChange={(e) =>
                            updateIngredient(index, e.target.value)
                          }
                          placeholder="Ingrediente..."
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                          disabled={formData.ingredients.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addIngredient}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Ingrediente
                    </Button>
                  </div>

                  <div>
                    <Label>Instruções</Label>
                    {formData.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Textarea
                          value={instruction}
                          onChange={(e) =>
                            updateInstruction(index, e.target.value)
                          }
                          placeholder="Passo da receita..."
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                          disabled={formData.instructions.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addInstruction}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Instrução
                    </Button>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="glass-button flex-1">
                      {editingRecipe ? "Atualizar" : "Criar"} Receita
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">
                Carregando receitas...
              </p>
            </div>
          ) : (
            <Card className="glass-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receita</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Dificuldade</TableHead>
                    <TableHead>Tempo</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{recipe.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {recipe.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{recipe.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            recipe.difficulty === "Fácil"
                              ? "default"
                              : recipe.difficulty === "Médio"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {recipe.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{recipe.cookTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{recipe.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(recipe)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(recipe.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredRecipes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {recipes.length === 0
                      ? "Nenhuma receita encontrada. Crie sua primeira receita!"
                      : "Nenhuma receita corresponde aos filtros aplicados."}
                  </p>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
