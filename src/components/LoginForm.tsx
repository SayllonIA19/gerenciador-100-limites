
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-900 to-black p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="text-red-500 text-2xl font-bold mb-2">
            100 Limites 💯
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Bem-vindo à Academia Lendár[LA]
            </h1>
            <p className="text-gray-300">
              {isSignup ? "Crie sua conta com e-mail e senha." : "Digite o seu e-mail abaixo para continuar."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.nome@academialendaria.ai"
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500"
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
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500 pr-10"
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
              {isLoading ? (isSignup ? "Cadastrando..." : "Entrando...") : (isSignup ? "Criar conta" : "Continuar com E-mail")}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-400">
            {isSignup ? "Já tem uma conta?" : "Novo por aqui?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-red-500 hover:text-red-400 underline"
            >
              {isSignup ? "Entrar" : "Criar conta"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            Ao continuar, você concorda com nossos{' '}
            <a href="#" className="text-red-500 hover:text-red-400 underline">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="#" className="text-red-500 hover:text-red-400 underline">
              Política de Privacidade
            </a>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
