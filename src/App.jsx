import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskStats from './components/TaskStats';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { RotateCcw } from 'lucide-react';

// Realistic sample tasks for a real-world developer / professional workflow
const DEFAULT_TASKS = [
  {
    id: '1',
    text: 'Finalize quarterly product roadmap presentation',
    status: 'Completed',
    priority: 'High',
    category: 'Work',
  },
  {
    id: '2',
    text: 'Review open pull requests and architecture RFC',
    status: 'Pending',
    priority: 'High',
    category: 'Engineering',
  },
  {
    id: '3',
    text: 'Prepare slides for executive leadership sync',
    status: 'Pending',
    priority: 'Medium',
    category: 'Work',
  },
  {
    id: '4',
    text: 'Update customer documentation and API reference',
    status: 'Completed',
    priority: 'Low',
    category: 'General',
  },
  {
    id: '5',
    text: 'Conduct sprint backlog grooming and retrospectives',
    status: 'Pending',
    priority: 'Medium',
    category: 'Engineering',
  },
];

const LOCAL_STORAGE_KEY = 'tasktracker_workspace_tasks';

export default function App() {
  // 1. Core State Initialization with localStorage Persistence
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTasks !== null) {
        return JSON.parse(savedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
    }
    return DEFAULT_TASKS;
  });

  // Filter state: 'All' | 'Pending' | 'Completed'
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Undo and notification toast state
  const [toast, setToast] = useState(null);

  // Persist tasks to browser localStorage whenever tasks state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to storage:', error);
    }
  }, [tasks]);

  // Show a toast message with optional Undo action
  const showToast = (message, undoAction = null) => {
    setToast({ message, undoAction });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4000);
  };

  // Add Task handler
  const handleAddTask = (text, priority = 'Medium', category = 'General') => {
    const newTask = {
      id: Date.now().toString(),
      text,
      status: 'Pending',
      priority,
      category,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast(`Added: "${text}"`);
  };

  // Toggle Task Status ('Completed' <-> 'Pending')
  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  // Update Task Text (inline editing)
  const handleUpdateTaskText = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    showToast('Task updated successfully');
  };

  // Delete Task handler with Undo capability
  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    if (!taskToDelete) return;

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    // Offer Undo option
    showToast(`Deleted "${taskToDelete.text}"`, () => {
      setTasks((prev) => [taskToDelete, ...prev]);
    });
  };

  // Reset demo tasks handler
  const handleResetDemo = () => {
    setTasks(DEFAULT_TASKS);
    setFilter('All');
    setSearchQuery('');
    showToast('Reset to default tasks');
  };

  // Clear completed tasks handler
  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((t) => t.status === 'Completed');
    if (completedTasks.length === 0) return;

    setTasks((prevTasks) => prevTasks.filter((t) => t.status !== 'Completed'));
    showToast(`Cleared ${completedTasks.length} completed tasks`, () => {
      setTasks((prev) => [...completedTasks, ...prev]);
    });
  };

  // 4. Statistics Calculation
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;

  // 6. Filtered and Searched Tasks Calculation
  const filteredTasks = tasks.filter((task) => {
    // Filter condition
    if (filter === 'Completed' && task.status !== 'Completed') return false;
    if (filter === 'Pending' && task.status !== 'Pending') return false;

    // Search condition
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchText = task.text.toLowerCase().includes(query);
      const matchCategory = task.category?.toLowerCase().includes(query);
      const matchPriority = task.priority?.toLowerCase().includes(query);
      return matchText || matchCategory || matchPriority;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Dark Blue Top Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 flex items-start justify-center">
        {/* Centrally aligned white card container with soft shadows */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-5 sm:p-8 transition-all">
          {/* Real-world Workspace Card Header */}
          <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Workspace Tasks
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage, prioritize, and accomplish your daily milestones
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60 shadow-2xs">
                Local Workspace
              </span>
            </div>
          </div>

          {/* 3. Input Section (Create Tasks) */}
          <TaskInput onAddTask={handleAddTask} />

          {/* 4. Statistics Section (Manage Tasks) */}
          <TaskStats
            total={totalCount}
            completed={completedCount}
            pending={pendingCount}
          />

          {/* 5. Filter Section & Search */}
          <TaskFilter
            activeFilter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            counts={{
              all: totalCount,
              pending: pendingCount,
              completed: completedCount,
            }}
          />

          {/* 6. Task List Display */}
          <TaskList
            tasks={filteredTasks}
            activeFilter={filter}
            searchQuery={searchQuery}
            onToggleStatus={handleToggleStatus}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskText={handleUpdateTaskText}
          />

          {/* Production Footer with Export and Shortcuts */}
          <Footer
            tasks={tasks}
            onResetDemo={handleResetDemo}
            onClearCompleted={handleClearCompleted}
            completedCount={completedCount}
          />
        </div>
      </main>

      {/* Production Toast with Undo Action */}
      {toast && (
        <div
          id="toast-notification"
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 backdrop-blur-md transition-all animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="max-w-xs truncate">{toast.message}</span>
          {toast.undoAction && (
            <button
              type="button"
              onClick={() => {
                toast.undoAction();
                setToast(null);
              }}
              className="ml-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 font-semibold text-xs border border-slate-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
