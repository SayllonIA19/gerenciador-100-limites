
import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react";

// Mock data
const contracts = [
  { id: "1", name: "Contrato do Evento de Lançamento", value: 15000, date: "2024-06-01", project: "Lançamento do Produto", event: "Evento de Lançamento do Produto" },
  { id: "2", name: "Contrato de Desenvolvimento Web", value: 25000, date: "2024-05-15", project: "Redesign do Website", event: null },
  { id: "3", name: "Contrato da Campanha de Marketing", value: 12000, date: "2024-04-20", project: "Campanha de Marketing Q2", event: "Início da Campanha" },
  { id: "4", name: "Contrato de Sessão de Treinamento", value: 8000, date: "2024-03-10", project: null, event: "Treinamento da Equipe" }
];

const expenses = [
  { id: "1", description: "Aluguel do Escritório", value: 3500, date: "2024-06-01", type: "Fixo", category: "Custos Fixos" },
  { id: "2", description: "Licença de Software de Marketing", value: 299, date: "2024-06-01", type: "Fixo", category: "Ferramentas" },
  { id: "3", description: "Almoço da Equipe", value: 250, date: "2024-06-10", type: "Variável", category: "Equipe" },
  { id: "4", description: "Ingressos para Conferência", value: 1200, date: "2024-06-05", type: "Variável", category: "Viagem" },
  { id: "5", description: "Ferramentas de Design Gráfico", value: 480, date: "2024-05-28", type: "Variável", category: "Ferramentas" }
];

const totalRevenue = contracts.reduce((sum, contract) => sum + contract.value, 0);
const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
const netBalance = totalRevenue - totalExpenses;

export default function Finance() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-2">Acompanhe receitas, despesas e desempenho financeiro</p>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard 
            title="Receita Total" 
            value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`} 
            icon={<DollarSign className="h-6 w-6 text-green-600" />}
            trend={{ value: "+12%", isPositive: true }}
          />
          <KPICard 
            title="Despesas Totais" 
            value={`R$ ${totalExpenses.toLocaleString('pt-BR')}`} 
            icon={<TrendingDown className="h-6 w-6 text-red-600" />}
            trend={{ value: "+5%", isPositive: false }}
          />
          <KPICard 
            title="Saldo Líquido" 
            value={`R$ ${netBalance.toLocaleString('pt-BR')}`} 
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
            trend={{ value: "+15%", isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue/Contracts Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Receitas e Contratos</CardTitle>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Receita
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Nome do Contrato</th>
                      <th className="text-left p-2">Valor</th>
                      <th className="text-left p-2">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{contract.name}</p>
                            {contract.project && (
                              <p className="text-xs text-gray-500">Projeto: {contract.project}</p>
                            )}
                            {contract.event && (
                              <p className="text-xs text-gray-500">Evento: {contract.event}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-2 font-medium text-green-600">
                          R$ {contract.value.toLocaleString('pt-BR')}
                        </td>
                        <td className="p-2 text-gray-500">{contract.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Despesas</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Despesa
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Descrição</th>
                      <th className="text-left p-2">Valor</th>
                      <th className="text-left p-2">Categoria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-xs text-gray-500">{expense.date}</p>
                          </div>
                        </td>
                        <td className="p-2 font-medium text-red-600">
                          R$ {expense.value.toLocaleString('pt-BR')}
                        </td>
                        <td className="p-2">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {expense.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
