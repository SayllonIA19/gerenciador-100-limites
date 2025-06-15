
import { Layout } from "@/components/Layout";
import { FeedPost } from "@/components/FeedPost";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data
const feedPosts = [
  {
    id: "1",
    caption: "Ótimo progresso no evento de lançamento do produto! O local está reservado e estamos finalizando a lista de palestrantes. Tempos empolgantes pela frente! 🚀",
    author: "João Silva",
    event: "Evento de Lançamento do Produto",
    date: "2 horas atrás",
    media: ["image1.jpg", "image2.jpg"]
  },
  {
    id: "2",
    caption: "O workshop de integração da equipe foi um grande sucesso! Incrível ver todos colaborando e compartilhando ideias. A química da equipe está mais forte do que nunca.",
    author: "Maria Santos",
    event: "Workshop de Integração da Equipe",
    date: "1 dia atrás",
    media: ["team_photo.jpg"]
  },
  {
    id: "3",
    caption: "A apresentação para o cliente foi incrivelmente bem! Eles adoraram nossa proposta e vamos seguir em frente com o projeto. Obrigado a todos que contribuíram para tornar isso possível.",
    author: "Pedro Johnson",
    event: "Apresentação para Cliente",
    date: "3 dias atrás"
  },
  {
    id: "4",
    caption: "Bastidores do nosso ensaio fotográfico da campanha de marketing. A equipe criativa está fazendo um trabalho incrível dando vida à nossa visão!",
    author: "Ana Wilson",
    event: "Revisão da Campanha de Marketing",
    date: "5 dias atrás",
    media: ["bts1.jpg", "bts2.jpg", "bts3.jpg", "bts4.jpg"]
  },
  {
    id: "5",
    caption: "As reuniões de revisão trimestral são sempre esclarecedoras. Ótimo refletir sobre nossas conquistas e planejar o próximo trimestre com objetivos claros.",
    author: "Carlos Brown",
    event: "Revisão Trimestral",
    date: "1 semana atrás"
  }
];

export default function Feed() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Feed do Projeto</h1>
            <p className="text-gray-600 mt-2">Mantenha-se atualizado com atividades dos projetos e atualizações da equipe</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nova Postagem
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <Button variant="outline">
            Carregar Mais Postagens
          </Button>
        </div>
      </div>
    </Layout>
  );
}
