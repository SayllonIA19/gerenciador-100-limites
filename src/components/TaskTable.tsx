
interface Task {
  id: string;
  title: string;
  status: "A Fazer" | "Em Andamento" | "Concluído";
  deadline: string;
  assignee: string;
  type?: string; // Add optional type property for marketing tasks
}

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const statusColors = {
  "A Fazer": "bg-gray-100 text-gray-800",
  "Em Andamento": "bg-blue-100 text-blue-800",
  "Concluído": "bg-green-100 text-green-800"
};

export function TaskTable({ tasks, onTaskClick }: TaskTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarefa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Responsável
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prazo
            </th>
            {tasks.some(task => task.type) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr 
              key={task.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onTaskClick(task)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {task.assignee}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {task.deadline}
              </td>
              {tasks.some(task => task.type) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.type || '-'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
