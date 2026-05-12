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

  const inputId = "job-description-input";
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-xs font-medium text-text-muted">
        Job posting
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Paste a job posting"
        aria-describedby={error ? errorId : undefined}
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
      {error ? <p id={errorId} role="alert" className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
