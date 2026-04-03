"use client";

import { useApp, LFGPost } from "@/lib/store";
import { Search, Filter, Trash2, Edit2, ShieldAlert, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPosts() {
  const { posts, deletePost, updatePost } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("all");
  const [editingPost, setEditingPost] = useState<LFGPost | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredPosts = posts.filter(p => 
    (selectedGame === "all" || p.gameId === selectedGame) &&
    (p.userName.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const games = ["all", "dota-2", "cs2", "valorant", "deadlock", "league-of-legends", "roblox"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-neon-purple">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Модерация контента</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Заявки (LFG)</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-purple transition-colors" />
            <input 
              type="text" 
              placeholder="Поиск по нику или описанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-neon-purple/30 transition-all text-sm glass"
            />
          </div>
          <select 
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-neon-purple/30 text-sm glass uppercase font-bold tracking-widest appearance-none text-white cursor-pointer"
          >
            {games.map(g => <option key={g} value={g} className="bg-[#050505]">{g.toUpperCase().replace(/-/g, ' ')}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-8 rounded-[2rem] border-white/5 hover:border-neon-purple/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-16 h-16" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-gray-500 group-hover:text-white transition-all">
                  {post.userName[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tighter">{post.userName}</h3>
                  <p className="text-xs text-neon-purple font-bold uppercase tracking-widest">{post.gameId.replace(/-/g, ' ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button onClick={() => setEditingPost(post)} className="p-3 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all"><Edit2 className="w-5 h-5" /></button>
                <button onClick={() => setShowDeleteConfirm(post.id)} className="p-3 rounded-xl hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-8 leading-relaxed line-clamp-3 italic">"{post.description}"</p>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Роль</p>
                <p className="text-sm font-bold text-white uppercase">{post.role}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Ранг</p>
                <p className="text-sm font-bold text-white uppercase">{post.rank}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">MMR</p>
                <p className="text-sm font-bold text-white font-mono">{post.elo}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Язык</p>
                <p className="text-sm font-bold text-white uppercase">{post.lang}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingPost(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass max-w-lg w-full p-8 rounded-[2rem] border-white/10 relative z-10">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter italic">Редактировать заявку</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updatePost(editingPost.id, {
                  role: formData.get('role') as string,
                  rank: formData.get('rank') as string,
                  elo: Number(formData.get('elo')),
                  lang: formData.get('lang') as string,
                  description: formData.get('description') as string,
                });
                setEditingPost(null);
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-xs text-gray-500 uppercase font-bold ml-1">Роль</label><input name="role" defaultValue={editingPost.role} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-purple/30" /></div>
                  <div className="space-y-1"><label className="text-xs text-gray-500 uppercase font-bold ml-1">Ранг</label><input name="rank" defaultValue={editingPost.rank} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-purple/30" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-xs text-gray-500 uppercase font-bold ml-1">ELO / MMR</label><input name="elo" type="number" defaultValue={editingPost.elo} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-purple/30" /></div>
                  <div className="space-y-1"><label className="text-xs text-gray-500 uppercase font-bold ml-1">Язык</label><input name="lang" defaultValue={editingPost.lang} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-purple/30" /></div>
                </div>
                <div className="space-y-1"><label className="text-xs text-gray-500 uppercase font-bold ml-1">Описание</label><textarea name="description" defaultValue={editingPost.description} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-purple/30 h-32 resize-none" /></div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setEditingPost(null)} className="flex-1 py-4 glass border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">Отмена</button>
                  <button type="submit" className="flex-1 py-4 bg-neon-purple text-white rounded-xl font-bold hover:shadow-[0_0_15px_#9D00FF] transition-all uppercase">Сохранить изменения</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDeleteConfirm(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass max-w-md w-full p-8 rounded-[2rem] border-white/10 relative z-10 text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle className="w-10 h-10 text-red-500" /></div>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-tighter italic">Удалить заявку?</h2>
              <p className="text-gray-400 mb-8">Вы уверены, что хотите удалить эту заявку? Это действие необратимо.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-4 glass border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">Отмена</button>
                <button onClick={() => { deletePost(showDeleteConfirm); setShowDeleteConfirm(null); }} className="flex-1 py-4 bg-red-500 text-white rounded-xl font-bold hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all uppercase tracking-widest">Удалить</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
