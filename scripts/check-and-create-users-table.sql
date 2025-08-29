-- Script para verificar e criar a tabela users
-- Execute este script no SQL Editor do Supabase

-- Verificar se a tabela users existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        -- Criar tabela de usuários com permissões
        CREATE TABLE public.users (
            id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
            email TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member', 'guest')),
            permissions TEXT[] DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Habilitar RLS
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

        -- Políticas RLS para users
        CREATE POLICY "Users can view their own data" ON public.users
            FOR SELECT USING (auth.uid() = id);

        CREATE POLICY "Users can update their own data" ON public.users
            FOR UPDATE USING (auth.uid() = id);

        CREATE POLICY "Admins can view all users" ON public.users
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM public.users 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );

        CREATE POLICY "Admins can update all users" ON public.users
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM public.users 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );

        -- Função para criar usuário automaticamente
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO public.users (id, email, role, permissions)
            VALUES (
                NEW.id,
                NEW.email,
                'member',
                ARRAY[
                    'dashboard:read',
                    'projects:read',
                    'events:read',
                    'tasks:read',
                    'finance:read'
                ]
            );
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        -- Trigger para criar usuário automaticamente
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

        -- Função para atualizar updated_at
        CREATE OR REPLACE FUNCTION public.update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Trigger para atualizar updated_at
        CREATE TRIGGER update_users_updated_at
            BEFORE UPDATE ON public.users
            FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

        RAISE NOTICE 'Tabela users criada com sucesso!';
    ELSE
        RAISE NOTICE 'Tabela users já existe!';
    END IF;
END $$;

-- Verificar se a tabela foi criada
SELECT 
    table_name, 
    table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'users'; 