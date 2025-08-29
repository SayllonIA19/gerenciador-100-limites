# Sistema de Permissões e Controle de Acesso

## Visão Geral

O sistema implementa um controle de acesso baseado em roles e permissões específicas, permitindo diferentes níveis de acesso para diferentes tipos de usuários.

## Tipos de Usuários

### 1. **UsuárioFull (Administrador)**
- **Role**: `admin`
- **Acesso**: Total a todas as abas e funcionalidades
- **Permissões**: Todas as permissões de leitura e escrita

### 2. **Usuários Específicos**
- **Roles**: `manager`, `member`, `guest`
- **Acesso**: Baseado em permissões específicas
- **Exemplo**: Usuário1 pode ter acesso total a eventos, mas apenas leitura em marketing

### 3. **Colaboradores**
- **Acesso**: Limitado às abas baseadas em suas funções
- **Controle**: Definido através da tabela `collaborators`

## Estrutura de Permissões

### Permissões por Módulo
Cada módulo tem duas permissões:
- `{modulo}:read` - Permissão de visualização
- `{modulo}:write` - Permissão de edição

### Módulos Disponíveis
- `dashboard` - Dashboard principal
- `projects` - Gerenciamento de projetos
- `collaborators` - Gestão de colaboradores
- `events` - Organização de eventos
- `tasks` - Acompanhamento de tarefas
- `finance` - Controle financeiro
- `marketing` - Campanhas de marketing
- `music` - Produção musical
- `dance` - Coreografias
- `visual` - Mapas visuais

## Roles Padrão

### Admin
```json
{
  "role": "admin",
  "permissions": [
    "dashboard:read", "dashboard:write",
    "projects:read", "projects:write",
    "collaborators:read", "collaborators:write",
    "events:read", "events:write",
    "tasks:read", "tasks:write",
    "finance:read", "finance:write",
    "marketing:read", "marketing:write",
    "music:read", "music:write",
    "dance:read", "dance:write",
    "visual:read", "visual:write"
  ]
}
```

### Manager
```json
{
  "role": "manager",
  "permissions": [
    "dashboard:read",
    "projects:read", "projects:write",
    "collaborators:read",
    "events:read", "events:write",
    "tasks:read", "tasks:write",
    "finance:read",
    "marketing:read", "marketing:write",
    "music:read", "music:write",
    "dance:read", "dance:write",
    "visual:read", "visual:write"
  ]
}
```

### Member
```json
{
  "role": "member",
  "permissions": [
    "dashboard:read",
    "projects:read",
    "events:read",
    "tasks:read", "tasks:write",
    "finance:read",
    "marketing:read",
    "music:read",
    "dance:read",
    "visual:read"
  ]
}
```

### Guest
```json
{
  "role": "guest",
  "permissions": [
    "dashboard:read",
    "projects:read",
    "events:read",
    "tasks:read",
    "finance:read"
  ]
}
```

## Implementação Técnica

### 1. Tabela de Usuários
```sql
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    permissions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Hook de Permissões
O hook `usePermissions` fornece:
- `hasPermission(permission)` - Verifica permissão específica
- `canRead(module)` - Verifica permissão de leitura
- `canWrite(module)` - Verifica permissão de escrita
- `isAdmin()` - Verifica se é administrador
- `isManagerOrAdmin()` - Verifica se é gerente ou admin

### 3. Componente de Proteção
```tsx
<PermissionGuard permission="events:write">
  <EventForm />
</PermissionGuard>
```

### 4. Sidebar Dinâmica
A sidebar mostra apenas as abas para as quais o usuário tem permissão de leitura.

## Configuração de Usuários

### Criar Usuário Administrador
1. No Supabase → Authentication → Users
2. Adicionar usuário com email e senha
3. Executar SQL para definir role como admin:
```sql
UPDATE public.users 
SET role = 'admin', 
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
WHERE email = 'admin@exemplo.com';
```

### Configurar Usuário Específico
```sql
UPDATE public.users 
SET role = 'manager',
    permissions = ARRAY[
      'dashboard:read',
      'events:read', 'events:write',
      'marketing:read'
    ]
WHERE email = 'usuario1@exemplo.com';
```

## Exemplos de Uso

### Usuário1 - Acesso Total a Eventos
- **Email**: usuario1@exemplo.com
- **Permissões**: 
  - `events:read`, `events:write` (acesso total)
  - `marketing:read` (apenas visualização)

### Usuário2 - Acesso Total a Marketing
- **Email**: usuario2@exemplo.com
- **Permissões**:
  - `marketing:read`, `marketing:write` (acesso total)
  - `events:read` (apenas visualização)

### Colaborador - Acesso Limitado
- **Função**: Membro da equipe
- **Permissões**: Apenas visualização dos módulos relacionados à sua função

## Segurança

### Row Level Security (RLS)
- Todas as tabelas têm RLS habilitado
- Usuários só veem dados relacionados às suas permissões
- Políticas específicas por tabela

### Validação Frontend
- Componentes verificam permissões antes de renderizar
- Botões de ação só aparecem se usuário tem permissão
- Navegação limitada baseada em permissões

### Validação Backend
- Políticas RLS no Supabase
- Verificação de permissões em todas as operações
- Logs de acesso para auditoria

## Migração e Setup

### 1. Executar Migrações
```bash
# Executar no SQL Editor do Supabase
-- 20250703_create_tables.sql
-- 20250703_rls_policies.sql
-- 20250703_user_permissions.sql
```

### 2. Configurar Usuário Admin
```sql
-- Substituir pelo UUID real do usuário
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@exemplo.com';
```

### 3. Testar Permissões
1. Fazer login com diferentes usuários
2. Verificar se apenas abas permitidas aparecem
3. Testar funcionalidades de leitura e escrita
4. Verificar se dados são filtrados corretamente

## Troubleshooting

### Usuário não vê abas
- Verificar se usuário existe na tabela `users`
- Confirmar se permissões estão configuradas
- Verificar se role está definido

### Erro de acesso negado
- Verificar políticas RLS
- Confirmar se usuário tem permissão necessária
- Verificar se dados pertencem ao usuário

### Permissões não atualizam
- Verificar se hook está sendo usado corretamente
- Confirmar se contexto está configurado
- Verificar se componente está protegido 