import { useState } from 'react';
import { Eye, EyeOff, ChefHat, ArrowRight, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { authApi, LoginData, RegisterData } from '@/lib/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login(loginForm);
      
      // Simular armazenamento do token
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${response.data.user.name}!`,
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.response?.data?.message || "Verifique suas credenciais",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (registerForm.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = registerForm;
      const response = await authApi.register(registerData);
      
      // Simular armazenamento do token
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${response.data.user.name}!`,
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro no registro",
        description: error.response?.data?.message || "Erro ao criar conta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    toast({
      title: "Em desenvolvimento",
      description: `Login com ${provider} será implementado em breve`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-elegant flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">DigitalCook</h1>
              <p className="text-sm text-muted-foreground">App de Receitas</p>
            </div>
          </Link>
        </div>

        <Card className="glass-card animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              {isLogin ? 'Entrar na sua conta' : 'Criar conta'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Acesse sua conta para continuar' 
                : 'Crie sua conta para começar'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full glass-button"
                onClick={() => handleSocialAuth('Google')}
              >
                <Mail className="w-4 h-4 mr-2" />
                {isLogin ? 'Entrar' : 'Registrar'} com Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full glass-button"
                onClick={() => handleSocialAuth('GitHub')}
              >
                <Github className="w-4 h-4 mr-2" />
                {isLogin ? 'Entrar' : 'Registrar'} com GitHub
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
                ou
              </span>
            </div>

            {/* Forms */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>

                <Button type="submit" className="w-full glass-button" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Entrando...
                    </div>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full glass-button" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Criando conta...
                    </div>
                  ) : (
                    <>
                      Criar conta
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Toggle between login/register */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <Button
                  variant="link"
                  className="p-0 ml-1 h-auto text-primary"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Criar conta' : 'Fazer login'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}