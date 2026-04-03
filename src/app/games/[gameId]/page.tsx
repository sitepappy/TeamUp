"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Users, MessageSquare, Filter, Search, Trophy, Send, Plus, Trash2, Edit2, AlertCircle, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useApp, LFGPost } from "@/lib/store";

export default function GamePage() {
  const { posts, currentUser, createPost, deletePost, updatePost, sendMessage } = useApp();
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;
  const gameName = gameId.toUpperCase().replace(/-/g, ' ');
  
  const [activeTab, setActiveTab] = useState<"players" | "chat">("players");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<LFGPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  
  // Local chat state (mock for real-time feel)
  const [localChat, setLocalChat] = useState<{id: string, user: string, text: string, time: string, isMe: boolean}[]>([
    { id: '1', user: 'GosuGamer', text: 'Ищу +2 в пати, саппорты от 5к ммр', time: '14:20', isMe: false },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localChat, activeTab]);

  const handleSendChat = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatMessage.trim() || !currentUser) return;
    
    const newMsg = {
      id: Math.random().toString(36).substr(2, 9),
      user: currentUser.login,
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setLocalChat(prev => [...prev, newMsg]);
    setChatMessage("");
  };

  const handleContact = (userId: string) => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    router.push(`/messages?userId=${userId}`);
  };

  // Filter posts for the current game and search term
  const gamePosts = posts.filter(p => 
    p.gameId === gameId && 
    (p.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen pt-28 px-4 pb-12 relative overflow-hidden">
      {/* Background Orbs - Better depth */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden opacity-30">
        <div className={`absolute -top-[10%] -right-[10%] w-[80vw] h-[80vh] blur-[150px] opacity-20 rounded-full ${
          gameId.includes('dota') ? 'bg-red-600' : 
          gameId.includes('valorant') ? 'bg-pink-500' : 
          gameId.includes('cs2') ? 'bg-orange-500' : 'bg-neon-purple'
        }`}></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vh] blur-[150px] opacity-10 bg-neon-green rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Game Title & Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none"
            >
              {gameName}
            </motion.h1>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-xl">
            <button 
              onClick={() => setActiveTab("players")}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "players" ? "bg-neon-green text-black shadow-[0_0_20px_rgba(0,255,156,0.3)]" : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              Игроки
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "chat" ? "bg-neon-purple text-white shadow-[0_0_20px_rgba(157,0,255,0.3)]" : "text-gray-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Чат
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main List */}
          <div className="space-y-6">
            {activeTab === "players" ? (
              <>
                {/* Search - Modern & Compact */}
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-green transition-colors" />
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Поиск по нику, роли или описанию..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-neon-green/30 transition-all text-sm font-medium"
                    />
                  </div>
                  <button className="px-5 py-3.5 glass border-white/10 rounded-2xl flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-all hover:bg-white/5">
                    <Filter className="w-4 h-4" />
                    Фильтры
                  </button>
                </div>

                {/* Grid - More "Airy" cards */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {gamePosts.length === 0 ? (
                    <div className="col-span-full glass p-12 rounded-[2.5rem] text-center space-y-4 border-dashed border-2 border-white/10 opacity-50">
                      <Users className="w-12 h-12 text-gray-600 mx-auto" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest">Заявок пока нет. Будь первым!</p>
                    </div>
                  ) : (
                    gamePosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass p-5 rounded-3xl border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                      >
                        <div className="flex items-center gap-4 mb-5">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent p-px">
                              <div className="w-full h-full bg-[#050505] rounded-[15px] flex items-center justify-center text-xl font-bold text-gray-400">
                                {post.userName[0].toUpperCase()}
                              </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-[#050505] bg-green-500"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-base truncate pr-2 group-hover:text-neon-green transition-colors">{post.userName}</h3>
                              {currentUser && (currentUser.id === post.userId || currentUser.role === 'admin') && (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button onClick={() => setEditingPost(post)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => setShowDeleteConfirm(post.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                              <span className="text-neon-purple">{post.rank}</span>
                              <span>•</span>
                              <span className="text-white/60">{post.role}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 mb-6 line-clamp-2 leading-relaxed h-8 italic">"{post.description}"</p>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[9px] uppercase text-gray-500 font-bold mb-1">MMR</p>
                            <p className="text-sm font-mono text-white">{post.elo}</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[9px] uppercase text-gray-500 font-bold mb-1">Язык</p>
                            <p className="text-sm font-bold text-white uppercase">{post.lang}</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleContact(post.userId)}
                          className="w-full py-3.5 bg-white text-black font-black text-[10px] uppercase tracking-[0.1em] rounded-xl hover:bg-neon-green transition-all flex items-center justify-center gap-2 shadow-2xl"
                        >
                          Написать
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))
                  )}
                  
                  {/* Create Card - Less bulky */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowCreateModal(true)}
                    className="glass p-5 rounded-3xl border-dashed border-2 border-white/5 hover:border-neon-green/30 transition-all flex flex-col items-center justify-center gap-4 group min-h-[200px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-all">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-sm">Создать заявку</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Найди команду сам</p>
                    </div>
                  </motion.button>
                </div>
              </>
            ) : (
              /* Chat Interface - Better spacing */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-[2.5rem] border-white/5 h-[650px] flex flex-col overflow-hidden shadow-2xl"
              >
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-3xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                    <span className="font-bold text-xs uppercase tracking-widest">Общий чат: {gameName}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">1,243 online</span>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar scroll-smooth">
                  {localChat.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 ${
                        msg.isMe ? 'bg-neon-green/10 border-neon-green/20 text-neon-green' : 'bg-neon-purple/10 border-neon-purple/20 text-neon-purple'
                      }`}>
                        {msg.user[0].toUpperCase()}
                      </div>
                      <div className={`space-y-1.5 ${msg.isMe ? 'text-right' : ''}`}>
                        <div className={`flex items-center gap-2 ${msg.isMe ? 'justify-end' : ''}`}>
                          {!msg.isMe && <span className="font-bold text-[11px] text-neon-purple uppercase">{msg.user}</span>}
                          <span className="text-[10px] text-gray-600 font-mono">{msg.time}</span>
                          {msg.isMe && <span className="font-bold text-[11px] text-neon-green uppercase">Вы</span>}
                        </div>
                        <div className={`p-3.5 rounded-2xl border max-w-sm ${
                          msg.isMe 
                            ? 'bg-neon-green text-black border-transparent rounded-tr-none' 
                            : 'bg-white/5 border-white/5 rounded-tl-none'
                        }`}>
                          <p className={`text-sm ${msg.isMe ? 'font-medium' : 'text-gray-200'}`}>{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-white/5 border-t border-white/5">
                  <form onSubmit={handleSendChat} className="relative">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder={currentUser ? "Написать сообщение..." : "Войдите, чтобы писать в чат"}
                      disabled={!currentUser}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-3.5 pl-5 pr-12 outline-none focus:border-neon-purple/30 transition-all text-sm"
                    />
                    <button 
                      type="submit"
                      disabled={!chatMessage.trim() || !currentUser}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-neon-purple hover:text-white transition-colors disabled:opacity-30"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - More minimal */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-[2rem] border-white/5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                Топ игроков
              </h4>
              <div className="space-y-5">
                {posts.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between group cursor-pointer" onClick={() => router.push(`/profile?id=${p.userId}`)}>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-gray-600">0{i+1}</span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-green/30 transition-all flex items-center justify-center text-[10px] font-bold">
                        {p.userName[0].toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors truncate max-w-[80px]">{p.userName}</span>
                    </div>
                    <span className="text-[10px] text-neon-green font-mono font-bold">{p.elo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-[2rem] border-white/5 bg-gradient-to-br from-neon-purple/5 to-transparent">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Статистика {gameName}</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Активных</span>
                  <span className="font-mono text-xs text-white">{gamePosts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">В поиске</span>
                  <span className="font-mono text-xs text-white">{gamePosts.length * 2}</span>
                </div>
                <div className="h-px bg-white/5 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Пинг</span>
                  <span className="font-mono text-xs text-neon-green">24ms</span>
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
                  <button type="button" onClick={() => { setShowCreateModal(false); setEditingPost(null); }} className="flex-1 py-4 glass border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest">Отмена</button>
                  <button type="submit" className="flex-1 py-4 bg-neon-green text-black rounded-xl font-black hover:shadow-[0_0_15px_#00FF9C] transition-all text-xs uppercase tracking-widest">
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
