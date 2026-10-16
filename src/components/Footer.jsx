import React from 'react';
import { RotateCcw, Trash, Download } from 'lucide-react';

export default function Footer({
  tasks = [],
  onResetDemo,
  onClearCompleted,
  completedCount = 0,
}) {
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `task-tracker-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <footer className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
      <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
        <span>Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">Enter</kbd> to add</span>
        <span className="text-slate-300">•</span>
        <span>Double-click or click pencil to edit</span>
      </div>

      <div className="flex items-center gap-3.5 flex-wrap justify-center">
        {completedCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            title="Remove all completed tasks"
          >
            <Trash className="w-3.5 h-3.5" />
            <span>Clear Completed</span>
          </button>
        )}

        {tasks.length > 0 && (
          <button
            type="button"
            onClick={handleExportJSON}
            className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            title="Download tasks as JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
        )}

        <button
          type="button"
          onClick={onResetDemo}
          className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
          title="Reset to default sample tasks"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Tasks</span>
        </button>
      </div>
    </footer>
  );
}
