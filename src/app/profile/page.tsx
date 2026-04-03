"use client";

import { motion } from "framer-motion";
import { User, Shield, Gamepad2, Settings, MessageCircle, MoreHorizontal, Trophy, Mail } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-neon-purple opacity-5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-green opacity-5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner & Avatar Section */}
        <div className="relative">
          <div className="h-64 md:h-80 w-full rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-[#1a1a1a] border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute -bottom-16 left-8 md:left-12 flex flex-col md:flex-row md:items-end gap-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-neon-green to-neon-purple p-1 shadow-2xl">
                <div className="w-full h-full bg-[#050505] rounded-[1.8rem] flex items-center justify-center border border-white/10 overflow-hidden relative">
                  <User className="w-16 h-16 text-white/20" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#050505]"></div>
                </div>
              </div>
            </motion.div>
            
            <div className="pb-4 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Vlad_Pro_2007</h1>
                <Shield className="w-6 h-6 text-neon-green" />
              </div>
              <p className="text-gray-400 font-medium flex items-center gap-2">
                <span>Профессиональный фидер</span>
                <span>•</span>
                <span className="text-neon-purple">В сети</span>
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 md:right-12 hidden md:flex items-center gap-3">
            <button className="px-6 py-3 glass border-white/10 rounded-xl font-bold hover:border-neon-purple transition-all flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </button>
            <button className="px-6 py-3 bg-neon-green text-black rounded-xl font-bold hover:shadow-[0_0_15px_#00FF9C] transition-all flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Сообщение
            </button>
            <button className="p-3 glass border-white/10 rounded-xl hover:bg-white/5 transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-8 pt-16 md:pt-12">
          {/* Left Column */}
          <div className="space-y-8">
            <section className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider">
                <User className="w-5 h-5 text-neon-green" />
                О себе
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Играю в доту с 2013 года. Люблю мид и оффлейн. Ищу адекватных тиммейтов для поднятия рейтинга. Не токсичный (иногда). В основном играю по вечерам.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Competitive", "Casual", "Mid", "Supp", "Team Player"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-gray-500 border border-white/5">#{tag}</span>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider px-4">
                <Gamepad2 className="w-5 h-5 text-neon-purple" />
                Мои игры
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "DOTA 2", rank: "Immortal", elo: 6200, icon: "D" },
                  { name: "CS2", rank: "Global Elite", elo: 2500, icon: "C" },
                  { name: "VALORANT", rank: "Radiant", elo: 800, icon: "V" },
                  { name: "DEADLOCK", rank: "High Tier", elo: 4500, icon: "D" },
                ].map((game, i) => (
                  <motion.div
                    key={game.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 rounded-3xl border-white/5 hover:border-neon-purple/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-2xl text-white/20 group-hover:text-neon-purple transition-colors">
                        {game.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{game.name}</h4>
                        <p className="text-sm text-neon-purple font-mono uppercase tracking-widest">{game.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">ELO</p>
                      <p className="font-mono text-white">{game.elo}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2rem] border-white/5 bg-gradient-to-br from-neon-green/5 to-transparent">
              <h4 className="font-bold mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Trophy className="w-5 h-5 text-neon-green" />
                Достижения
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group cursor-help relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-sm group-hover:blur-md transition-all"></div>
                    <Trophy className="w-6 h-6 text-yellow-500 absolute" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-[2rem] border-white/5">
              <h4 className="font-bold mb-4 uppercase tracking-wider">Контакты</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">vlad@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">vlad_discord</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
