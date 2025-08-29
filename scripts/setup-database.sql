-- =====================================================
-- SCRIPT DE CONFIGURAÇÃO DO BANCO DE DADOS - 100 LIMITES
-- =====================================================

-- 1. CRIAR TABELAS
-- =====================================================

-- Tabela de colaboradores
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  organizer_id UUID REFERENCES auth.users(id),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMP WITH TIME ZONE,
  assigned_to UUID REFERENCES auth.users(id),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de despesas
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT DEFAULT 'variable' CHECK (type IN ('fixed', 'variable')),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de receitas
CREATE TABLE IF NOT EXISTS revenue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  source TEXT NOT NULL,
  date DATE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de faixas musicais
CREATE TABLE IF NOT EXISTS music_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'composition' CHECK (status IN ('idea', 'composition', 'production', 'mixing', 'mastering', 'released')),
  bpm INTEGER,
  key TEXT,
  duration INTEGER, -- em segundos
  delivery_date DATE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de coreografias
CREATE TABLE IF NOT EXISTS dance_choreographies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'rehearsal', 'performance', 'completed')),
  duration INTEGER, -- em minutos
  dancers_count INTEGER DEFAULT 1,
  performance_date DATE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de campanhas de marketing
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  objective TEXT,
  start_date DATE,
  end_date DATE,
  budget DECIMAL(10,2),
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'paused', 'completed')),
  target_audience TEXT,
  channels TEXT[], -- array de canais de marketing
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mapas visuais
CREATE TABLE IF NOT EXISTS visual_maps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('mind_map', 'flowchart', 'process_diagram', 'user_journey')),
  embed_url TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN DEFAULT FALSE,
  related_type TEXT, -- 'project', 'event', 'task', etc.
  related_id UUID, -- ID do item relacionado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CRIAR ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_project_id ON events(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_expenses_project_id ON expenses(project_id);
CREATE INDEX IF NOT EXISTS idx_revenue_project_id ON revenue(project_id);
CREATE INDEX IF NOT EXISTS idx_music_tracks_project_id ON music_tracks(project_id);
CREATE INDEX IF NOT EXISTS idx_dance_choreographies_project_id ON dance_choreographies(project_id);
CREATE INDEX IF NOT EXISTS idx_marketing_campaigns_project_id ON marketing_campaigns(project_id);
CREATE INDEX IF NOT EXISTS idx_visual_maps_project_id ON visual_maps(project_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- 3. CRIAR FUNÇÃO PARA ATUALIZAR updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. CRIAR TRIGGERS PARA updated_at
-- =====================================================

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collaborators_updated_at BEFORE UPDATE ON collaborators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_revenue_updated_at BEFORE UPDATE ON revenue FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_music_tracks_updated_at BEFORE UPDATE ON music_tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dance_choreographies_updated_at BEFORE UPDATE ON dance_choreographies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marketing_campaigns_updated_at BEFORE UPDATE ON marketing_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visual_maps_updated_at BEFORE UPDATE ON visual_maps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. HABILITAR ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dance_choreographies ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE visual_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR POLÍTICAS DE SEGURANÇA
-- =====================================================

-- Projetos: usuários só veem seus próprios projetos
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Colaboradores: todos os usuários autenticados podem ver
CREATE POLICY "Authenticated users can view collaborators" ON collaborators
  FOR SELECT USING (auth.role() = 'authenticated');

-- Eventos: usuários veem eventos que organizam ou de seus projetos
CREATE POLICY "Users can view events they organize or are related to their projects" ON events
  FOR SELECT USING (
    auth.uid() = organizer_id OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = events.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create events for their projects" ON events
  FOR INSERT WITH CHECK (
    auth.uid() = organizer_id OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = events.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update events they organize" ON events
  FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete events they organize" ON events
  FOR DELETE USING (auth.uid() = organizer_id);

-- Tarefas: usuários veem tarefas atribuídas a eles ou de seus projetos
CREATE POLICY "Users can view tasks assigned to them or from their projects" ON tasks
  FOR SELECT USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create tasks for their projects" ON tasks
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks assigned to them or from their projects" ON tasks
  FOR UPDATE USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tasks from their projects" ON tasks
  FOR DELETE USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Despesas e Receitas: usuários veem apenas de seus projetos
CREATE POLICY "Users can view expenses from their projects" ON expenses
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = expenses.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create expenses for their projects" ON expenses
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = expenses.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update expenses they created" ON expenses
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete expenses they created" ON expenses
  FOR DELETE USING (auth.uid() = created_by);

-- Receitas (mesmas políticas das despesas)
CREATE POLICY "Users can view revenue from their projects" ON revenue
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = revenue.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create revenue for their projects" ON revenue
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = revenue.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update revenue they created" ON revenue
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete revenue they created" ON revenue
  FOR DELETE USING (auth.uid() = created_by);

-- Notificações: usuários veem apenas suas próprias
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- 7. INSERIR DADOS DE EXEMPLO (OPCIONAL)
-- =====================================================

-- Inserir alguns colaboradores de exemplo
INSERT INTO collaborators (name, email, role, status) VALUES
  ('João Silva', 'joao.silva@100limites.com', 'Gerente de Projetos', 'active'),
  ('Maria Santos', 'maria.santos@100limites.com', 'Desenvolvedora', 'active'),
  ('Pedro Costa', 'pedro.costa@100limites.com', 'Designer', 'active'),
  ('Ana Lima', 'ana.lima@100limites.com', 'Marketing', 'active'),
  ('Carlos Mendes', 'carlos.mendes@100limites.com', 'Produção Musical', 'active')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- FIM DO SCRIPT
-- ===================================================== 