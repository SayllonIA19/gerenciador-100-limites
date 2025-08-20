import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanBoard } from '@/components/tecnologia/KanbanBoard';
import { ProjetoForm } from '@/components/tecnologia/ProjetoForm';
import { Plus, Calendar } from 'lucide-react';
import { useTecnologia } from '@/hooks/useTecnologia';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isAfter, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TecnologiaProjetos() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { projetos, loading } = useTecnologia();

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Urgente': return 'bg-red-100 text-red-800';
      case 'Alta': return 'bg-orange-100 text-orange-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nao iniciado': return 'bg-gray-100 text-gray-800';
      case 'Em andamento': return 'bg-blue-100 text-blue-800';
      case 'Terminado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (projeto: any) => {
    if (!projeto.fim) return false;
    return projeto.status !== 'Terminado' && isAfter(new Date(), new Date(projeto.fim));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando projetos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projetos de Tecnologia</h1>
            <p className="text-muted-foreground">
              Gerencie projetos de desenvolvimento e inovação
            </p>
          </div>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Projeto</DialogTitle>
              </DialogHeader>
              <ProjetoForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="kanban" className="w-full">
          <TabsList>
            <TabsTrigger value="kanban">Quadro Kanban</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="lista">Lista</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kanban">
            <KanbanBoard type="projetos" />
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Timeline de Projetos</h2>
              </div>
              
              <div className="grid gap-4">
                {projetos
                  .filter(p => p.status !== 'Cancelado')
                  .sort((a, b) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime())
                  .map((projeto) => (
                    <Card key={projeto.id} className={`${isOverdue(projeto) ? 'border-red-300 bg-red-50' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{projeto.titulo}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {projeto.descricao || 'Sem descrição'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(projeto.prioridade)}>
                              {projeto.prioridade}
                            </Badge>
                            <Badge className={getStatusColor(projeto.status)}>
                              {projeto.status}
                            </Badge>
                            {isOverdue(projeto) && (
                              <Badge className="bg-red-100 text-red-800">
                                Atrasado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Início:</span>{' '}
                            {format(new Date(projeto.inicio), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                          {projeto.fim && (
                            <div>
                              <span className="font-medium">Fim:</span>{' '}
                              {format(new Date(projeto.fim), 'dd/MM/yyyy', { locale: ptBR })}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Responsável:</span>{' '}
                            {projeto.profiles?.name || 'Não atribuído'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lista">
            <div className="grid gap-4">
              {projetos.map((projeto) => (
                <Card key={projeto.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{projeto.titulo}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {projeto.descricao || 'Sem descrição'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(projeto.prioridade)}>
                          {projeto.prioridade}
                        </Badge>
                        <Badge className={getStatusColor(projeto.status)}>
                          {projeto.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Início:</span><br />
                        {format(new Date(projeto.inicio), 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                      {projeto.fim && (
                        <div>
                          <span className="font-medium">Fim:</span><br />
                          {format(new Date(projeto.fim), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Responsável:</span><br />
                        {projeto.profiles?.name || 'Não atribuído'}
                      </div>
                      <div>
                        <span className="font-medium">Criado em:</span><br />
                        {format(new Date(projeto.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}