"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Zap, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#00FF9C]"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse delay-75 shadow-[0_0_10px_#9D00FF]"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-neon-green rounded-full animate-pulse delay-150 shadow-[0_0_10px_#00FF9C]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass max-w-4xl w-full p-8 md:p-12 rounded-[2rem] relative z-10 overflow-hidden"
      >
        {/* Neon Glow Borders */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Найди свою <span className="text-neon-green text-glow-green">команду</span> за секунды
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg md:text-xl"
              >
                TeamUp — платформа для поиска тиммейтов и общения в любимых играх
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
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-${item.color.split('-')[1]} transition-colors`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link 
                href="/register" 
                className="px-8 py-4 bg-neon-green text-black font-bold rounded-xl hover:shadow-[0_0_20px_#00FF9C] transition-all flex items-center justify-center gap-2 group"
              >
                Начать <Play className="w-4 h-4 fill-black group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/login" 
                className="px-8 py-4 glass border-white/20 hover:border-neon-purple transition-all font-bold rounded-xl text-center"
              >
                Войти
              </Link>
            </motion.div>
          </div>

          <div className="hidden md:block relative">
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
              <div className="glass rounded-2xl p-4 border-neon-purple/30 shadow-[0_0_30px_rgba(157,0,255,0.1)]">
                <div className="w-full aspect-video rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative overflow-hidden">
                  {/* Interface Preview Simulation */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="p-4 w-full space-y-3">
                    <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-20 bg-white/5 rounded border border-white/10"></div>
                      <div className="h-20 bg-white/5 rounded border border-white/10"></div>
                    </div>
                    <div className="h-4 w-1/2 bg-white/5 rounded"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 to-neon-purple/10 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Orbs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-green/20 blur-[50px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-purple/20 blur-[50px] rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
