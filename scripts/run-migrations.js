const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessárias');
  console.log('💡 Configure-as no arquivo .env ou no seu sistema');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigrations() {
  console.log('🚀 Iniciando execução das migrações...\n');

  try {
    // Ler arquivo de migração das tabelas
    const tablesMigrationPath = path.join(__dirname, '../supabase/migrations/20250703_create_tables.sql');
    const tablesSQL = fs.readFileSync(tablesMigrationPath, 'utf8');
    
    console.log('📋 Executando migração das tabelas...');
    const { error: tablesError } = await supabase.rpc('exec_sql', { sql: tablesSQL });
    
    if (tablesError) {
      console.error('❌ Erro ao criar tabelas:', tablesError.message);
      throw tablesError;
    }
    console.log('✅ Tabelas criadas com sucesso!\n');

    // Ler arquivo de migração das políticas RLS
    const rlsMigrationPath = path.join(__dirname, '../supabase/migrations/20250703_rls_policies.sql');
    const rlsSQL = fs.readFileSync(rlsMigrationPath, 'utf8');
    
    console.log('🔒 Configurando políticas de segurança (RLS)...');
    const { error: rlsError } = await supabase.rpc('exec_sql', { sql: rlsSQL });
    
    if (rlsError) {
      console.error('❌ Erro ao configurar RLS:', rlsError.message);
      throw rlsError;
    }
    console.log('✅ Políticas de segurança configuradas!\n');

    console.log('🎉 Todas as migrações foram executadas com sucesso!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Crie usuários no painel do Supabase');
    console.log('2. Configure as variáveis de ambiente no frontend');
    console.log('3. Teste o sistema de autenticação');

  } catch (error) {
    console.error('❌ Erro durante a execução das migrações:', error.message);
    process.exit(1);
  }
}

// Executar migrações
runMigrations(); 