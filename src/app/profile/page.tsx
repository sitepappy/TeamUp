"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Gamepad2, Settings, MessageCircle, MoreHorizontal, Trophy, Mail, Edit2, X, Save, Check } from "lucide-react";
import { useApp } from "@/lib/store";
import { useState } from "react";

export default function ProfilePage() {
  const { currentUser, updateUser, posts } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: currentUser?.bio || '',
    discord: currentUser?.discord || '',
    rank: currentUser?.rank || '',
    elo: currentUser?.elo || 0
  });

  if (!currentUser) {
    return (
      <main className="min-h-screen pt-28 flex items-center justify-center">
        <div className="glass p-8 rounded-3xl text-center">
          <h2 className="text-xl font-bold mb-4">Нужна авторизация</h2>
          <p className="text-gray-400">Войдите, чтобы просмотреть профиль</p>
        </div>
      </main>
    );
  }

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const userPosts = posts.filter(p => p.userId === currentUser.id);

  return (
    <main className="min-h-screen pt-28 pb-12 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-neon-purple opacity-10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-green opacity-10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Banner & Avatar Section */}
        <div className="relative">
          <div className="h-56 md:h-72 w-full rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-[#1a1a1a] border border-white/5 overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
          </div>
          
          <div className="absolute -bottom-12 left-8 md:left-12 flex flex-col md:flex-row md:items-end gap-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-gradient-to-br from-neon-green to-neon-purple p-0.5 shadow-2xl">
                <div className="w-full h-full bg-[#050505] rounded-[1.9rem] flex items-center justify-center border border-white/10 overflow-hidden relative">
                  <User className="w-12 h-12 text-white/10" />
                  <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-4 border-[#050505] ${
                    currentUser.status === 'online' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-500'
                  }`}></div>
                </div>
              </div>
            </motion.div>
            
            <div className="pb-2 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white">{currentUser.login}</h1>
                {currentUser.role === 'admin' && <Shield className="w-5 h-5 text-neon-green" />}
              </div>
              <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <span>{currentUser.role}</span>
                <span className="text-white/10">•</span>
                <span className={currentUser.status === 'online' ? 'text-neon-green' : 'text-gray-500'}>{currentUser.status}</span>
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 md:right-12 hidden md:flex items-center gap-2">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 glass border-white/5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:border-white/20 transition-all flex items-center gap-2"
              >
                <Settings className="w-3.5 h-3.5" />
                Настройки
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 bg-red-500/10 text-red-500 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  Отмена
                </button>
                <button 
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-neon-green text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_15px_#00FF9C] transition-all flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  Сохранить
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 pt-12 md:pt-10">
          {/* Left Column */}
          <div className="space-y-8">
            <section className="glass p-8 rounded-[2.5rem] border-white/5 space-y-5">
              <h3 className="text-xs font-black flex items-center justify-between uppercase tracking-[0.2em] text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neon-green" />
                  О себе
                </div>
                {isEditing && <span className="text-[9px] text-neon-green">Редактирование</span>}
              </h3>
              
              {isEditing ? (
                <textarea 
                  value={editData.bio}
                  onChange={e => setEditData({...editData, bio: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-gray-300 outline-none focus:border-neon-green/30 h-32 resize-none"
                  placeholder="Расскажите о себе..."
                />
              ) : (
                <p className="text-gray-400 leading-relaxed text-sm">
                  {currentUser.bio || "Пользователь пока ничего не рассказал о себе."}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {["Competitive", "Team Player"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500 border border-white/5 uppercase tracking-wider">#{tag}</span>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h3 className="text-xs font-black flex items-center gap-2 uppercase tracking-[0.2em] text-gray-500 px-4">
                <Gamepad2 className="w-4 h-4 text-neon-purple" />
                Мои игры
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* For now showing current rank/elo as main game */}
                <div className="glass p-5 rounded-3xl border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-lg text-white/20 group-hover:text-neon-purple transition-colors">
                      D
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-tighter">DOTA 2</h4>
                      {isEditing ? (
                        <input 
                          value={editData.rank}
                          onChange={e => setEditData({...editData, rank: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-neon-purple font-black uppercase outline-none focus:border-neon-purple/50 w-24"
                        />
                      ) : (
                        <p className="text-[10px] text-neon-purple font-black uppercase tracking-widest">{currentUser.rank || 'No Rank'}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-gray-600 font-black uppercase">ELO</p>
                    {isEditing ? (
                      <input 
                        type="number"
                        value={editData.elo}
                        onChange={e => setEditData({...editData, elo: Number(e.target.value)})}
                        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono outline-none focus:border-neon-green/50 w-20"
                      />
                    ) : (
                      <p className="font-mono text-xs text-white">{currentUser.elo || 0}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {userPosts.length > 0 && (
              <section className="space-y-5">
                <h3 className="text-xs font-black flex items-center gap-2 uppercase tracking-[0.2em] text-gray-500 px-4">
                  <MessageCircle className="w-4 h-4 text-neon-green" />
                  Мои активные заявки
                </h3>
                <div className="grid gap-4">
                  {userPosts.map(post => (
                    <div key={post.id} className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-neon-green">{post.gameId}</span>
                        <p className="text-sm font-bold text-gray-300">{post.description}</p>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border-white/5">
              <h4 className="text-[10px] font-black mb-6 flex items-center gap-2 uppercase tracking-[0.2em] text-gray-500">
                <Trophy className="w-4 h-4 text-neon-green" />
                Достижения
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group cursor-help relative hover:bg-white/10 transition-all">
                    <Trophy className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-neon-green/5 to-transparent">
              <h4 className="text-[10px] font-black mb-4 uppercase tracking-[0.2em] text-gray-500">Контакты</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                  <Mail className="w-4 h-4 group-hover:text-neon-green transition-colors" />
                  <span className="text-xs font-bold truncate">{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                  <MessageCircle className="w-4 h-4 group-hover:text-neon-purple transition-colors" />
                  {isEditing ? (
                    <input 
                      value={editData.discord}
                      onChange={e => setEditData({...editData, discord: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-neon-purple/50 w-full"
                      placeholder="Discord tag"
                    />
                  ) : (
                    <span className="text-xs font-bold truncate">{currentUser.discord || 'Не указан'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
