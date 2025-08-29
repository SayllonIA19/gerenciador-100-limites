import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import limitesLogo from '@/assets/limites-logo.png';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup) {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl }
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cadastro realizado",
          description: "Verifique seu e-mail para confirmar a conta.",
        });
      }
    } else {
      const { error } = await signIn(email, password);
      if (!error) {
        // AuthContext cuidará do redirecionamento
      }
    }

    setIsLoading(false);
  };

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={limitesLogo} 
            alt="100 Limites Logo" 
            className="w-20 h-20 rounded-full"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-foreground mb-8">
          100 Limites
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full shadow-sm pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
=======
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
      <Card className="w-full max-w-sm h-300px bg-[#161616] border-[#808080] shadow-2xl rounded-2x1">
        <CardHeader className="text-center pb-2">
          <div className="text-red-500 text-2xl font-bold mb-2 font-montserrat">
            100 Limites 💯
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Bem-vindo
            </h1>
            <p className="text-gray-300">
              <em>Digite o seu e-mail abaixo para continuar.</em>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.nome@100limites.com"
                className="bg-gray-800 border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="bg-gray-800 border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-red-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {isLoading ? "Entrando..." : "Continuar com E-mail"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-400">
            <a href="/forgot-password" className="text-red-500 hover:text-red-400 underline">
              Esqueceu sua senha?
            </a>
          </div>

          <div className="text-center text-xs text-gray-400">
            Ao continuar, você concorda com nossos termos de serviço
>>>>>>> Stashed changes
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
          >
            {isLoading ? (isSignup ? "Cadastrando..." : "Entrando...") : (isSignup ? "Criar conta" : "Entrar")}
          </Button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Esqueceu sua senha?
          </a>
        </div>

        {/* Sign up toggle */}
        <div className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? "Já tem uma conta?" : "Novo por aqui?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            {isSignup ? "Entrar" : "Criar conta"}
          </button>
        </div>
      </div>
    </div>
  );
}
