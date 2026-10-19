"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { TERMINAL_DATA, SITE_CONFIG } from "@/lib/site-config";

interface TerminalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (slug: string) => void;
}

interface CommandLog {
  command?: string;
  output?: React.ReactNode;
}

const COMMAND_LIST = ["help", "whoami", "ls", "open", "stack", "contact", "resume", "clear"];

export default function TerminalWindow({
  isOpen,
  onClose,
  onNavigate,
}: TerminalWindowProps) {
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTypingInit, setIsTypingInit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Auto-type "whoami" on open
  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setInputVal("");
      setHistoryIndex(-1);
      return;
    }

    setIsTypingInit(true);
    let current = "";
    const target = "whoami";
    let index = 0;

    const timer = setInterval(() => {
      if (index < target.length) {
        current += target[index];
        setInputVal(current);
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setLogs([
            {
              command: "whoami",
              output: (
                <div className="space-y-1 text-emerald-400">
                  <p>{TERMINAL_DATA.whoami}</p>
                  <p className="text-xs text-text-tertiary">Type &lsquo;help&rsquo; to see all available commands.</p>
                </div>
              ),
            },
          ]);
          setInputVal("");
          setIsTypingInit(false);
          inputRef.current?.focus();
        }, 300);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Keep scroll pinned to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, inputVal]);

  // Handle ESC and focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus
      if (e.key === "Tab") {
        if (!e.shiftKey && document.activeElement !== inputRef.current) {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim();

    let output: React.ReactNode = null;

    switch (cmd) {
      case "clear":
        setLogs([]);
        return;

      case "help":
        output = (
          <div className="space-y-1 text-text-secondary text-xs">
            <p className="text-accent font-semibold mb-1">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono">
              <div><span className="text-emerald-400">whoami</span> - Short bio &amp; focus</div>
              <div><span className="text-emerald-400">ls</span> - List all case studies</div>
              <div><span className="text-emerald-400">open &lt;slug&gt;</span> - Navigate to case study</div>
              <div><span className="text-emerald-400">stack</span> - View PM &amp; technical stack</div>
              <div><span className="text-emerald-400">contact</span> - Email, LinkedIn, GitHub</div>
              <div><span className="text-emerald-400">resume</span> - Open &amp; download PDF</div>
              <div><span className="text-emerald-400">clear</span> - Clear terminal output</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = <p className="text-emerald-400">{TERMINAL_DATA.whoami}</p>;
        break;

      case "ls":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-text-tertiary">Case study directories:</p>
            {TERMINAL_DATA.folders.map((f) => (
              <div key={f.slug} className="flex items-center gap-2">
                <span className="text-sky-400 font-bold">{f.slug}/</span>
                <span className="text-text-tertiary text-[11px]">— {f.title}</span>
              </div>
            ))}
            <p className="text-[11px] text-text-tertiary mt-1 italic">
              Tip: run &lsquo;open &lt;slug&gt;&rsquo; (e.g. open onboarding-friction-score)
            </p>
          </div>
        );
        break;

      case "open":
        if (!arg) {
          output = <p className="text-amber-400">Usage: open &lt;folder-slug&gt;. Run &lsquo;ls&rsquo; to list folders.</p>;
        } else {
          const match = TERMINAL_DATA.folders.find(
            (f) => f.slug.toLowerCase() === arg.toLowerCase().replace(/\/$/, "")
          );
          if (match) {
            output = (
              <p className="text-emerald-400">
                Opening /work/{match.slug} ...
              </p>
            );
            setTimeout(() => {
              if (onNavigate) {
                onNavigate(match.slug);
              } else {
                window.location.href = `/work/${match.slug}`;
              }
            }, 500);
          } else {
            output = (
              <p className="text-red-400">
                Directory not found: &ldquo;{arg}&rdquo;. Try running &lsquo;ls&rsquo;.
              </p>
            );
          }
        }
        break;

      case "stack":
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-accent font-semibold">Core Product &amp; Engineering Stack:</p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              {TERMINAL_DATA.stack.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p><span className="text-text-tertiary">Email:</span> <a href={`mailto:${TERMINAL_DATA.contact.email}`} className="text-sky-400 hover:underline">{TERMINAL_DATA.contact.email}</a></p>
            <p><span className="text-text-tertiary">LinkedIn:</span> <a href={TERMINAL_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">{TERMINAL_DATA.contact.linkedin}</a></p>
            <p><span className="text-text-tertiary">GitHub:</span> <a href={TERMINAL_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">{TERMINAL_DATA.contact.github}</a></p>
          </div>
        );
        break;

      case "resume":
        output = <p className="text-emerald-400">Opening resume at {SITE_CONFIG.resumePath} ...</p>;
        setTimeout(() => {
          window.open(SITE_CONFIG.resumePath, "_blank");
        }, 400);
        break;

      default:
        output = (
          <p className="text-red-400">
            command not found: {trimmed}. Try &lsquo;help&rsquo;.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: trimmed, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim();
      if (!current) return;
      const matched = COMMAND_LIST.find((c) => c.startsWith(current));
      if (matched) {
        setInputVal(matched);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Window Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none md:p-6">
            <motion.div
              ref={windowRef}
              drag
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              dragElastic={0.08}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-2xl h-[440px] max-h-[85vh] bg-[#121316]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto select-none"
              role="dialog"
              aria-modal="true"
              aria-label="Terminal Window"
            >
              {/* macOS Window Chrome Header */}
              <div
                className="h-10 bg-white/5 border-b border-white/10 px-4 flex items-center justify-between cursor-grab active:cursor-grabbing shrink-0"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 flex items-center justify-center group"
                    aria-label="Close terminal"
                  >
                    <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 flex items-center justify-center group"
                    aria-label="Minimize terminal"
                  >
                    <Minus size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <div
                    className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 flex items-center justify-center"
                    aria-label="Maximize terminal"
                  />
                </div>

                <div className="text-xs font-mono font-medium text-white/60 flex items-center gap-1.5 pointer-events-none">
                  <TerminalIcon size={12} className="text-accent" />
                  <span>josh@{TERMINAL_DATA.hostname}: ~</span>
                </div>

                <div className="w-12 text-right">
                  <span className="text-[10px] font-mono text-white/30">zsh</span>
                </div>
              </div>

              {/* Terminal Logs & Interactive Body */}
              <div
                ref={scrollRef}
                onClick={() => inputRef.current?.focus()}
                className="flex-1 p-4 font-mono text-xs sm:text-sm text-white/90 overflow-y-auto space-y-3 cursor-text select-text"
              >
                <div className="text-white/40 text-xs">
                  Last login: {new Date().toLocaleDateString()} on ttys001
                </div>

                {logs.map((log, index) => (
                  <div key={index} className="space-y-1">
                    {log.command && (
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="text-emerald-400 font-bold">
                          josh@{TERMINAL_DATA.hostname} ~ %
                        </span>
                        <span>{log.command}</span>
                      </div>
                    )}
                    {log.output && <div className="pl-0 sm:pl-2">{log.output}</div>}
                  </div>
                ))}

                {/* Active Prompt Line */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-emerald-400 font-bold shrink-0">
                    josh@{TERMINAL_DATA.hostname} ~ %
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    disabled={isTypingInit}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck={false}
                    autoCapitalize="none"
                    className="flex-1 bg-transparent text-white outline-none font-mono caret-emerald-400"
                    aria-label="Terminal command input"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
