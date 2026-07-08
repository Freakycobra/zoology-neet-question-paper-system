"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { getChaptersForClass } from "@/lib/syllabus";
import { Search, ChevronDown, ChevronRight, CheckSquare, Square } from "lucide-react";

interface TopicSelectorProps {
  classLevel: 11 | 12;
  selectedTopics: string[];
  onChange: (topics: string[]) => void;
}

export function TopicSelector({ classLevel, selectedTopics, onChange }: TopicSelectorProps) {
  const chapters = useMemo(() => getChaptersForClass(classLevel), [classLevel]);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  const toggleSubtopic = (chapterId: string, subtopicIdx: number) => {
    const topicId = `${chapterId}-sub${subtopicIdx}`;
    if (selectedTopics.includes(topicId)) {
      onChange(selectedTopics.filter((t) => t !== topicId));
    } else {
      onChange([...selectedTopics, topicId]);
    }
  };

  const selectAllInChapter = (chapterId: string) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;
    const subtopicIds = chapter.subtopics.map((_, idx) => `${chapterId}-sub${idx}`);
    const allSelected = subtopicIds.every((id) => selectedTopics.includes(id));
    if (allSelected) {
      onChange(selectedTopics.filter((t) => !subtopicIds.includes(t)));
    } else {
      const newTopics = [...selectedTopics];
      subtopicIds.forEach((id) => {
        if (!newTopics.includes(id)) newTopics.push(id);
      });
      onChange(newTopics);
    }
  };

  const clearAll = () => onChange([]);

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    const q = searchQuery.toLowerCase();
    return chapters.filter(
      (ch) =>
        ch.name.toLowerCase().includes(q) ||
        ch.subtopics.some((st) => st.toLowerCase().includes(q))
    );
  }, [chapters, searchQuery]);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search chapters or subtopics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Clear all */}
      {selectedTopics.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {selectedTopics.length} subtopic{selectedTopics.length !== 1 ? "s" : ""} selected
          </span>
          <button
            onClick={clearAll}
            className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Chapter list */}
      <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
        {filteredChapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const subtopicIds = chapter.subtopics.map((_, idx) => `${chapter.id}-sub${idx}`);
          const selectedCount = subtopicIds.filter((id) => selectedTopics.includes(id)).length;
          const allSelected = selectedCount === subtopicIds.length;
          const someSelected = selectedCount > 0 && !allSelected;

          return (
            <div
              key={chapter.id}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white"
            >
              {/* Chapter header */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50/60">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => selectAllInChapter(chapter.id)}
                  className="flex items-center text-slate-500 hover:text-teal-600 transition-colors"
                >
                  {allSelected ? (
                    <CheckSquare className="h-4 w-4 text-teal-600" />
                  ) : someSelected ? (
                    <div className="h-4 w-4 rounded-sm border-2 border-teal-600 bg-teal-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-0.5 w-2 bg-white rounded-full" />
                      </div>
                    </div>
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="flex-1 text-left"
                >
                  <span className="text-sm font-medium text-slate-800">
                    {chapter.name}
                  </span>
                  <span className="ml-2 text-xs text-slate-400">
                    {chapter.chapter}
                  </span>
                </button>

                <span
                  className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    selectedCount > 0
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-400"
                  )}
                >
                  {selectedCount}/{subtopicIds.length}
                </span>
              </div>

              {/* Subtopics */}
              {isExpanded && (
                <div className="divide-y divide-slate-50">
                  {chapter.subtopics.map((subtopic, idx) => {
                    const topicId = `${chapter.id}-sub${idx}`;
                    const isSelected = selectedTopics.includes(topicId);
                    return (
                      <label
                        key={topicId}
                        className={cn(
                          "flex items-start gap-2.5 px-3 py-2 cursor-pointer transition-colors hover:bg-slate-50",
                          isSelected && "bg-teal-50/40"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSubtopic(chapter.id, idx)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 accent-teal-600"
                        />
                        <span
                          className={cn(
                            "text-sm leading-relaxed",
                            isSelected ? "text-teal-900" : "text-slate-600"
                          )}
                        >
                          {subtopic}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredChapters.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6">
            No chapters match your search.
          </p>
        )}
      </div>
    </div>
  );
}
