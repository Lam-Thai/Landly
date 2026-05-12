"use client";

import { useState } from "react";

type JobDescriptionInputProps = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  maxLength?: number;
};

export default function JobDescriptionInput({
  value,
  onChange,
  onSubmit,
  maxLength = 5000,
}: JobDescriptionInputProps) {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) {
      setError("Job description cannot be empty.");
      return;
    }

    setError("");
    onSubmit();
  };

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Paste a job posting"
        className="min-h-40 w-full rounded-md border border-border bg-surface-alt p-3 text-sm text-text-primary"
      />
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{value.length}/{maxLength}</span>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md border border-border px-3 py-1 text-text-primary"
        >
          Apply
        </button>
      </div>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
