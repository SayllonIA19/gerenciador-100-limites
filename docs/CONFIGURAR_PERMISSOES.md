# Guia Completo: Como Configurar Permissões

## 🎯 Passo a Passo para Configurar o Sistema

### 1. **Configurar o UsuárioFull (Administrador)**

#### 1.1 Criar Usuário no Supabase
1. Acesse o painel do Supabase
2. Vá para **Authentication > Users**
3. Clique em **"Add User"**
4. Preencha:
   - **Email**: `admin@100limites.com`
   - **Password**: `admin123456`
   - ✅ Marque **"Auto-confirm user"**
5. Clique em **"Create user"**

#### 1.2 Configurar Permissões de Administrador
No **SQL Editor** do Supabase, execute:

```sql
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
```

### 2. **Configurar Usuários Específicos**

#### 2.1 Usuário1 - Acesso Total a Eventos
1. **Criar usuário**: `usuario1@100limites.com`
2. **Executar SQL**:
```sql
UPDATE public.users 
SET 
    role = 'manager',
    permissions = ARRAY[
        'dashboard:read',
        'events:read', 'events:write',  -- Acesso total a eventos
        'marketing:read'                -- Só leitura em marketing
    ]
WHERE email = 'usuario1@100limites.com';
```

#### 2.2 Usuário2 - Acesso Total a Marketing
1. **Criar usuário**: `usuario2@100limites.com`
2. **Executar SQL**:
```sql
UPDATE public.users 
SET 
    role = 'manager',
    permissions = ARRAY[
        'dashboard:read',
        'marketing:read', 'marketing:write',  -- Acesso total a marketing
        'events:read'                         -- Só leitura em eventos
    ]
WHERE email = 'usuario2@100limites.com';
```

### 3. **Configurar Colaboradores**

#### 3.1 Adicionar Colaborador
1. Faça login como **UsuárioFull**
2. Vá para a aba **"Colaboradores"**
3. Clique em **"Adicionar Colaborador"**
4. Preencha os dados e defina as permissões

#### 3.2 Exemplo de Colaborador com Acesso Limitado
```sql
-- Colaborador com acesso apenas a eventos e tarefas
INSERT INTO public.collaborators (
    name, email, role, permissions, user_id
) VALUES (
    'João Silva',
    'joao@exemplo.com',
    'member',
    ARRAY['events:read', 'tasks:read', 'tasks:write'],
    'ID_DO_USUARIO_PRINCIPAL'
);
```

## 🔧 Como Funciona o Sistema

### **Tipos de Acesso**

1. **UsuárioFull (Admin)**
   - ✅ Vê todas as abas
   - ✅ Pode criar, editar, excluir tudo
   - ✅ Acesso à página de administração

2. **Usuários Específicos**
   - ✅ Vê apenas abas permitidas
   - ✅ Pode editar apenas módulos com permissão `:write`
   - ❌ Não vê abas sem permissão

3. **Colaboradores**
   - ✅ Vê apenas abas baseadas em suas funções
   - ✅ Acesso limitado aos dados do projeto

### **Permissões por Módulo**

| Módulo | Leitura | Escrita | Descrição |
|--------|---------|---------|-----------|
| `dashboard:read` | ✅ | ❌ | Ver dashboard |
| `projects:read` | ✅ | ❌ | Ver projetos |
| `projects:write` | ✅ | ✅ | Criar/editar projetos |
| `events:read` | ✅ | ❌ | Ver eventos |
| `events:write` | ✅ | ✅ | Criar/editar eventos |
| `marketing:read` | ✅ | ❌ | Ver marketing |
| `marketing:write` | ✅ | ✅ | Criar/editar campanhas |

## 🧪 Como Testar

### 1. **Teste do UsuárioFull**
1. Faça login com `admin@100limites.com`
2. Verifique se vê todas as abas
3. Teste criar/editar em qualquer módulo

### 2. **Teste do Usuário1**
1. Faça login com `usuario1@100limites.com`
2. Verifique se vê apenas: Dashboard, Eventos, Marketing
3. Teste criar/editar eventos ✅
4. Teste criar/editar marketing ❌

### 3. **Teste do Usuário2**
1. Faça login com `usuario2@100limites.com`
2. Verifique se vê apenas: Dashboard, Marketing, Eventos
3. Teste criar/editar marketing ✅
4. Teste criar/editar eventos ❌

## 🛠️ Comandos Úteis

### **Verificar Usuários Configurados**
```sql
SELECT email, role, permissions 
FROM public.users 
ORDER BY role, email;
```

### **Resetar Permissões de um Usuário**
```sql
UPDATE public.users 
SET permissions = ARRAY['dashboard:read']
WHERE email = 'usuario@exemplo.com';
```

### **Dar Acesso Total a um Usuário**
```sql
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
WHERE email = 'usuario@exemplo.com';
```

## 🚨 Troubleshooting

### **Usuário não vê abas**
1. Verifique se existe na tabela `users`
2. Confirme se tem permissões configuradas
3. Verifique se o role está correto

### **Erro de acesso negado**
1. Verifique as políticas RLS
2. Confirme se usuário tem permissão necessária
3. Verifique se dados pertencem ao usuário

### **Permissões não atualizam**
1. Recarregue a página
2. Verifique se SQL foi executado corretamente
3. Confirme se email está correto

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs do console
2. Confirme se as migrações foram executadas
3. Teste com um usuário administrador
4. Verifique se as variáveis de ambiente estão corretas 