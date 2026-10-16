import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function TaskFilter({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}) {
  const filters = [
    { key: 'All', label: 'All', count: counts.all },
    { key: 'Pending', label: 'Pending', count: counts.pending },
    { key: 'Completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="space-y-3 pb-4 mb-4 border-b border-slate-200">
      {/* Top row: Filter buttons + Auto-saving status indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-semibold text-slate-700 mr-1">
            Filter by:
          </span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  id={`filter-btn-${filter.key.toLowerCase()}`}
                  type="button"
                  onClick={() => onFilterChange(filter.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auto-saving Status Indicator */}
        <div
          id="auto-save-indicator"
          className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs"
          title="All changes are automatically saved to your browser storage"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-700">Auto-saving enabled</span>
        </div>
      </div>

      {/* Instant Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter or search tasks by keyword..."
          className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
