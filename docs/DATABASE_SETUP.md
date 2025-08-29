# Configuração do Banco de Dados - 100 Limites

## 📋 Visão Geral

Este documento explica como configurar o banco de dados Supabase para o sistema 100 Limites.

## 🚀 Passos para Configuração

### 1. Acessar o Supabase Dashboard

1. Vá para [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Acesse o projeto: `udlpqkmobzgugckmastb`

### 2. Executar as Migrações

#### Opção A: Via SQL Editor (Recomendado)

1. No Supabase Dashboard, vá para **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `scripts/setup-database.sql`
4. Clique em **Run** para executar

#### Opção B: Via Supabase CLI

```bash
# Instalar Supabase CLI (se não tiver)
npm install -g supabase

# Fazer login
supabase login

# Linkar o projeto
supabase link --project-ref udlpqkmobzgugckmastb

# Executar migrações
supabase db push
```

### 3. Verificar as Tabelas Criadas

Após executar as migrações, você deve ver as seguintes tabelas:

- ✅ `projects` - Projetos dos usuários
- ✅ `collaborators` - Colaboradores da empresa
- ✅ `events` - Eventos e reuniões
- ✅ `tasks` - Tarefas dos projetos
- ✅ `expenses` - Despesas
- ✅ `revenue` - Receitas
- ✅ `music_tracks` - Faixas musicais
- ✅ `dance_choreographies` - Coreografias
- ✅ `marketing_campaigns` - Campanhas de marketing
- ✅ `visual_maps` - Mapas visuais
- ✅ `notifications` - Notificações

### 4. Configurar Usuários

Como é um sistema interno, os usuários devem ser criados diretamente no Supabase:

#### Via Dashboard:
1. Vá para **Authentication > Users**
2. Clique em **Add User**
3. Preencha:
   - **Email**: email@100limites.com
   - **Password**: senha temporária
   - **User Metadata**: 
     ```json
     {
       "name": "Nome do Usuário",
       "role": "user"
     }
     ```

#### Via SQL:
```sql
-- Criar usuário via SQL (senha será enviada por email)
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  'usuario@100limites.com',
  crypt('senha_temporaria', gen_salt('bf')),
  NOW(),
  '{"name": "Nome do Usuário", "role": "user"}'
);
```

### 5. Configurar Políticas de Segurança

As políticas de Row Level Security (RLS) já estão configuradas no script:

- **Projetos**: Usuários só veem seus próprios projetos
- **Colaboradores**: Todos os usuários autenticados podem ver
- **Eventos**: Usuários veem eventos que organizam ou de seus projetos
- **Tarefas**: Usuários veem tarefas atribuídas a eles ou de seus projetos
- **Financeiro**: Usuários veem apenas dados de seus projetos
- **Notificações**: Usuários veem apenas suas próprias

### 6. Testar a Configuração

1. Execute o projeto localmente:
   ```bash
   npm run dev
   ```

2. Tente fazer login com um usuário criado
3. Verifique se consegue criar/visualizar projetos
4. Teste as outras funcionalidades

## 🔧 Configurações Adicionais

### Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estão configuradas no seu `.env`:

```env
VITE_SUPABASE_URL=https://udlpqkmobzgugckmastb.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### Configurações do Supabase

1. **Authentication > Settings**:
   - Configure o domínio do seu app
   - Ajuste as configurações de email

2. **Storage** (se necessário):
   - Crie buckets para uploads de arquivos
   - Configure políticas de acesso

## 🐛 Solução de Problemas

### Erro de Permissão
Se encontrar erros de permissão, verifique:
- Se o RLS está habilitado nas tabelas
- Se as políticas estão corretas
- Se o usuário está autenticado

### Erro de Chave Estrangeira
Se encontrar erros de FK, verifique:
- Se todas as tabelas foram criadas
- Se as referências estão corretas
- Se os tipos de dados estão compatíveis

### Usuário não consegue fazer login
Verifique:
- Se o usuário foi criado corretamente
- Se o email foi confirmado
- Se a senha está correta

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Supabase Dashboard
2. Consulte a documentação do Supabase
3. Entre em contato com a equipe de desenvolvimento

---

**Última atualização**: 3 de julho de 2025 