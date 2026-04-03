"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { Users, MessageSquare, Filter, Search, Trophy, Send, Plus, Trash2, Edit2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useApp, LFGPost } from "@/lib/store";

export default function GamePage() {
  const { posts, currentUser, createPost, deletePost, updatePost } = useApp();
  const params = useParams();
  const gameId = params.gameId as string;
  const gameName = gameId.toUpperCase().replace(/-/g, ' ');
  
  const [activeTab, setActiveTab] = useState<"players" | "chat">("players");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<LFGPost | null>(null);

  // Filter posts for the current game
  const gamePosts = posts.filter(p => p.gameId === gameId);

  return (
    <main className="min-h-screen pt-24 px-4 pb-8">
      {/* Dynamic Background Theme */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] opacity-10 rounded-full ${
          gameId.includes('dota') ? 'bg-red-600' : 
          gameId.includes('valorant') ? 'bg-pink-500' : 
          gameId.includes('cs2') ? 'bg-orange-500' : 'bg-neon-purple'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Game Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-neon-green"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Турниры доступны</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black italic tracking-tighter"
            >
              {gameName}
            </motion.h1>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl glass border-white/5">
            <button 
              onClick={() => setActiveTab("players")}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === "players" ? "bg-neon-green text-black shadow-[0_0_15px_#00FF9C]" : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-5 h-5" />
              Игроки
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === "chat" ? "bg-neon-purple text-white shadow-[0_0_15px_#9D00FF]" : "text-gray-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Общий чат
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {activeTab === "players" ? (
              <>
                {/* Search & Filters */}
                <div className="grid sm:grid-cols-[1fr_auto] gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Поиск по нику или роли..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-neon-green/30 transition-all glass"
                    />
                  </div>
                  <button className="px-6 py-4 glass border-white/10 rounded-2xl flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                    <Filter className="w-5 h-5" />
                    Фильтры
                  </button>
                </div>

                {/* Players Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {gamePosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass p-6 rounded-3xl border-white/5 hover:border-neon-green/20 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-12 h-12" />
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                              {post.userName[0]}
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050505] bg-green-500"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg group-hover:text-neon-green transition-colors">{post.userName}</h3>
                            {currentUser && (currentUser.id === post.userId || currentUser.role === 'admin') && (
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => setEditingPost(post)}
                                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => setShowDeleteConfirm(post.id)}
                                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-500 transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm flex items-center gap-2">
                            <span className="text-neon-purple font-bold">{post.rank}</span>
                            <span>•</span>
                            <span>{post.role}</span>
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">MMR / ELO</p>
                          <p className="text-white font-mono">{post.elo}</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Язык</p>
                          <p className="text-white font-mono">{post.lang}</p>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-white/5 hover:bg-neon-green hover:text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        Написать
                        <Send className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Create Post Card */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowCreateModal(true)}
                    className="glass p-6 rounded-3xl border-dashed border-2 border-white/10 hover:border-neon-green/30 transition-all flex flex-col items-center justify-center gap-4 group min-h-[250px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-all">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Создать заявку</p>
                      <p className="text-gray-500 text-sm">Найди команду сам</p>
                    </div>
                  </motion.button>
                </div>
              </>
            ) : (
              /* Chat Interface */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-3xl border-white/5 h-[600px] flex flex-col overflow-hidden"
              >
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="font-bold">Чат: {gameName}</span>
                  </div>
                  <span className="text-xs text-gray-500">1,243 игрока онлайн</span>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center text-neon-purple font-bold">G</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-neon-purple">GosuGamer</span>
                        <span className="text-[10px] text-gray-600">14:20</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 max-w-md relative group">
                        <p className="text-sm">Ищу +2 в пати, саппорты от 5к ммр</p>
                        {currentUser?.role === 'admin' && (
                          <button className="absolute -right-10 top-0 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 rounded-xl bg-neon-green/20 border border-neon-green/30 flex items-center justify-center text-neon-green font-bold">Я</div>
                    <div className="space-y-1 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] text-gray-600">14:21</span>
                        <span className="font-bold text-sm text-neon-green">Вы</span>
                      </div>
                      <div className="bg-neon-green text-black p-3 rounded-2xl rounded-tr-none max-w-md">
                        <p className="text-sm font-medium">Го, я сап</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border-t border-white/5">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Написать сообщение..."
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-12 outline-none focus:border-neon-purple/50 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neon-purple hover:text-white transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl border-white/5">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Лидеры недели
              </h4>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 font-mono text-sm">#{i}</div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10"></div>
                      <span className="text-sm font-medium">ProPlayer_{i}</span>
                    </div>
                    <span className="text-xs text-neon-green font-bold">+420</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-3xl border-white/5 bg-gradient-to-br from-neon-purple/5 to-transparent">
              <h4 className="font-bold mb-2">Статистика {gameName}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Всего игроков</span>
                  <span className="font-mono">45,201</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Активных заявок</span>
                  <span className="font-mono">1,204</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {(showCreateModal || editingPost) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setShowCreateModal(false); setEditingPost(null); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-lg w-full p-8 rounded-[2rem] border-white/10 relative z-10"
            >
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter italic">
                {editingPost ? 'Редактировать заявку' : 'Создать заявку'}
              </h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  gameId,
                  role: formData.get('role') as string,
                  rank: formData.get('rank') as string,
                  elo: Number(formData.get('elo')),
                  lang: formData.get('lang') as string,
                  description: formData.get('description') as string,
                };
                if (editingPost) {
                  updatePost(editingPost.id, data);
                } else {
                  createPost(data);
                }
                setShowCreateModal(false);
                setEditingPost(null);
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-bold ml-1">Роль</label>
                    <input name="role" defaultValue={editingPost?.role || ''} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green/30" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-bold ml-1">Ранг</label>
                    <input name="rank" defaultValue={editingPost?.rank || ''} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green/30" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-bold ml-1">ELO / MMR</label>
                    <input name="elo" type="number" defaultValue={editingPost?.elo || 0} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green/30" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-bold ml-1">Язык</label>
                    <input name="lang" defaultValue={editingPost?.lang || 'RU'} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green/30" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 uppercase font-bold ml-1">Описание</label>
                  <textarea name="description" defaultValue={editingPost?.description || ''} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green/30 h-24 resize-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => { setShowCreateModal(false); setEditingPost(null); }} className="flex-1 py-4 glass border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">Отмена</button>
                  <button type="submit" className="flex-1 py-4 bg-neon-green text-black rounded-xl font-bold hover:shadow-[0_0_15px_#00FF9C] transition-all">
                    {editingPost ? 'Сохранить' : 'Опубликовать'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-md w-full p-8 rounded-[2rem] border-white/10 relative z-10 text-center"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-tighter italic">Удалить заявку?</h2>
              <p className="text-gray-400 mb-8">Это действие нельзя отменить. Вы уверены, что хотите удалить эту запись?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-4 glass border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">Отмена</button>
                <button onClick={() => { deletePost(showDeleteConfirm); setShowDeleteConfirm(null); }} className="flex-1 py-4 bg-red-500 text-white rounded-xl font-bold hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all">Удалить</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
