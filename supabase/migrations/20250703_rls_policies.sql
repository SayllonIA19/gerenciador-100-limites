-- Enable RLS on all tables
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

-- Projects policies
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Collaborators policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view collaborators" ON collaborators
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage collaborators" ON collaborators
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Events policies
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

-- Tasks policies
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

-- Expenses policies
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

-- Revenue policies
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

-- Music tracks policies
CREATE POLICY "Users can view music tracks from their projects" ON music_tracks
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = music_tracks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create music tracks for their projects" ON music_tracks
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = music_tracks.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update music tracks they created" ON music_tracks
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete music tracks they created" ON music_tracks
  FOR DELETE USING (auth.uid() = created_by);

-- Dance choreographies policies
CREATE POLICY "Users can view dance choreographies from their projects" ON dance_choreographies
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = dance_choreographies.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create dance choreographies for their projects" ON dance_choreographies
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = dance_choreographies.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update dance choreographies they created" ON dance_choreographies
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete dance choreographies they created" ON dance_choreographies
  FOR DELETE USING (auth.uid() = created_by);

-- Marketing campaigns policies
CREATE POLICY "Users can view marketing campaigns from their projects" ON marketing_campaigns
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = marketing_campaigns.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create marketing campaigns for their projects" ON marketing_campaigns
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = marketing_campaigns.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update marketing campaigns they created" ON marketing_campaigns
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete marketing campaigns they created" ON marketing_campaigns
  FOR DELETE USING (auth.uid() = created_by);

-- Visual maps policies
CREATE POLICY "Users can view visual maps from their projects" ON visual_maps
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = visual_maps.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create visual maps for their projects" ON visual_maps
  FOR INSERT WITH CHECK (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = visual_maps.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update visual maps they created" ON visual_maps
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete visual maps they created" ON visual_maps
  FOR DELETE USING (auth.uid() = created_by);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

-- System can insert notifications for users
CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true); 