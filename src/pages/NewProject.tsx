import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const { createProject } = useProjects();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await createProject({ title, subtitle, description });
    if (!error) {
      toast({ title: "Projeto criado com sucesso!" });
      navigate("/projects");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Novo Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Título</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Subtítulo</label>
                <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Descrição</label>
                <Input value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">Criar Projeto</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 