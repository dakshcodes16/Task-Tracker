import React, { useState } from 'react';
import { Trash2, Check, Edit3, X, CheckCheck } from 'lucide-react';

export default function TaskItem({
  task,
  onToggleStatus,
  onDeleteTask,
  onUpdateTaskText,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const isCompleted = task.status === 'Completed';

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const trimmed = editText.trim();
    if (trimmed && onUpdateTaskText) {
      onUpdateTaskText(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div
      id={`task-item-${task.id}`}
      className={`group relative flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      {/* Left Section: Checkbox + Content */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Checkbox button */}
        <button
          type="button"
          role="checkbox"
          aria-checked={isCompleted}
          id={`task-checkbox-${task.id}`}
          onClick={() => onToggleStatus(task.id)}
          className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
            isCompleted
              ? 'bg-blue-600 text-white border border-blue-600 shadow-sm'
              : 'border-2 border-slate-300 hover:border-blue-500 bg-white'
          }`}
          title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Title & Details */}
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
                className="w-full px-2.5 py-1 text-sm border border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 bg-white"
              />
              <button
                type="submit"
                className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                title="Save changes"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
              <span
                onClick={() => onToggleStatus(task.id)}
                className={`text-sm sm:text-base cursor-pointer select-none truncate transition-all duration-200 ${
                  isCompleted
                    ? 'text-slate-400 line-through decoration-slate-400'
                    : 'text-slate-800 font-medium'
                }`}
                title={task.text}
              >
                {task.text}
              </span>

              {/* Priority badge (if present) */}
              {task.priority && (
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold w-max ${
                    task.priority === 'High'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : task.priority === 'Medium'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Edit + Status Badge + Delete Button */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Quick Edit Trigger */}
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit task title"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Required Status Pill Badge */}
        <span
          id={`task-badge-${task.id}`}
          className={`inline-flex items-center px-2.5 py-0.8 rounded-full text-xs font-semibold tracking-wide transition-all ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {task.status}
        </span>

        {/* Required Red Trash Can Delete Button */}
        <button
          type="button"
          id={`task-delete-${task.id}`}
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete task: ${task.text}`}
          title="Delete task"
          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 active:bg-red-100 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      </div>
    </div>
  );
}
