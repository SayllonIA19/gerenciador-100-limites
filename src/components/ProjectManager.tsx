
import React, { useState } from 'react';
import { Calendar, User, DollarSign, Plus, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface ProjectData {
  title: string;
  subtitle: string;
  startDate: Date | undefined;
  dueDate: Date | undefined;
  status: string;
  priority: string;
  assignedTo: string;
  budget: string;
  progress: number;
}

const statusConfig = {
  "Planning": { color: "bg-blue-100 text-blue-800", bgColor: "bg-blue-500" },
  "In Progress": { color: "bg-orange-100 text-orange-800", bgColor: "bg-orange-500" },
  "Review": { color: "bg-purple-100 text-purple-800", bgColor: "bg-purple-500" },
  "Completed": { color: "bg-green-100 text-green-800", bgColor: "bg-green-500" },
  "On Hold": { color: "bg-gray-100 text-gray-800", bgColor: "bg-gray-500" }
};

const priorityConfig = {
  "High": { color: "bg-red-100 text-red-800" },
  "Medium": { color: "bg-yellow-100 text-yellow-800" },
  "Low": { color: "bg-green-100 text-green-800" }
};

export function ProjectManager() {
  const [project, setProject] = useState<ProjectData>({
    title: "Nova Campanha de Marketing",
    subtitle: "Campanha de lançamento do produto Q3 2024",
    startDate: new Date(),
    dueDate: undefined,
    status: "Planning",
    priority: "High",
    assignedTo: "João Silva",
    budget: "15000",
    progress: 25
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const updateProject = (field: keyof ProjectData, value: any) => {
    setProject(prev => ({ ...prev, [field]: value }));
  };

  const DatePicker = ({ 
    date, 
    onSelect, 
    placeholder 
  }: { 
    date: Date | undefined; 
    onSelect: (date: Date | undefined) => void; 
    placeholder: string;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal h-10"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="mb-2">
            <Input
              value={project.title}
              onChange={(e) => updateProject('title', e.target.value)}
              className="text-3xl font-bold border-none p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-400"
              placeholder="Nome do Projeto"
            />
          </div>
          <Input
            value={project.subtitle}
            onChange={(e) => updateProject('subtitle', e.target.value)}
            className="text-lg text-gray-600 border-none p-0 h-auto bg-transparent placeholder:text-gray-400"
            placeholder="Descrição do projeto"
          />
        </div>

        {/* Main Content Area */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-6">
            <h2 className="text-xl font-semibold text-gray-900">Detalhes do Projeto</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Data de Início</Label>
                  <DatePicker
                    date={project.startDate}
                    onSelect={(date) => updateProject('startDate', date)}
                    placeholder="Selecionar data"
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Data de Entrega</Label>
                  <DatePicker
                    date={project.dueDate}
                    onSelect={(date) => updateProject('dueDate', date)}
                    placeholder="Selecionar data"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Status</Label>
                  <Select value={project.status} onValueChange={(value) => updateProject('status', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusConfig[project.status as keyof typeof statusConfig]?.bgColor || 'bg-gray-500'}`} />
                          <Badge variant="secondary" className={statusConfig[project.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'}>
                            {project.status}
                          </Badge>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${config.bgColor}`} />
                            <Badge variant="secondary" className={config.color}>
                              {status}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Priority */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Prioridade</Label>
                  <Select value={project.priority} onValueChange={(value) => updateProject('priority', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        <Badge variant="secondary" className={priorityConfig[project.priority as keyof typeof priorityConfig]?.color || 'bg-gray-100 text-gray-800'}>
                          {project.priority}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityConfig).map(([priority, config]) => (
                        <SelectItem key={priority} value={priority}>
                          <Badge variant="secondary" className={config.color}>
                            {priority}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Assigned To */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Responsável</Label>
                  <div className="flex items-center gap-3 p-3 border rounded-md bg-white">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <Input
                      value={project.assignedTo}
                      onChange={(e) => updateProject('assignedTo', e.target.value)}
                      className="border-none p-0 h-auto bg-transparent"
                      placeholder="Nome do responsável"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Orçamento</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={project.budget}
                      onChange={(e) => updateProject('budget', e.target.value)}
                      className="pl-10"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-gray-700">Progresso</Label>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={project.progress}
                    onChange={(e) => updateProject('progress', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Add Custom Field Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button variant="outline" className="w-full h-12 text-gray-600 border-dashed border-2 hover:border-blue-300 hover:text-blue-600 transition-colors">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Campo Personalizado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
