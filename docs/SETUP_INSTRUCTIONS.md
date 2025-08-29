# Instruções de Configuração e Execução

## 1. Configuração do Supabase

### 1.1 Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Faça login e crie um novo projeto
3. Anote a URL do projeto e as chaves de API

### 1.2 Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 1.3 Executar Migrações
Execute os seguintes comandos SQL no SQL Editor do Supabase:

1. **Criar Tabelas**: Execute o conteúdo de `supabase/migrations/20250703_create_tables.sql`
2. **Configurar RLS**: Execute o conteúdo de `supabase/migrations/20250703_rls_policies.sql`

## 2. Instalação e Execução

### 2.1 Instalar Dependências
```bash
npm install
```

### 2.2 Executar o Projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 3. Configuração de Usuários

### 3.1 Criar Usuário Administrador
1. Acesse o painel do Supabase
2. Vá para Authentication > Users
3. Clique em "Add User"
4. Preencha:
   - Email: admin@exemplo.com
   - Password: senha123
   - Marque "Auto-confirm user"

### 3.2 Configurar Políticas de Acesso
As políticas RLS já estão configuradas para:
- Usuários só veem seus próprios dados
- Administradores podem ver todos os dados
- Dados são protegidos por usuário

## 4. Estrutura do Sistema

### 4.1 Módulos Principais
- **Dashboard**: Visão geral dos projetos e atividades
- **Projetos**: Gerenciamento de projetos
- **Colaboradores**: Gestão da equipe
- **Eventos**: Organização de eventos
- **Finanças**: Controle de receitas e despesas
- **Tarefas**: Acompanhamento de atividades

### 4.2 Funcionalidades Implementadas
- ✅ Autenticação com Supabase
- ✅ CRUD de projetos
- ✅ CRUD de colaboradores
- ✅ CRUD de eventos
- ✅ CRUD de tarefas
- ✅ CRUD de finanças
- ✅ Políticas de segurança (RLS)
- ✅ Interface responsiva
- ✅ Notificações toast

## 5. Próximos Passos

### 5.1 Funcionalidades Pendentes
- [ ] Formulários de criação/edição
- [ ] Upload de arquivos
- [ ] Relatórios e gráficos
- [ ] Notificações em tempo real
- [ ] Exportação de dados

### 5.2 Melhorias Sugeridas
- [ ] Testes automatizados
- [ ] Documentação da API
- [ ] Backup automático
- [ ] Monitoramento de performance

## 6. Troubleshooting

### 6.1 Erro de Autenticação
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o usuário foi criado no Supabase
- Verifique se as políticas RLS estão ativas

### 6.2 Erro de Conexão
- Verifique se a URL do Supabase está correta
- Confirme se o projeto está ativo
- Verifique se a chave anônima está correta

### 6.3 Dados Não Aparecem
- Verifique se as migrações foram executadas
- Confirme se as políticas RLS estão configuradas
- Verifique se o usuário tem permissões adequadas

## 7. Suporte

Para dúvidas ou problemas:
1. Verifique a documentação do Supabase
2. Consulte os logs do console
3. Verifique as políticas de segurança
4. Teste com um usuário administrador 