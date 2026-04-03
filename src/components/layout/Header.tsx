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
      className="fixed top-0 left-0 w-full z-50 p-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/5 shadow-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-neon-purple p-0.5 group-hover:shadow-[0_0_15px_#00FF9C] transition-all">
            <div className="w-full h-full bg-[#050505] rounded-[7px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-neon-green group-hover:text-white transition-colors" />
            </div>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            TEAM<span className="text-neon-green">UP</span>
          </span>
        </Link>

        {/* Games Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {GAMES.map((game) => (
            <Link
              key={game}
              href={`/games/${game.toLowerCase().replace(/ /g, '-')}`}
              className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5 relative group"
              onMouseEnter={() => setActiveGame(game)}
              onMouseLeave={() => setActiveGame(null)}
            >
              {game}
              {activeGame === game && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-neon-green/5 rounded-lg border border-neon-green/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/report"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-medium"
          >
            <Flag className="w-4 h-4" />
            <span>Репорт</span>
          </Link>

          {currentUser?.role === 'admin' && (
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-purple/10 text-neon-purple hover:bg-neon-purple hover:text-white transition-all text-sm font-bold border border-neon-purple/20"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Админ</span>
            </Link>
          )}
          
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-medium">
            <Globe className="w-4 h-4" />
            <span>RU</span>
          </button>
          
          <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-white/10 hover:border-neon-purple transition-all text-sm font-bold group"
              >
                <div className="w-6 h-6 rounded-lg bg-neon-purple/20 flex items-center justify-center text-neon-purple text-[10px]">
                  {currentUser.login[0].toUpperCase()}
                </div>
                <span>{currentUser.login}</span>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 glass rounded-2xl border-white/10 p-2 shadow-2xl z-50">
                  <Link href="/profile" className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/5 text-sm transition-all">
                    <User className="w-4 h-4" /> Профиль
                  </Link>
                  <Link href="/messages" className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/5 text-sm transition-all">
                    <Flag className="w-4 h-4" /> Сообщения
                  </Link>
                  <button onClick={logout} className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-red-500/10 text-red-500 text-sm transition-all">
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-white/10 hover:border-neon-purple transition-all text-sm font-bold group"
            >
              <User className="w-4 h-4 text-neon-purple group-hover:scale-110 transition-transform" />
              <span>Войти</span>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
