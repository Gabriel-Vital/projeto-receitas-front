import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  difficulty: string;
  rating: number;
  category: string;
  ingredients: string[];
  instructions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const recipesApi = {
  getAll: () => api.get<Recipe[]>('/recipes'),
  getById: (id: string) => api.get<Recipe>(`/recipes/${id}`),
  create: (recipe: Omit<Recipe, 'id'>) => api.post<Recipe>('/recipes', recipe),
  update: (id: string, recipe: Partial<Recipe>) => api.put<Recipe>(`/recipes/${id}`, recipe),
  delete: (id: string) => api.delete(`/recipes/${id}`),
};

export default api;