import React, { useEffect } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  return <LoginForm />;
};

export default Auth;
