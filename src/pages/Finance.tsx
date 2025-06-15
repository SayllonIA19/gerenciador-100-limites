
import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react";

// Mock data
const contracts = [
  { id: "1", name: "Product Launch Event Contract", value: 15000, date: "2024-06-01", project: "Product Launch", event: "Product Launch Event" },
  { id: "2", name: "Website Development Contract", value: 25000, date: "2024-05-15", project: "Website Redesign", event: null },
  { id: "3", name: "Marketing Campaign Contract", value: 12000, date: "2024-04-20", project: "Marketing Campaign Q2", event: "Campaign Kickoff" },
  { id: "4", name: "Training Session Contract", value: 8000, date: "2024-03-10", project: null, event: "Team Training" }
];

const expenses = [
  { id: "1", description: "Office Rent", value: 3500, date: "2024-06-01", type: "Fixed", category: "Fixed Costs" },
  { id: "2", description: "Marketing Software License", value: 299, date: "2024-06-01", type: "Fixed", category: "Tools" },
  { id: "3", description: "Team Lunch", value: 250, date: "2024-06-10", type: "Variable", category: "Team" },
  { id: "4", description: "Conference Tickets", value: 1200, date: "2024-06-05", type: "Variable", category: "Travel" },
  { id: "5", description: "Graphic Design Tools", value: 480, date: "2024-05-28", type: "Variable", category: "Tools" }
];

const totalRevenue = contracts.reduce((sum, contract) => sum + contract.value, 0);
const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
const netBalance = totalRevenue - totalExpenses;

export default function Finance() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-2">Track revenue, expenses, and financial performance</p>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard 
            title="Total Revenue" 
            value={`$${totalRevenue.toLocaleString()}`} 
            icon={<DollarSign className="h-6 w-6 text-green-600" />}
            trend={{ value: "+12%", isPositive: true }}
          />
          <KPICard 
            title="Total Expenses" 
            value={`$${totalExpenses.toLocaleString()}`} 
            icon={<TrendingDown className="h-6 w-6 text-red-600" />}
            trend={{ value: "+5%", isPositive: false }}
          />
          <KPICard 
            title="Net Balance" 
            value={`$${netBalance.toLocaleString()}`} 
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
            trend={{ value: "+15%", isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue/Contracts Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue & Contracts</CardTitle>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Revenue
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Contract Name</th>
                      <th className="text-left p-2">Value</th>
                      <th className="text-left p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{contract.name}</p>
                            {contract.project && (
                              <p className="text-xs text-gray-500">Project: {contract.project}</p>
                            )}
                            {contract.event && (
                              <p className="text-xs text-gray-500">Event: {contract.event}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-2 font-medium text-green-600">
                          ${contract.value.toLocaleString()}
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
              <CardTitle>Expenses</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Description</th>
                      <th className="text-left p-2">Value</th>
                      <th className="text-left p-2">Category</th>
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
                          ${expense.value.toLocaleString()}
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
