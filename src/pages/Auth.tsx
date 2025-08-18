import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import limitesLogo from '@/assets/limites-logo.png';
import { Eye, EyeOff } from 'lucide-react';
import logo100 from '@/assets/img/login/logo.png';



const Auth = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

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
    <div className="min-h-screen flex items-center justify-center bg-white bg-gradient-radial from-blue-200/20 via-transparent">
      <div className="login-card bg-[#111] border border-blue-600/60 rounded-lg p-8 max-w-md w-full shadow-[0_0_25px_rgba(37,99,235,0.4)]">
        {/* Header */}
        <div className="login-header text-center mb-6">
          <img src={logo100} alt="Logo 100 Limites" className="w-1/2 mb-4 mx-auto" />
          <p className="text-white text-lg">Acesse sua conta</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input px-4 py-3 rounded-md text-black border-2 border-transparent focus:border-blue-600 focus:shadow-[0_0_8px_rgba(37,99,235,0.6)] outline-none"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input w-full px-4 py-3 rounded-md text-black border-2 border-transparent focus:border-blue-600 focus:shadow-[0_0_8px_rgba(37,99,235,0.6)] outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`login-button bg-blue-600 text-white font-bold py-3 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] hover:bg-red-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? (isSignup ? 'Cadastrando...' : 'Entrando...') : (isSignup ? 'Criar conta' : 'Entrar')}
          </button>
        </form>

        {/* Links */}
        <div className="forgot-password mt-4 text-center text-sm">
          <a href="#" className="forgot-password-link text-gray-300 hover:text-blue-600">
            Esqueceu a senha?
          </a>
        </div>

      </div>
    </div>
  );
};

export default Auth;
