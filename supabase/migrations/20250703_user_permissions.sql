-- Criar tabela de usuários com permissões
CREATE TABLE IF NOT EXISTS public.users (
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
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
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir usuário administrador padrão (substitua pelo email real)
-- INSERT INTO public.users (id, email, role, permissions) VALUES (
--     '00000000-0000-0000-0000-000000000000', -- Substitua pelo UUID real
--     'admin@exemplo.com',
--     'admin',
--     ARRAY[
--         'dashboard:read', 'dashboard:write',
--         'projects:read', 'projects:write',
--         'collaborators:read', 'collaborators:write',
--         'events:read', 'events:write',
--         'tasks:read', 'tasks:write',
--         'finance:read', 'finance:write',
--         'marketing:read', 'marketing:write',
--         'music:read', 'music:write',
--         'dance:read', 'dance:write',
--         'visual:read', 'visual:write'
--     ]
-- );

-- Comentários
COMMENT ON TABLE public.users IS 'Tabela de usuários com permissões e roles';
COMMENT ON COLUMN public.users.role IS 'Role do usuário: admin, manager, member, guest';
COMMENT ON COLUMN public.users.permissions IS 'Array de permissões específicas do usuário'; 