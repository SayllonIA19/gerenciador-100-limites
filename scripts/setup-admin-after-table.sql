-- Script para configurar o usuário administrador
-- Execute este script APÓS criar a tabela users

-- 1. Primeiro, verifique se o usuário existe na tabela users
SELECT id, email, role, permissions 
FROM public.users 
WHERE email = 'admin@100limites.com';

-- 2. Se o usuário não existir, insira manualmente
-- (Substitua o UUID pelo ID real do usuário do Supabase)
-- Para encontrar o UUID, vá em Authentication > Users e copie o ID

-- INSERT INTO public.users (id, email, role, permissions)
-- VALUES (
--     'UUID_DO_USUARIO_AQUI', -- Substitua pelo UUID real
--     'admin@100limites.com',
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

-- 3. Se o usuário já existir, atualize as permissões
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
WHERE email = 'admin@100limites.com';

-- 4. Verificar se foi atualizado
SELECT id, email, role, permissions 
FROM public.users 
WHERE email = 'admin@100limites.com';

-- 5. Listar todos os usuários
SELECT email, role, array_length(permissions, 1) as total_permissions
FROM public.users 
ORDER BY role, email; 