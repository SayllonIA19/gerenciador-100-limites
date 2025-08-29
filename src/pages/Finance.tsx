import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { useFinance } from "@/hooks/useFinance";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Finance() {
  const { 
    expenses, 
    revenues, 
    loading, 
    totalExpenses, 
    totalRevenues, 
    balance,
    deleteExpense,
    deleteRevenue
  } = useFinance();
  const [activeTab, setActiveTab] = useState<"overview" | "expenses" | "revenues">("overview");

  const handleDeleteExpense = async (expenseId: string) => {
    if (confirm("Tem certeza que deseja excluir esta despesa?")) {
      await deleteExpense(expenseId);
    }
  };

  const handleDeleteRevenue = async (revenueId: string) => {
    if (confirm("Tem certeza que deseja excluir esta receita?")) {
      await deleteRevenue(revenueId);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando dados financeiros...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Finanças</h1>
            <p className="text-gray-600 mt-2">Acompanhe suas receitas e despesas</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("expenses")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Despesa
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setActiveTab("revenues")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Receita
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("overview")}
            className="flex-1"
          >
            Visão Geral
          </Button>
          <Button
            variant={activeTab === "expenses" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("expenses")}
            className="flex-1"
          >
            Despesas
          </Button>
          <Button
            variant={activeTab === "revenues" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("revenues")}
            className="flex-1"
          >
            Receitas
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receitas Totais</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalRevenues)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(totalExpenses)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saldo</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(balance)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Despesas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {expenses.slice(0, 5).length > 0 ? (
                    <div className="space-y-3">
                      {expenses.slice(0, 5).map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-gray-500">
                              {expense.date && format(new Date(expense.date), 'dd/MM/yyyy', { locale: ptBR })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-red-600">
                              -{formatCurrency(expense.amount || 0)}
                            </p>
                            {expense.category && (
                              <Badge variant="outline" className="text-xs">
                                {expense.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma despesa encontrada.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Receitas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {revenues.slice(0, 5).length > 0 ? (
                    <div className="space-y-3">
                      {revenues.slice(0, 5).map((revenue) => (
                        <div key={revenue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{revenue.description}</p>
                            <p className="text-sm text-gray-500">
                              {revenue.date && format(new Date(revenue.date), 'dd/MM/yyyy', { locale: ptBR })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">
                              +{formatCurrency(revenue.amount || 0)}
                            </p>
                            {revenue.category && (
                              <Badge variant="outline" className="text-xs">
                                {revenue.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma receita encontrada.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <Card>
            <CardHeader>
              <CardTitle>Todas as Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.description}</TableCell>
                        <TableCell>
                          {expense.category && (
                            <Badge variant="outline">{expense.category}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {expense.date && format(new Date(expense.date), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell className="text-right font-medium text-red-600">
                          -{formatCurrency(expense.amount || 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-8">Nenhuma despesa encontrada.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Revenues Tab */}
        {activeTab === "revenues" && (
          <Card>
            <CardHeader>
              <CardTitle>Todas as Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              {revenues.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenues.map((revenue) => (
                      <TableRow key={revenue.id}>
                        <TableCell className="font-medium">{revenue.description}</TableCell>
                        <TableCell>
                          {revenue.category && (
                            <Badge variant="outline">{revenue.category}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {revenue.date && format(new Date(revenue.date), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          +{formatCurrency(revenue.amount || 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRevenue(revenue.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-8">Nenhuma receita encontrada.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
