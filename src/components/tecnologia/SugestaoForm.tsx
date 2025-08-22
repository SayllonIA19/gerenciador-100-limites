import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTecnologia } from '@/hooks/useTecnologia';

interface SugestaoFormProps {
  onSuccess?: () => void;
}

export function SugestaoForm({ onSuccess }: SugestaoFormProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createSugestao } = useTecnologia();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) return;

    setIsSubmitting(true);
    try {
      await createSugestao({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        status: 'Pendente',
      });
      
      setTitulo('');
      setDescricao('');
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Sugestão de Tecnologia</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título da sugestão"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva sua sugestão em detalhes"
              className="min-h-[100px]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !titulo.trim() || !descricao.trim()}
            className="w-full"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Sugestão'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}