import React from 'react';
import { CheckCircle2, Clock, BarChart3, TrendingUp } from 'lucide-react';

export default function TaskStats({ total, completed, pending }) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getMotivationalNote = () => {
    if (total === 0) return 'No tasks yet. Create one to kick off your day!';
    if (completionRate === 100) return '🎉 Outstanding! All tasks completed today.';
    if (completionRate >= 50) return '💪 More than halfway there! Keep the momentum.';
    return '🚀 Let’s make progress on your pending tasks.';
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Total Tasks Card */}
        <div
          id="stat-total-tasks"
          className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 rounded-2xl p-3 sm:p-4 text-center shadow-sm transition-all hover:border-slate-300 hover:shadow"
        >
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs sm:text-sm font-semibold mb-1">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <span>Total Tasks</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            {total}
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div
          id="stat-completed-tasks"
          className="bg-gradient-to-b from-emerald-50/40 to-emerald-50/80 border border-emerald-100 rounded-2xl p-3 sm:p-4 text-center shadow-sm transition-all hover:border-emerald-200 hover:shadow"
        >
          <div className="flex items-center justify-center gap-1.5 text-emerald-800 text-xs sm:text-sm font-semibold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <span>Completed</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
            {completed}
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div
          id="stat-pending-tasks"
          className="bg-gradient-to-b from-amber-50/40 to-amber-50/80 border border-amber-100 rounded-2xl p-3 sm:p-4 text-center shadow-sm transition-all hover:border-amber-200 hover:shadow"
        >
          <div className="flex items-center justify-center gap-1.5 text-amber-800 text-xs sm:text-sm font-semibold mb-1">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
            <span>Pending</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 tracking-tight">
            {pending}
          </div>
        </div>
      </div>

      {/* Progress Bar & Productivity Motivation */}
      {total > 0 && (
        <div className="mt-3.5 px-1 bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 sm:p-3">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              {getMotivationalNote()}
            </span>
            <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              {completionRate}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
