"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type TagMakerProps = {
  value?: string[];
  onChange?: (tags: string[]) => void;
};

export const TagMaker: React.FC<TagMakerProps> = ({ value, onChange }) => {
  const [internalTags, setInternalTags] = useState<string[]>([]);
  const tags = value ?? internalTags;

  const [input, setInput] = useState("");

  const updateTags = (next: string[]) => {
    if (!value) {
      setInternalTags(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;
      if (tags.includes(trimmed)) {
        setInput("");
        return;
      }
      updateTags([...tags, trimmed]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    updateTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-300 p-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="text-gray-600 hover:text-black"
              onClick={() => removeTag(tag)}
            >
              ×
            </button>
          </div>
        ))}

        <input
          className="flex-1 min-w-[70px] border-none outline-none bg-transparent text-sm"
          placeholder="태그 입력 후 Enter"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
