import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTecnologia } from '@/hooks/useTecnologia';
import { format } from 'date-fns';

interface ProjetoFormProps {
  onSuccess?: () => void;
}

export function ProjetoForm({ onSuccess }: ProjetoFormProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [prioridade, setPrioridade] = useState<'Baixa' | 'Media' | 'Alta' | 'Urgente'>('Media');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProjeto } = useTecnologia();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !inicio) return;

    setIsSubmitting(true);
    try {
      await createProjeto({
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined,
        inicio,
        fim: fim || undefined,
        status: 'Nao iniciado',
        prioridade,
      });
      
      setTitulo('');
      setDescricao('');
      setInicio('');
      setFim('');
      setPrioridade('Media');
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Projeto de Tecnologia</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do projeto"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o projeto (opcional)"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inicio">Data de Início</Label>
              <Input
                id="inicio"
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                min={today}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="fim">Data de Fim (opcional)</Label>
              <Input
                id="fim"
                type="date"
                value={fim}
                onChange={(e) => setFim(e.target.value)}
                min={inicio || today}
              />
            </div>
          </div>

          <div>
            <Label>Prioridade</Label>
            <Select value={prioridade} onValueChange={(value: any) => setPrioridade(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baixa">Baixa</SelectItem>
                <SelectItem value="Media">Média</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !titulo.trim() || !inicio}
            className="w-full"
          >
            {isSubmitting ? 'Criando...' : 'Criar Projeto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}