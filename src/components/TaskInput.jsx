import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Tag, Sparkles, X } from 'lucide-react';

export default function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');
  const [showOptions, setShowOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = taskText.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a task description before adding.');
      return;
    }
    onAddTask(trimmed, priority, category);
    setTaskText('');
    setErrorMessage('');
    setShowOptions(false);
  };

  const handleChange = (e) => {
    setTaskText(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Main Input Box */}
          <div className="relative flex-1">
            <input
              id="task-input-field"
              type="text"
              value={taskText}
              onChange={handleChange}
              onFocus={() => setShowOptions(true)}
              placeholder="Enter a new task..."
              aria-label="Enter a new task"
              className={`w-full px-4 py-3 sm:py-3.5 pr-10 rounded-xl border ${
                errorMessage
                  ? 'border-red-400 bg-red-50/20 focus:ring-red-200 focus:border-red-500'
                  : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100 bg-white'
              } text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 outline-none focus:ring-4 shadow-sm`}
            />

            {taskText && (
              <button
                type="button"
                onClick={() => setTaskText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                title="Clear text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            id="add-task-btn"
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.2]" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Real-world Extra Attributes (Priority & Category Quick-toggles) */}
        {showOptions && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 px-1 text-xs text-slate-600 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Priority:
              </span>
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    priority === p
                      ? p === 'High'
                        ? 'bg-rose-100 text-rose-700 font-semibold border border-rose-300'
                        : p === 'Medium'
                        ? 'bg-amber-100 text-amber-800 font-semibold border border-amber-300'
                        : 'bg-slate-200 text-slate-800 font-semibold border border-slate-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Tag:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>
        )}
      </form>

      {/* Validation alert */}
      {errorMessage && (
        <div
          id="task-input-error"
          role="alert"
          className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
