-- Script simples para configurar o usuário administrador
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se o usuário existe na tabela users
SELECT 'Verificando usuário admin...' as status;

SELECT id, email, role, permissions 
FROM public.users 
WHERE email = '100limites0923@gmail.com';

-- 2. Se o usuário não existir, você precisa inseri-lo manualmente
-- Primeiro, vá em Authentication > Users e copie o ID do usuário admin
-- Depois execute o INSERT abaixo (substituindo UUID_DO_USUARIO pelo ID real)

/*
INSERT INTO public.users (id, email, role, permissions)
VALUES (
    'UUID_DO_USUARIO', -- Substitua pelo UUID real do Supabase
    'admin@100limites.com',
    'admin',
    ARRAY[
        'dashboard:read', 'dashboard:write',
        'projects:read', 'projects:write',
        'collaborators:read', 'collaborators:write',
        'events:read', 'events:write',
        'tasks:read', 'tasks:write',
        'finance:read', 'finance:write',
        'marketing:read', 'marketing:write',
        'music:read', 'music:write',
        'dance:read', 'dance:write',
        'visual:read', 'visual:write'
    ]
);
*/

-- 3. Se o usuário já existir, atualizar as permissões
UPDATE public.users 
SET 
    role = 'admin',
    permissions = ARRAY[
        'dashboard:read', 'dashboard:write',
        'projects:read', 'projects:write',
        'collaborators:read', 'collaborators:write',
        'events:read', 'events:write',
        'tasks:read', 'tasks:write',
        'finance:read', 'finance:write',
        'marketing:read', 'marketing:write',
        'music:read', 'music:write',
        'dance:read', 'dance:write',
        'visual:read', 'visual:write'
    ]
WHERE email = '100limites0923@gmail.com';

-- 4. Verificar resultado
SELECT 'Resultado final:' as status;

SELECT id, email, role, array_length(permissions, 1) as total_permissions
FROM public.users 
WHERE email = '100limites0923@gmail.com';

-- 5. Listar todos os usuários
SELECT 'Todos os usuários:' as status;

SELECT email, role, array_length(permissions, 1) as total_permissions
FROM public.users 
ORDER BY role, email; 