-- Script para configurar usuários específicos
-- Execute este script no SQL Editor do Supabase

-- 1. Usuário1: Acesso total a eventos, só leitura em marketing
-- Primeiro crie o usuário no Authentication: usuario1@100limites.com

UPDATE public.users 
SET 
    role = 'manager',
    permissions = ARRAY[
        'dashboard:read',
        'events:read', 'events:write',  -- Acesso total a eventos
        'marketing:read'                -- Só leitura em marketing
    ]
WHERE email = 'usuario1@100limites.com';

-- 2. Usuário2: Acesso total a marketing, só leitura em eventos
-- Primeiro crie o usuário no Authentication: usuario2@100limites.com

UPDATE public.users 
SET 
    role = 'manager',
    permissions = ARRAY[
        'dashboard:read',
        'marketing:read', 'marketing:write',  -- Acesso total a marketing
        'events:read'                         -- Só leitura em eventos
    ]
WHERE email = 'usuario2@100limites.com';

-- 3. Usuário3: Acesso limitado (membro)
-- Primeiro crie o usuário no Authentication: usuario3@100limites.com

UPDATE public.users 
SET 
    role = 'member',
    permissions = ARRAY[
        'dashboard:read',
        'projects:read',
        'events:read',
        'tasks:read', 'tasks:write',
        'finance:read'
    ]
WHERE email = 'usuario3@100limites.com';

-- 4. Usuário4: Acesso mínimo (convidado)
-- Primeiro crie o usuário no Authentication: usuario4@100limites.com

UPDATE public.users 
SET 
    role = 'guest',
    permissions = ARRAY[
        'dashboard:read',
        'projects:read',
        'events:read'
    ]
WHERE email = 'usuario4@100limites.com';

-- Verificar todos os usuários configurados
SELECT email, role, permissions 
FROM public.users 
ORDER BY role, email; 