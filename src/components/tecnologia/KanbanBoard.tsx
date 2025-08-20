import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTecnologia, SugestaoTecnologia, ProjetoTecnologia } from '@/hooks/useTecnologia';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface KanbanBoardProps {
  type: 'sugestoes' | 'projetos';
}

export function KanbanBoard({ type }: KanbanBoardProps) {
  const { sugestoes, projetos, updateSugestaoStatus, updateProjeto } = useTecnologia();

  const getStatusColumns = () => {
    if (type === 'sugestoes') {
      return [
        { status: 'Pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
        { status: 'Avaliada', label: 'Avaliada', color: 'bg-blue-100 text-blue-800' },
        { status: 'Aprovada', label: 'Aprovada', color: 'bg-green-100 text-green-800' },
        { status: 'Rejeitada', label: 'Rejeitada', color: 'bg-red-100 text-red-800' },
      ];
    } else {
      return [
        { status: 'Nao iniciado', label: '🟡 Não iniciado', color: 'bg-gray-100 text-gray-800' },
        { status: 'Em andamento', label: '🟢 Em andamento', color: 'bg-green-100 text-green-800' },
        { status: 'Terminado', label: '✅ Terminado', color: 'bg-blue-100 text-blue-800' },
        { status: 'Cancelado', label: '🔴 Cancelado', color: 'bg-red-100 text-red-800' },
      ];
    }
  };

  const getItemsByStatus = (status: string) => {
    if (type === 'sugestoes') {
      return sugestoes.filter(item => item.status === status);
    } else {
      return projetos.filter(item => item.status === status);
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Urgente': return 'bg-red-500';
      case 'Alta': return 'bg-orange-500';
      case 'Media': return 'bg-yellow-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    if (type === 'sugestoes') {
      await updateSugestaoStatus(itemId, newStatus as SugestaoTecnologia['status']);
    } else {
      await updateProjeto(itemId, { status: newStatus as ProjetoTecnologia['status'] });
    }
  };

  const columns = getStatusColumns();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.status} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{column.label}</h3>
            <Badge variant="secondary" className={column.color}>
              {getItemsByStatus(column.status).length}
            </Badge>
          </div>
          
          <div className="space-y-3 min-h-[200px]">
            {getItemsByStatus(column.status).map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {item.titulo}
                    </CardTitle>
                    {type === 'projetos' && 'prioridade' in item && (
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.prioridade)} flex-shrink-0 ml-2`} />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {type === 'sugestoes' ? (
                    <>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {item.descricao}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Por: {item.profiles?.name || 'Usuário'}</span>
                        <span>{format(new Date(item.created_at), 'dd/MM', { locale: ptBR })}</span>
                      </div>
                      
                      <div className="flex gap-1 mt-2">
                        {columns.map((col) => (
                          col.status !== item.status && (
                            <Button
                              key={col.status}
                              size="sm"
                              variant="outline"
                              className="text-xs px-2 py-1 h-auto"
                              onClick={() => handleStatusChange(item.id, col.status)}
                            >
                              {col.label}
                            </Button>
                          )
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {item.descricao || 'Sem descrição'}
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Início: {format(new Date(item.inicio), 'dd/MM/yyyy', { locale: ptBR })}</div>
                        {item.fim && (
                          <div>Fim: {format(new Date(item.fim), 'dd/MM/yyyy', { locale: ptBR })}</div>
                        )}
                        <div>Responsável: {item.profiles?.name || 'Não atribuído'}</div>
                      </div>
                      
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {columns.map((col) => (
                          col.status !== item.status && (
                            <Button
                              key={col.status}
                              size="sm"
                              variant="outline"
                              className="text-xs px-2 py-1 h-auto"
                              onClick={() => handleStatusChange(item.id, col.status)}
                            >
                              {col.label.replace(/[🟡🟢✅🔴]/g, '').trim()}
                            </Button>
                          )
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}