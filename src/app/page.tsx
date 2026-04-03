"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Zap, Play, Trophy, Shield, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";

export default function Home() {
  const { posts, users } = useApp();

  return (
    <main className="min-h-screen flex flex-col items-center p-6 relative overflow-hidden pt-32">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_15px_#00FF9C]"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse delay-75 shadow-[0_0_15px_#9D00FF]"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-neon-green rounded-full animate-pulse delay-150 shadow-[0_0_15px_#00FF9C]"></div>
        <div className="absolute inset-0 neon-grid opacity-20"></div>
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(157,0,255,0.1)]"
            >
              <Zap className="w-3.5 h-3.5 fill-neon-purple" />
              <span>Next Gen Gaming Platform</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white"
            >
              Найди свою <br />
              <span className="text-neon-green text-glow-green">команду</span> <br />
              за секунды
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg md:text-xl font-medium max-w-md leading-relaxed"
            >
              TeamUp — самая быстрая и современная платформа для поиска тиммейтов в любимых играх.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link 
              href={currentUser ? "/games/dota-2" : "/register"} 
              className="px-10 py-6 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-neon-green transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-neon-green/40"
            >
              Начать сейчас <Play className="w-3.5 h-3.5 fill-black" />
            </Link>
            <Link 
              href="/games/dota-2" 
              className="px-10 py-6 glass-premium border-white/10 hover:border-white/30 transition-all font-black uppercase text-xs tracking-widest rounded-2xl text-center flex items-center justify-center gap-3"
            >
              Выбрать игру <Gamepad2 className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-12 pt-4 border-t border-white/5">
            <div className="space-y-1">
              <p className="text-3xl font-black text-white italic tracking-tighter">{users.length * 124 + 1205}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Активных игроков</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-neon-green italic tracking-tighter">{posts.length + 42}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Заявок сегодня</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-neon-purple italic tracking-tighter">24ms</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Средний пинг</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10"
          >
            <div className="glass-premium rounded-[3rem] p-4 border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
              <div className="bg-[#050505] rounded-[2.5rem] border border-white/5 overflow-hidden">
                <div className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Dashboard</div>
                  </div>

                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post, i) => (
                      <div key={i} className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between group cursor-pointer hover:border-neon-green/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs group-hover:text-neon-green">
                            {post.userName[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{post.userName}</p>
                            <p className="text-[9px] font-black text-neon-purple uppercase tracking-widest">{post.gameId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-neon-green">{post.elo}</p>
                          <p className="text-[8px] text-gray-600 font-black uppercase">ELO</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex gap-4">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['20%', '80%', '40%'] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="h-full bg-neon-green shadow-[0_0_10px_#00FF9C]"
                      />
                    </div>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['60%', '30%', '90%'] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="h-full bg-neon-purple shadow-[0_0_10px_#9D00FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Background Glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-neon-green/20 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-neon-purple/20 blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl w-full grid md:grid-cols-3 gap-8 mt-32 mb-20">
        {[
          { icon: Users, title: "Умный подбор", desc: "Система анализирует твой уровень и находит идеальных тиммейтов.", color: "text-neon-green" },
          { icon: Shield, title: "Безопасность", desc: "Модерация и система репортов следят за порядком в комьюнити.", color: "text-neon-purple" },
          { icon: Zap, title: "Мгновенно", desc: "Никаких ожиданий. Нашел, написал, пошел играть.", color: "text-neon-blue" },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="glass-premium p-10 rounded-[2.5rem] border-white/5 space-y-6 relative group overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all ${f.color}`}>
              <f.icon className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{f.title}</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity rounded-full bg-current ${f.color}`}></div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
