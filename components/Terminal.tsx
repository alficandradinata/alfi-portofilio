"use client";

import React, { useState, useRef, useEffect } from "react";
import { TerminalSquare, CornerDownLeft, RotateCcw } from "lucide-react";
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
  TIMELINE,
} from "@/data/portfolioData";

interface CommandLog {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: React.ReactNode;
}

const WELCOME: CommandLog = {
  id: "welcome",
  type: "system",
  text: "Ketik perintah, atau pilih salah satu tombol di bawah, untuk menelusuri profil.",
};

const QUICK_COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "experience",
  "contact",
  "clear",
];

export default function Terminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([WELCOME]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    const logId = `${Date.now()}-${Math.random()}`;
    const userLog: CommandLog = { id: `${logId}-in`, type: "input", text: raw };

    setCommandHistory((prev) => [...prev, raw]);
    setCommandIndex(-1);

    let resultLog: CommandLog;

    switch (raw.toLowerCase()) {
      case "help":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div>
              <p className="text-slate-200 font-semibold">Perintah tersedia</p>
              <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {[
                  ["whoami", "Profil singkat"],
                  ["skills", "Daftar keahlian teknis"],
                  ["projects", "Proyek yang dikerjakan"],
                  ["experience", "Riwayat pengalaman"],
                  ["contact", "Informasi kontak"],
                  ["stack", "Tech stack format JSON"],
                  ["status", "Ketersediaan saat ini"],
                  ["date", "Waktu lokal WIB"],
                  ["clear", "Bersihkan layar"],
                ].map(([name, desc]) => (
                  <div key={name} className="flex gap-2">
                    <dt className="text-sky-300 shrink-0 w-24">{name}</dt>
                    <dd className="text-slate-400">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ),
        };
        break;

      case "whoami":
      case "about":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div className="space-y-1.5">
              <p className="text-slate-100 font-semibold">
                {PERSONAL_INFO.name}
              </p>
              <p className="text-sky-300">{PERSONAL_INFO.role}</p>
              <p className="text-slate-400">{PERSONAL_INFO.bio}</p>
              <p className="text-slate-400">
                Lokasi: {PERSONAL_INFO.location} — {PERSONAL_INFO.skripsiStatus}
              </p>
            </div>
          ),
        };
        break;

      case "skills":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div className="space-y-1">
              <p className="text-slate-200 font-semibold">Keahlian teknis</p>
              {SKILLS.map((skill) => (
                <div key={skill.name} className="flex gap-2 text-slate-400">
                  <span className="text-sky-300 shrink-0">•</span>
                  <span>
                    <span className="text-slate-200">{skill.name}</span>{" "}
                    — {skill.experience}
                  </span>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case "projects":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div className="space-y-2.5">
              <p className="text-slate-200 font-semibold">Proyek</p>
              {PROJECTS.map((project, idx) => (
                <div
                  key={project.id}
                  className="border-l-2 border-slate-700 pl-3"
                >
                  <p className="text-slate-100">
                    {idx + 1}. {project.title} ({project.year})
                  </p>
                  <p className="text-slate-400">{project.tagline}</p>
                  <p className="text-sky-300">{project.tags.join(", ")}</p>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case "experience":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div className="space-y-2.5">
              <p className="text-slate-200 font-semibold">Pengalaman</p>
              {TIMELINE.map((item) => (
                <div
                  key={`${item.period}-${item.role}`}
                  className="border-l-2 border-slate-700 pl-3"
                >
                  <p className="text-slate-100">{item.role}</p>
                  <p className="text-slate-400">
                    {item.company} — {item.period}
                  </p>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case "contact":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-slate-400">
              <p className="text-slate-200 font-semibold">Kontak</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sky-300 underline underline-offset-2"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>
                GitHub:{" "}
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-300 underline underline-offset-2"
                >
                  github.com/alficandradinata
                </a>
              </p>
              <p>
                LinkedIn:{" "}
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-300 underline underline-offset-2"
                >
                  linkedin.com/in/alficandradinata
                </a>
              </p>
            </div>
          ),
        };
        break;

      case "stack":
      case "cat stack.json":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <pre className="text-sky-200 overflow-x-auto">
              {`{
  "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  "mobile":   ["React Native", "Expo"],
  "backend":  ["Python", "FastAPI", "Node.js"],
  "database": ["MongoDB", "PostgreSQL"],
  "data":     ["Pandas", "Streamlit", "Plotly"]
}`}
            </pre>
          ),
        };
        break;

      case "status":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-slate-400">
              <p>
                <span className="text-slate-200">Ketersediaan:</span>{" "}
                {PERSONAL_INFO.status}
              </p>
              <p>
                <span className="text-slate-200">Studi:</span>{" "}
                {PERSONAL_INFO.skripsiStatus}
              </p>
              <p>
                <span className="text-slate-200">Terbuka untuk:</span> penuh
                waktu, lepas, dan kolaborasi
              </p>
            </div>
          ),
        };
        break;

      case "date":
      case "time":
        resultLog = {
          id: `${logId}-out`,
          type: "output",
          text: (
            <p className="text-slate-400">
              {new Date().toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
              })}{" "}
              WIB (UTC+7)
            </p>
          ),
        };
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        resultLog = {
          id: `${logId}-err`,
          type: "error",
          text: (
            <p className="text-rose-300">
              Perintah tidak dikenali: {raw}. Ketik{" "}
              <span className="text-sky-300">help</span> untuk daftar perintah.
            </p>
          ),
        };
        break;
    }

    setHistory((prev) => [...prev, userLog, resultLog]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx =
        commandIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex === -1) return;
      const nextIdx = commandIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setCommandIndex(-1);
        setInputVal("");
      } else {
        setCommandIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-line bg-console shadow-sm">
      {/* Bilah judul */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-console-line border-b border-slate-700">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <TerminalSquare
            className="w-4 h-4 text-slate-400 shrink-0"
            aria-hidden="true"
          />
          Profil interaktif
        </p>

        <button
          type="button"
          onClick={() => setHistory([WELCOME])}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 bg-slate-700/60 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          Bersihkan
        </button>
      </div>

      {/* Isi terminal */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-live="polite"
        aria-label="Keluaran terminal"
        className="p-4 h-80 overflow-y-auto font-mono text-sm leading-relaxed space-y-3 text-slate-300"
      >
        {history.map((log) => (
          <div key={log.id}>
            {log.type === "input" && (
              <p className="flex items-start gap-2">
                <span className="text-sky-400 shrink-0" aria-hidden="true">
                  $
                </span>
                <span className="text-slate-100">{log.text}</span>
              </p>
            )}
            {log.type === "output" && <div className="pl-4">{log.text}</div>}
            {log.type === "system" && (
              <p className="text-slate-500">{log.text}</p>
            )}
            {log.type === "error" && <div className="pl-4">{log.text}</div>}
          </div>
        ))}

        {/* Baris input */}
        <div className="flex items-center gap-2">
          <span className="text-sky-400 shrink-0" aria-hidden="true">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ketik: help"
            aria-label="Masukkan perintah"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => handleCommand(inputVal)}
            disabled={!inputVal.trim()}
            aria-label="Jalankan perintah"
            className="p-1 rounded text-slate-500 hover:text-sky-300 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Pintasan perintah */}
      <div className="px-4 py-3 bg-console-line border-t border-slate-700 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs text-slate-500 shrink-0">Coba:</span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-700/60 hover:bg-slate-600 transition-colors shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
