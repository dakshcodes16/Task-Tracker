import React from 'react';
import TaskItem from './TaskItem';
import { ListFilter, CheckCircle, ClipboardList, SearchX } from 'lucide-react';

export default function TaskList({
  tasks,
  activeFilter,
  searchQuery,
  onToggleStatus,
  onDeleteTask,
  onUpdateTaskText,
}) {
  const getFilterLabel = () => {
    if (activeFilter === 'All') return 'All Tasks';
    if (activeFilter === 'Completed') return 'Completed Tasks';
    return 'Pending Tasks';
  };

  return (
    <div className="space-y-3">
      {/* Subheader banner showing Current View */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-600 bg-slate-50/90 px-3.5 py-2.5 rounded-xl border border-slate-200/70">
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-blue-600" />
          <span>
            Current View:{' '}
            <strong className="text-slate-800">{getFilterLabel()}</strong>
            {searchQuery && (
              <span className="text-slate-400 font-normal ml-1">
                (matching &ldquo;{searchQuery}&rdquo;)
              </span>
            )}
          </span>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-slate-200 rounded-full text-slate-600">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {/* Task List or Empty State */}
      {tasks.length === 0 ? (
        <div
          id="tasks-empty-state"
          className="text-center py-12 px-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
            {searchQuery ? (
              <SearchX className="w-6 h-6 text-slate-400" />
            ) : activeFilter === 'Completed' ? (
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
              <ClipboardList className="w-6 h-6 text-blue-500" />
            )}
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">
            {searchQuery
              ? `No tasks match "${searchQuery}"`
              : activeFilter === 'Completed'
              ? 'No completed tasks yet'
              : activeFilter === 'Pending'
              ? 'All caught up! No pending tasks.'
              : 'Your workspace is clear'}
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? 'Try searching for something else or clear the search query.'
              : activeFilter === 'Completed'
              ? 'Check off tasks as you finish them to track your accomplishments.'
              : activeFilter === 'Pending'
              ? 'Take a break or add new tasks above to plan ahead.'
              : 'Add your primary goals and tasks above to start organizing your day.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5" id="task-items-container">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
              onUpdateTaskText={onUpdateTaskText}
            />
          ))}
        </div>
      )}
    </div>
  );
}
