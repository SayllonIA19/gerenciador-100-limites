import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { KanbanBoard } from '@/components/tecnologia/KanbanBoard';
import { SugestaoForm } from '@/components/tecnologia/SugestaoForm';
import { Plus } from 'lucide-react';
import { useTecnologia } from '@/hooks/useTecnologia';

export default function TecnologiaSugestoes() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading } = useTecnologia();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando sugestões...</p>
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
            <h1 className="text-3xl font-bold">Sugestões de Tecnologia</h1>
            <p className="text-muted-foreground">
              Gerencie sugestões de melhorias e novos sistemas
            </p>
          </div>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Sugestão
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Sugestão</DialogTitle>
              </DialogHeader>
              <SugestaoForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <KanbanBoard type="sugestoes" />
      </div>
    </Layout>
  );
}