-- Script seguro para criar a tabela users sem conflitos
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

        RAISE NOTICE 'Tabela users criada com sucesso!';
    ELSE
        RAISE NOTICE 'Tabela users já existe!';
    END IF;
END $$;

-- Criar políticas RLS apenas se não existirem
DO $$
BEGIN
    -- Política "Users can view their own data"
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can view their own data'
    ) THEN
        CREATE POLICY "Users can view their own data" ON public.users
            FOR SELECT USING (auth.uid() = id);
        RAISE NOTICE 'Política "Users can view their own data" criada!';
    ELSE
        RAISE NOTICE 'Política "Users can view their own data" já existe!';
    END IF;

    -- Política "Users can update their own data"
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can update their own data'
    ) THEN
        CREATE POLICY "Users can update their own data" ON public.users
            FOR UPDATE USING (auth.uid() = id);
        RAISE NOTICE 'Política "Users can update their own data" criada!';
    ELSE
        RAISE NOTICE 'Política "Users can update their own data" já existe!';
    END IF;

    -- Política "Admins can view all users"
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Admins can view all users'
    ) THEN
        CREATE POLICY "Admins can view all users" ON public.users
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM public.users 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );
        RAISE NOTICE 'Política "Admins can view all users" criada!';
    ELSE
        RAISE NOTICE 'Política "Admins can view all users" já existe!';
    END IF;

    -- Política "Admins can update all users"
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Admins can update all users'
    ) THEN
        CREATE POLICY "Admins can update all users" ON public.users
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM public.users 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );
        RAISE NOTICE 'Política "Admins can update all users" criada!';
    ELSE
        RAISE NOTICE 'Política "Admins can update all users" já existe!';
    END IF;
END $$;

-- Criar função handle_new_user apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user') THEN
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
        RAISE NOTICE 'Função handle_new_user criada!';
    ELSE
        RAISE NOTICE 'Função handle_new_user já existe!';
    END IF;
END $$;

-- Criar trigger apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
        RAISE NOTICE 'Trigger on_auth_user_created criado!';
    ELSE
        RAISE NOTICE 'Trigger on_auth_user_created já existe!';
    END IF;
END $$;

-- Criar função update_updated_at_column apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE OR REPLACE FUNCTION public.update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        RAISE NOTICE 'Função update_updated_at_column criada!';
    ELSE
        RAISE NOTICE 'Função update_updated_at_column já existe!';
    END IF;
END $$;

-- Criar trigger update_users_updated_at apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_users_updated_at'
    ) THEN
        CREATE TRIGGER update_users_updated_at
            BEFORE UPDATE ON public.users
            FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
        RAISE NOTICE 'Trigger update_users_updated_at criado!';
    ELSE
        RAISE NOTICE 'Trigger update_users_updated_at já existe!';
    END IF;
END $$;

-- Verificar se tudo foi criado corretamente
SELECT 'Verificação final:' as status;

SELECT 
    table_name, 
    table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'users';

SELECT 
    policyname,
    tablename
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname; 