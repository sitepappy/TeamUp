"use client";

import { useApp, User } from "@/lib/store";
import { Search, Shield, Ban, Trash2, CheckCircle, UserPlus, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminUsers() {
  const { users, banUser, unbanUser, deleteUser, changeRole } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState<{ type: 'ban' | 'unban' | 'delete' | 'role', userId: string, login: string } | null>(null);

  const filteredUsers = users.filter(u => 
    u.login.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-neon-purple">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Управление аккаунтами</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Пользователи</h1>
        </div>
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-purple transition-colors" />
          <input 
            type="text" 
            placeholder="Поиск по логину или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-neon-purple/30 transition-all text-sm glass"
          />
        </div>
      </div>

      <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-500">
              <th className="p-6">Пользователь</th>
              <th className="p-6">Email</th>
              <th className="p-6">Роль</th>
              <th className="p-6">Статус</th>
              <th className="p-6">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-all group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-gray-500 group-hover:text-white group-hover:border-neon-purple/50 transition-all">
                      {user.login[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-tighter">{user.login}</p>
                      <p className="text-[10px] text-gray-500 font-mono">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-sm font-mono text-gray-400">{user.email}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    user.role === 'admin' ? "bg-neon-purple/10 text-neon-purple" : "bg-white/5 text-gray-400"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    user.status === 'online' ? "bg-green-500/10 text-green-500" : 
                    user.status === 'banned' ? "bg-red-500/10 text-red-500" : "bg-white/5 text-gray-400"
                  }`}>
                    {user.status === 'banned' ? 'BANNED' : user.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    {user.login !== 'teamupdev' && (
                      <>
                        <button 
                          onClick={() => setShowConfirm({ type: 'role', userId: user.id, login: user.login })}
                          className="p-2 rounded-lg hover:bg-neon-purple/10 text-gray-500 hover:text-neon-purple transition-all"
                          title={user.role === 'admin' ? "Снять права админа" : "Сделать админом"}
                        >
                          <ShieldCheck className="w-5 h-5" />
                        </button>
                        {user.status === 'banned' ? (
                          <button 
                            onClick={() => setShowConfirm({ type: 'unban', userId: user.id, login: user.login })}
                            className="p-2 rounded-lg hover:bg-green-500/10 text-gray-500 hover:text-green-500 transition-all"
                            title="Разблокировать"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => setShowConfirm({ type: 'ban', userId: user.id, login: user.login })}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all"
                            title="Заблокировать"
                          >
                            <Ban className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => setShowConfirm({ type: 'delete', userId: user.id, login: user.login })}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all"
                          title="Удалить аккаунт"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfirm(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass max-w-md w-full p-8 rounded-[2rem] border-white/10 relative z-10 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                showConfirm.type === 'delete' || showConfirm.type === 'ban' ? "bg-red-500/10" : "bg-neon-purple/10"
              }`}>
                {showConfirm.type === 'delete' ? <Trash2 className="w-10 h-10 text-red-500" /> : 
                 showConfirm.type === 'ban' ? <Ban className="w-10 h-10 text-red-500" /> : 
                 <ShieldCheck className="w-10 h-10 text-neon-purple" />}
              </div>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-tighter italic">Вы уверены?</h2>
              <p className="text-gray-400 mb-8">
                {showConfirm.type === 'delete' ? `Вы собираетесь навсегда удалить аккаунт ${showConfirm.login}.` : 
                 showConfirm.type === 'ban' ? `Вы собираетесь заблокировать пользователя ${showConfirm.login}.` : 
                 showConfirm.type === 'unban' ? `Разблокировать пользователя ${showConfirm.login}?` : 
                 `Вы хотите изменить роль пользователя ${showConfirm.login}?`}
              </p>
              <div className="flex gap-4">
                <button onClick={() => setShowConfirm(null)} className="flex-1 py-4 glass border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">Отмена</button>
                <button onClick={() => {
                  if (showConfirm.type === 'delete') deleteUser(showConfirm.userId);
                  if (showConfirm.type === 'ban') banUser(showConfirm.userId);
                  if (showConfirm.type === 'unban') unbanUser(showConfirm.userId);
                  if (showConfirm.type === 'role') {
                    const user = users.find(u => u.id === showConfirm.userId);
                    changeRole(showConfirm.userId, user?.role === 'admin' ? 'user' : 'admin');
                  }
                  setShowConfirm(null);
                }} className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                  showConfirm.type === 'delete' || showConfirm.type === 'ban' ? "bg-red-500 text-white" : "bg-neon-purple text-white"
                }`}>Подтвердить</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
