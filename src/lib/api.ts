import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("auth_token");

    // Add the token to the Authorization header
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image?: string;
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
  getAll: () => api.get<Recipe[]>("/recipes"),
  getById: (id: string) => api.get<Recipe>(`/recipes/${id}`),
  create: (recipe: Omit<Recipe, "id">) => api.post<Recipe>("/recipes", recipe),
  update: (id: string, recipe: Partial<Recipe>) =>
    api.put<Recipe>(`/recipes/${id}`, recipe),
  delete: (id: string) => api.delete(`/recipes/${id}`),
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  login: (data: LoginData) => api.post<AuthResponse>("/auth/login", data),
  register: (data: Omit<RegisterData, "confirmPassword">) =>
    api.post<AuthResponse>("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  me: () => api.get<User>("/auth/me"),
};

export default api;
