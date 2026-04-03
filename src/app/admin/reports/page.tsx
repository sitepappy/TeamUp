"use client";

import { useApp, Report } from "@/lib/store";
import { Flag, Search, Filter, MessageCircle, CheckCircle2, Clock, ShieldAlert, Send, User, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminReports() {
  const { reports, updateReportStatus, addReportComment } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<Report['status'] | 'all'>('all');
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const filteredReports = reports.filter(r => selectedStatus === 'all' || r.status === selectedStatus);
  const activeReport = reports.find(r => r.id === activeReportId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-neon-purple">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Центр обработки тикетов</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Репорты</h1>
        </div>
        <div className="flex gap-4">
          {['all', 'open', 'in-progress', 'closed'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as any)}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                selectedStatus === status ? "bg-neon-purple text-white shadow-[0_0_15px_#9D00FF]" : "glass text-gray-500 hover:text-white"
              }`}
            >
              {status === 'all' ? 'Все' : status === 'open' ? 'Открыто' : status === 'in-progress' ? 'В работе' : 'Закрыто'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-8 items-start">
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="glass p-12 rounded-[2.5rem] text-center space-y-4 border-dashed border-2 border-white/10">
              <Flag className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-500 font-bold uppercase tracking-widest">Тикетов не найдено</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <motion.button
                key={report.id}
                onClick={() => setActiveReportId(report.id)}
                className={`w-full glass p-8 rounded-[2rem] text-left border-white/5 transition-all group relative overflow-hidden ${
                  activeReportId === report.id ? "border-neon-purple/50 bg-neon-purple/5" : "hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      report.type === 'bug' ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                    }`}>
                      {report.type === 'bug' ? 'BUG' : 'COMPLAINT'}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono">ID: {report.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'open' && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      report.status === 'open' ? "text-red-500" : report.status === 'in-progress' ? "text-yellow-500" : "text-green-500"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2 group-hover:text-neon-purple transition-colors">{report.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1 mb-4 italic">"{report.description}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
                    <User className="w-4 h-4" />
                    {report.userName}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>

        {/* Report Details Sidebar */}
        <AnimatePresence mode="wait">
          {activeReport ? (
            <motion.div
              key={activeReport.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass p-10 rounded-[2.5rem] border-white/10 sticky top-12"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">{activeReport.title}</h2>
                    <button onClick={() => setActiveReportId(null)} className="text-gray-500 hover:text-white transition-all text-xs font-bold uppercase">Закрыть</button>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 italic text-gray-400 text-sm leading-relaxed">
                    "{activeReport.description}"
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest">Статус тикета</h4>
                  <div className="flex gap-2">
                    {['open', 'in-progress', 'closed'].map(s => (
                      <button
                        key={s}
                        onClick={() => updateReportStatus(activeReport.id, s as any)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          activeReport.status === s ? "bg-white/10 text-white border border-white/20" : "glass text-gray-500 border border-transparent"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest">Комментарии администратора</h4>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {activeReport.comments.length === 0 ? (
                      <p className="text-xs text-gray-600 italic">Комментариев пока нет...</p>
                    ) : (
                      activeReport.comments.map((comment, i) => (
                        <div key={i} className="bg-neon-purple/5 p-4 rounded-xl border border-neon-purple/10">
                          <p className="text-sm text-gray-300">{comment.text}</p>
                          <p className="text-[10px] text-neon-purple/50 font-mono mt-2 uppercase tracking-widest">Admin • {new Date(comment.createdAt).toLocaleTimeString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="relative">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Добавить комментарий..."
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-neon-purple/30 text-sm h-24 resize-none"
                    />
                    <button
                      onClick={() => {
                        if (commentText.trim()) {
                          addReportComment(activeReport.id, commentText);
                          setCommentText("");
                        }
                      }}
                      className="absolute bottom-4 right-4 p-2 bg-neon-purple text-white rounded-lg hover:shadow-[0_0_10px_#9D00FF] transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Связаться с пользователем
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center text-center p-12 glass rounded-[2.5rem] border-white/5 border-dashed border-2">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-6">
                <Flag className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">Выберите тикет</h3>
              <p className="text-sm text-gray-500">Нажмите на любое обращение слева, чтобы увидеть подробности и начать работу.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
