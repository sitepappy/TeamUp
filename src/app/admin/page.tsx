"use client";

import { useApp } from "@/lib/store";
import { Users, FileText, Flag, BarChart3, TrendingUp, ShieldAlert, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { users, posts, reports } = useApp();

  const stats = [
    { name: "Всего пользователей", value: users.length, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Активных заявок", value: posts.length, icon: FileText, color: "text-neon-green", bg: "bg-neon-green/10" },
    { name: "Открытых тикетов", value: reports.filter(r => r.status === 'open').length, icon: Flag, color: "text-neon-purple", bg: "bg-neon-purple/10" },
    { name: "В работе", value: reports.filter(r => r.status === 'in-progress').length, icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-neon-purple">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Система управления</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Дашборд</h1>
        </div>
        <div className="flex items-center gap-4 text-gray-400 text-sm font-bold uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/5">
          <TrendingUp className="w-5 h-5 text-neon-green" />
          <span>Статистика обновляется в реальном времени</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[2rem] border-white/5 relative group hover:border-white/20 transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{stat.name}</p>
            <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="glass p-10 rounded-[2.5rem] border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Последние пользователи</h3>
            <button className="text-sm text-neon-purple font-bold hover:text-white transition-all uppercase tracking-widest">Все пользователи</button>
          </div>
          <div className="space-y-4">
            {users.slice(-5).reverse().map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-gray-500 group-hover:text-white group-hover:border-neon-purple/50 transition-all">
                    {user.login[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-tighter">{user.login}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{user.email}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  user.role === 'admin' ? "bg-neon-purple/10 text-neon-purple" : "bg-white/5 text-gray-400"
                }`}>
                  {user.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-br from-neon-purple/5 to-transparent">
          <h3 className="text-2xl font-bold uppercase italic tracking-tighter mb-8">Активность</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1 h-full bg-neon-purple rounded-full"></div>
              <div className="space-y-1">
                <p className="text-sm font-bold">Новая заявка в DOTA 2</p>
                <p className="text-xs text-gray-500">Пользователь <span className="text-white">CyberPanda</span> опубликовал новую заявку</p>
                <p className="text-[10px] text-gray-600 uppercase font-mono mt-1">2 минуты назад</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-full bg-neon-green rounded-full"></div>
              <div className="space-y-1">
                <p className="text-sm font-bold">Репорт решен</p>
                <p className="text-xs text-gray-500">Администратор <span className="text-white">teamupdev</span> закрыл тикет #451</p>
                <p className="text-[10px] text-gray-600 uppercase font-mono mt-1">15 минут назад</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
