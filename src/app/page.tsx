"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Zap, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations - Ensure they never block clicks */}
      <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_15px_#00FF9C]"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse delay-75 shadow-[0_0_15px_#9D00FF]"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-neon-green rounded-full animate-pulse delay-150 shadow-[0_0_15px_#00FF9C]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass max-w-5xl w-full p-8 md:p-16 rounded-[3rem] relative z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <Zap className="w-3.5 h-3.5 fill-neon-green" />
                <span>Next Gen Gaming Platform</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] text-white"
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
                TeamUp — самая быстрая платформа для поиска тиммейтов в любимых играх.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Users, text: "Находи игроков под свой уровень", color: "text-neon-green" },
                { icon: MessageSquare, text: "Общайся в реальном времени", color: "text-neon-purple" },
                { icon: Zap, text: "Собирай команду за минуты", color: "text-neon-green" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-5 group clickable"
                >
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-${item.color.split('-')[1]} group-hover:bg-white/10 transition-all`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-gray-300 font-bold uppercase text-xs tracking-widest">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Link 
                href="/register" 
                className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-neon-green transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                Начать сейчас <Play className="w-3.5 h-3.5 fill-black" />
              </Link>
              <Link 
                href="/login" 
                className="px-10 py-5 glass border-white/10 hover:border-white/30 transition-all font-black uppercase text-xs tracking-widest rounded-2xl text-center"
              >
                Войти
              </Link>
            </motion.div>
          </div>

          <div className="hidden md:block relative">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <div className="glass rounded-[2.5rem] p-3 border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
                <div className="w-full aspect-[4/3] rounded-[2rem] bg-[#050505] border border-white/5 flex items-center justify-center relative overflow-hidden">
                  {/* Interface Preview Simulation - More Minimal */}
                  <div className="absolute top-4 left-6 flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                  </div>
                  <div className="p-8 w-full space-y-6">
                    <div className="h-6 w-2/3 bg-white/5 rounded-full"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-white/5 rounded-[1.5rem] border border-white/5"></div>
                      <div className="h-32 bg-white/5 rounded-[1.5rem] border border-white/5"></div>
                    </div>
                    <div className="h-4 w-1/3 bg-white/5 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/5 to-neon-purple/5 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Orbs - Depth & Color */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-green/10 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-purple/10 blur-[100px] rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
