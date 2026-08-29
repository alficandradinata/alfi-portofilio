"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, SKILLS } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

interface CommandLog {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string | React.ReactNode;
}

export default function Terminal({
  soundActive,
  onToggleSound,
}: {
  soundActive: boolean;
  onToggleSound: () => void;
}) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "welcome-1",
      type: "system",
      text: "⚡ Spider-Verse Interactive OS v3.2 [Alfi Edition] initialized.",
    },
    {
      id: "welcome-2",
      type: "output",
      text: "Ketik command atau klik tombol di bawah untuk mengeksplorasi profil Alfi Candra Dinata.",
    },
  ]);

  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const quickCommands = ["help", "whoami", "skills", "projects", "contact", "spidey", "clear"];

  const handleCommand = (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    sound.playKey();

    const newLogId = `${Date.now()}-${Math.random()}`;
    const userLog: CommandLog = {
      id: `${newLogId}-in`,
      type: "input",
      text: raw,
    };

    setCommandHistory((prev) => [...prev, raw]);
    setCommandIndex(-1);

    const lower = raw.toLowerCase();
    let resultLog: CommandLog;

    switch (lower) {
      case "help":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="text-amber-400 font-bold">Daftar Perintah Tersedia:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1 text-slate-300">
                <span><b className="text-cyan-400">whoami</b> : Profil & identitas</span>
                <span><b className="text-cyan-400">skills</b> : Ringkasan tech stack</span>
                <span><b className="text-cyan-400">projects</b> : Daftar proyek unggulan</span>
                <span><b className="text-cyan-400">contact</b> : Info kontak & media</span>
                <span><b className="text-cyan-400">stack</b> : JSON format tech stack</span>
                <span><b className="text-cyan-400">status</b> : Status skripsi & kerja</span>
                <span><b className="text-cyan-400">spidey</b> : Easter egg Spider-Man</span>
                <span><b className="text-cyan-400">clear</b> : Bersihkan layar terminal</span>
                <span><b className="text-cyan-400">date</b> : Waktu lokal WIB saat ini</span>
              </div>
            </div>
          ),
        };
        break;

      case "whoami":
      case "about":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="text-emerald-400 font-semibold">{PERSONAL_INFO.name} ({PERSONAL_INFO.handle})</p>
              <p className="text-slate-300">{PERSONAL_INFO.role}</p>
              <p className="text-slate-400">{PERSONAL_INFO.bio}</p>
              <p className="text-xs text-amber-300">📍 Lokasi: {PERSONAL_INFO.location} | 🎓 {PERSONAL_INFO.skripsiStatus}</p>
            </div>
          ),
        };
        break;

      case "skills":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="text-cyan-400 font-bold">⚡ Core Technologies & Frameworks:</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SKILLS.map((s) => (
                  <span
                    key={s.name}
                    className="px-2 py-0.5 rounded text-xs bg-slate-800/80 border border-slate-700 text-slate-200"
                  >
                    {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case "projects":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-rose-400 font-bold">🚀 Featured Projects:</p>
              {PROJECTS.map((p, idx) => (
                <div key={p.id} className="border-l-2 border-rose-500/50 pl-2">
                  <p className="font-semibold text-slate-100">{idx + 1}. {p.title} ({p.year})</p>
                  <p className="text-slate-400 text-xs">{p.tagline}</p>
                  <p className="text-cyan-400/90 text-xs">Tech: {p.tags.join(", ")}</p>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case "contact":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="text-amber-400 font-bold">📬 Hubungi Alfi Candra:</p>
              <p className="text-slate-200">Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 underline">{PERSONAL_INFO.email}</a></p>
              <p className="text-slate-200">GitHub: <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/alficandradinata</a></p>
              <p className="text-slate-200">LinkedIn: <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/alficandradinata</a></p>
            </div>
          ),
        };
        break;

      case "stack":
      case "cat stack.json":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <pre className="text-xs text-amber-300 font-mono bg-black/40 p-2 rounded overflow-x-auto">
{`{
  "developer": "Alfi Candra Dinata",
  "frontend": ["React.js", "Next.js 16", "Tailwind CSS v4", "TypeScript"],
  "mobile": ["React Native", "Expo"],
  "backend": ["Python", "FastAPI", "Node.js", "MongoDB", "PostgreSQL"],
  "data_science": ["Pandas", "Streamlit", "Plotly"],
  "status": "Writing skripsi & shipping digital products 🚀"
}`}
            </pre>
          ),
        };
        break;

      case "status":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="text-xs sm:text-sm text-emerald-300 space-y-1">
              <p>🟢 Status: <b>{PERSONAL_INFO.status}</b></p>
              <p>🎓 Skripsi: Sedang menyelesaikan tugas akhir Software Engineering</p>
              <p>💼 Open to: Full-time / Freelance / Collab projects</p>
            </div>
          ),
        };
        break;

      case "spidey":
      case "spider":
        sound.playWebShoot();
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <div className="text-rose-400 font-mono text-[11px] leading-tight">
              <pre>
{`   /\\__/\\   "With great code
  (  o.o )    comes great responsibility!"
   > ^ <      ~ Miles & Peter Parker
  /||||||\\    🕸️ Spider-Verse Active`}
              </pre>
            </div>
          ),
        };
        break;

      case "date":
      case "time":
        resultLog = {
          id: `${newLogId}-out`,
          type: "output",
          text: (
            <p className="text-cyan-300 text-xs">
              🕒 Waktu Sekarang: {new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB (UTC+7)
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
          id: `${newLogId}-err`,
          type: "error",
          text: (
            <p className="text-red-400 text-xs">
              Command tidak dikenali: &quot;{raw}&quot;. Ketik <span className="text-cyan-300 font-bold">help</span> untuk daftar perintah.
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
      const nextIdx = commandIndex === -1 ? commandHistory.length - 1 : Math.max(0, commandIndex - 1);
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
    <div className="relative group w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-rose-500/20 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-rose-950/30 transition-all duration-300 hover:border-rose-500/40">
      {/* Top ambient glow line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-rose-500 via-cyan-400 to-amber-400 opacity-80" />

      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 cursor-pointer hover:opacity-80" onClick={() => setHistory([])} title="Clear Terminal" />
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50 cursor-pointer hover:opacity-80" title="Spider Mode" onClick={() => handleCommand("spidey")} />
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" title="Active" />
          </div>
          <span className="font-mono text-slate-400 font-medium ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-rose-400" />
            <span>alfi@multiverse-os:~</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border transition-all ${
              soundActive
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200"
            }`}
            title={soundActive ? "Audio Aktif (Klik untuk mute)" : "Audio Mute (Klik untuk mengaktifkan)"}
            aria-label="Sound Toggle"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setHistory([])}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5 text-slate-200 scrollbar-thin scrollbar-thumb-slate-800"
      >
        {history.map((log) => (
          <div key={log.id} className="leading-relaxed">
            {log.type === "input" && (
              <div className="flex items-center gap-2 text-rose-400">
                <span className="text-cyan-400 font-bold">$</span>
                <span className="text-slate-100 font-semibold">{log.text}</span>
              </div>
            )}
            {log.type === "output" && (
              <div className="pl-4 text-slate-300">{log.text}</div>
            )}
            {log.type === "system" && (
              <div className="text-amber-400/90 text-xs italic">{log.text}</div>
            )}
            {log.type === "error" && (
              <div className="pl-4">{log.text}</div>
            )}
          </div>
        ))}

        {/* Live Input Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-cyan-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              sound.playKey();
            }}
            onKeyDown={handleKeyDown}
            placeholder="ketik perintah di sini (contoh: help, skills)..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 font-mono text-xs sm:text-sm"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            disabled={!inputVal.trim()}
            className="text-slate-500 hover:text-cyan-400 disabled:opacity-30 transition-colors p-1"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Command Badges */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-slate-500 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-amber-400" /> Coba:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              onMouseEnter={() => sound.playHover()}
              className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-800/90 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700/60 hover:border-rose-500/40 transition-all cursor-pointer shrink-0 active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
