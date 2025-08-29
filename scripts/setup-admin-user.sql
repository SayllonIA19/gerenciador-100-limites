-- Script para configurar o UsuárioFull (Administrador)
-- Execute este script no SQL Editor do Supabase

-- 1. Primeiro, crie o usuário no Authentication do Supabase
-- Vá para: Authentication > Users > Add User
-- Email: admin@100limites.com
-- Password: admin123456
-- Marque "Auto-confirm user"

-- 2. Depois, execute este SQL para configurar as permissões
-- (Substitua o email pelo email do usuário que você criou)

-- Configurar UsuárioFull com todas as permissões
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

-- Verificar se foi atualizado
SELECT id, email, role, permissions 
FROM public.users 
WHERE email = 'admin@100limites.com';

-- 3. Se o usuário não existir na tabela users, insira manualmente
-- (Substitua o UUID pelo ID real do usuário do Supabase)

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