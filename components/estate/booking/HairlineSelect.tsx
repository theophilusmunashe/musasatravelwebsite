"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import type { BookingLane } from "@/lib/booking-flow";

type HairlineSelectProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  lane: BookingLane;
  onChange: (value: string) => void;
};

export default function HairlineSelect({
  id,
  label,
  value,
  options,
  placeholder = "Choose…",
  lane,
  onChange,
}: HairlineSelectProps) {
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const borderDefault = lane === "chat" ? chat.inputBorder : undefined;
  const borderFocus = lane === "chat" ? chat.inputFocus : undefined;
  const textColor = lane === "chat" ? chat.text : undefined;
  const mutedColor = lane === "chat" ? chat.textMuted : undefined;

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !listRef.current?.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  const selectOption = (option: string) => {
    onChange(option);
    close();
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setFocusedIndex(value ? options.indexOf(value) : 0);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      selectOption(options[focusedIndex]);
    }
  };

  useEffect(() => {
    if (open && focusedIndex >= 0) {
      listRef.current?.children[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, focusedIndex]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "flex w-full min-h-[44px] items-center gap-2 border-0 border-b bg-transparent px-0 py-2",
          "text-base leading-normal outline-none transition-[border-color] duration-150",
          "focus-visible:border-b-[1.5px] focus-visible:outline-none",
          lane === "manual" &&
            "border-estate-border text-estate-ink focus-visible:border-estate-terracotta"
        )}
        style={
          lane === "chat"
            ? {
                color: value ? textColor : mutedColor,
                borderBottomWidth: "1.5px",
                borderBottomColor: open ? borderFocus : borderDefault,
              }
            : { borderBottomWidth: "1.5px" }
        }
      >
        <span className="flex-1 truncate text-left">{value || placeholder}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}
          style={lane === "chat" ? { color: mutedColor } : undefined}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className={cn(
            "absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-auto rounded-lg border py-1 shadow-md",
            lane === "manual" && "border-estate-border bg-estate-ivory"
          )}
          style={
            lane === "chat"
              ? { borderColor: chat.border, backgroundColor: chat.surface }
              : undefined
          }
        >
          {options.map((option, index) => {
            const selected = option === value;
            const focused = index === focusedIndex;
            return (
              <li
                key={option}
                role="option"
                aria-selected={selected}
                tabIndex={focused ? 0 : -1}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => selectOption(option)}
                className={cn(
                  "cursor-pointer px-3 py-2.5 text-base min-h-[44px] flex items-center break-words",
                  lane === "manual" && "text-estate-ink",
                  lane === "manual" && selected && "text-estate-terracotta font-medium",
                  lane === "manual" && focused && !selected && "bg-estate-warm"
                )}
                style={
                  lane === "chat"
                    ? {
                        color: chat.text,
                        backgroundColor: selected || focused ? chat.userBubble : undefined,
                      }
                    : undefined
                }
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
