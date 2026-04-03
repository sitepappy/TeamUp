"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Globe, Gamepad2, ShieldAlert, Flag } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/store";

const GAMES = [
  "DOTA 2", "CS2", "VALORANT", "DEADLOCK", "LEAGUE OF LEGENDS", "ROBLOX"
];

export default function Header() {
  const { currentUser, logout } = useApp();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto glass rounded-2xl px-4 py-2 flex items-center justify-between border-white/5 shadow-2xl backdrop-blur-2xl pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-green to-neon-purple p-0.5 group-hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all">
            <div className="w-full h-full bg-[#050505] rounded-[9px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-neon-green group-hover:text-white transition-colors" />
            </div>
          </div>
          <span className="text-lg font-black tracking-tighter text-white hidden sm:block">
            TEAM<span className="text-neon-green">UP</span>
          </span>
        </Link>

        {/* Games Navigation - More Compact */}
        <nav className="hidden xl:flex items-center gap-1 mx-4 overflow-x-auto no-scrollbar">
          {GAMES.map((game) => (
            <Link
              key={game}
              href={`/games/${game.toLowerCase().replace(/ /g, '-')}`}
              className="px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5 relative group uppercase tracking-wider whitespace-nowrap"
              onMouseEnter={() => setActiveGame(game)}
              onMouseLeave={() => setActiveGame(null)}
            >
              {game}
              {activeGame === game && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions - Grouped and Cleaned */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/report"
              className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"
              title="Репорт"
            >
              <Flag className="w-4 h-4" />
            </Link>

            {currentUser?.role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neon-purple/10 text-neon-purple hover:bg-neon-purple hover:text-white transition-all text-[10px] font-bold border border-neon-purple/20 uppercase tracking-widest"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Админ</span>
              </Link>
            )}
          </div>
          
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5" />
            <span>RU</span>
          </button>
          
          <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block"></div>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl glass border-white/10 hover:border-white/20 transition-all text-[11px] font-bold group"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-neon-purple to-neon-green p-px">
                  <div className="w-full h-full bg-[#050505] rounded-[7px] flex items-center justify-center text-[10px] text-white">
                    {currentUser.login[0].toUpperCase()}
                  </div>
                </div>
                <span className="max-w-[80px] truncate">{currentUser.login}</span>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-3 w-48 glass rounded-2xl border-white/10 p-1.5 shadow-2xl z-50 overflow-hidden">
                  <Link href="/profile" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-xs font-bold transition-all text-gray-300 hover:text-white">
                    <User className="w-4 h-4 text-neon-purple" /> Профиль
                  </Link>
                  <Link href="/messages" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-xs font-bold transition-all text-gray-300 hover:text-white">
                    <MessageSquare className="w-4 h-4 text-neon-green" /> Сообщения
                  </Link>
                  <div className="h-px bg-white/5 my-1"></div>
                  <button onClick={logout} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-red-500/10 text-red-500 text-xs font-bold transition-all">
                    <LogOut className="w-4 h-4" /> Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-neon-green transition-all text-[11px] font-black uppercase tracking-widest"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
