-- Create technology suggestions table
CREATE TABLE public.sugestoes_tecnologia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  criado_por_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendente',
  projeto_id UUID NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT status_check CHECK (status IN ('Pendente', 'Avaliada', 'Aprovada', 'Rejeitada'))
);

-- Create technology projects table
CREATE TABLE public.projetos_tecnologia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NULL,
  inicio DATE NOT NULL,
  fim DATE NULL,
  status TEXT NOT NULL DEFAULT 'Nao iniciado',
  responsavel_id UUID NULL,
  prioridade TEXT NOT NULL DEFAULT 'Media',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT status_check CHECK (status IN ('Nao iniciado', 'Em andamento', 'Terminado', 'Cancelado')),
  CONSTRAINT prioridade_check CHECK (prioridade IN ('Baixa', 'Media', 'Alta', 'Urgente'))
);

-- Create project attachments table
CREATE TABLE public.anexos_projeto_tec (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  projeto_id UUID NOT NULL REFERENCES public.projetos_tecnologia(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  url TEXT NOT NULL,
  descricao TEXT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT tipo_check CHECK (tipo IN ('Documento', 'Reuniao', 'Link', 'Arquitetura'))
);

-- Add foreign key from suggestions to projects
ALTER TABLE public.sugestoes_tecnologia 
ADD CONSTRAINT fk_projeto FOREIGN KEY (projeto_id) REFERENCES public.projetos_tecnologia(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE public.sugestoes_tecnologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projetos_tecnologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anexos_projeto_tec ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sugestoes_tecnologia
CREATE POLICY "Users can view all suggestions" 
ON public.sugestoes_tecnologia 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create suggestions" 
ON public.sugestoes_tecnologia 
FOR INSERT 
WITH CHECK (auth.uid() = criado_por_id);

CREATE POLICY "Users can update their own suggestions" 
ON public.sugestoes_tecnologia 
FOR UPDATE 
USING (auth.uid() = criado_por_id);

-- RLS Policies for projetos_tecnologia
CREATE POLICY "Users can view all projects" 
ON public.projetos_tecnologia 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create projects" 
ON public.projetos_tecnologia 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update projects" 
ON public.projetos_tecnologia 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for anexos_projeto_tec
CREATE POLICY "Users can view all attachments" 
ON public.anexos_projeto_tec 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create attachments" 
ON public.anexos_projeto_tec 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update attachments" 
ON public.anexos_projeto_tec 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete attachments" 
ON public.anexos_projeto_tec 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create triggers for updated_at
CREATE TRIGGER update_sugestoes_tecnologia_updated_at
BEFORE UPDATE ON public.sugestoes_tecnologia
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projetos_tecnologia_updated_at
BEFORE UPDATE ON public.projetos_tecnologia
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();