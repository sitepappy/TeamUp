"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Search, Send, Plus, MoreVertical, Phone, Video, Smile, Paperclip, ChevronLeft, Check, CheckCheck, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useApp, User as IUser } from "@/lib/store";

export default function MessagesPage() {
  const { messages, currentUser, users, sendMessage } = useApp();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter users who have messages with current user or just all users for now
  const chatPartners = users.filter(u => u.id !== currentUser?.id);
  const activeChatPartner = users.find(u => u.id === activeChatId);

  const activeMessages = messages.filter(m => 
    (m.fromId === currentUser?.id && m.toId === activeChatId) ||
    (m.fromId === activeChatId && m.toId === currentUser?.id)
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || !activeChatId) return;
    sendMessage(activeChatId, message);
    setMessage("");
  };

  if (!currentUser) {
    return (
      <main className="min-h-screen pt-28 flex items-center justify-center">
        <div className="glass p-8 rounded-3xl text-center">
          <h2 className="text-xl font-bold mb-4">Нужна авторизация</h2>
          <p className="text-gray-400">Войдите, чтобы просматривать сообщения</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 px-4 pb-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-purple opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-green opacity-10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl w-full h-[750px] glass rounded-[3rem] border-white/5 shadow-2xl overflow-hidden grid md:grid-cols-[320px_1fr] relative">
        {/* Sidebar */}
        <div className="border-r border-white/5 flex flex-col h-full bg-white/2 backdrop-blur-3xl">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black italic tracking-tighter uppercase text-white">Сообщения</h1>
              <button className="p-2 rounded-xl bg-neon-purple/10 text-neon-purple hover:bg-neon-purple hover:text-white transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-focus-within:text-neon-green transition-colors" />
              <input 
                type="text" 
                placeholder="Поиск чатов..."
                className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-neon-green/30 transition-all text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-6 no-scrollbar">
            {chatPartners.map((user) => {
              const lastMsg = messages.filter(m => 
                (m.fromId === currentUser.id && m.toId === user.id) ||
                (m.fromId === user.id && m.toId === currentUser.id)
              ).slice(-1)[0];

              return (
                <button
                  key={user.id}
                  onClick={() => setActiveChatId(user.id)}
                  className={`w-full p-3.5 rounded-2xl flex items-center gap-4 transition-all relative group border ${
                    activeChatId === user.id ? "bg-white/5 border-white/10" : "hover:bg-white/2 border-transparent"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border border-white/5 ${
                      user.status === 'online' ? "bg-neon-green/10 text-neon-green" : "bg-white/5 text-gray-600"
                    }`}>
                      {user.login[0].toUpperCase()}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-4 border-[#050505] ${
                      user.status === 'online' ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : 
                      user.status === 'away' ? "bg-yellow-500" : "bg-gray-600"
                    }`}></div>
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold truncate text-xs uppercase tracking-tight text-gray-200">{user.login}</span>
                      {lastMsg && (
                        <span className="text-[9px] text-gray-600 font-mono font-bold">
                          {new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 truncate font-medium">
                      {lastMsg ? lastMsg.text : "Начните общение"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col h-full bg-[#080808]/30 relative">
          {activeChatId && activeChatPartner ? (
            <>
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/2 backdrop-blur-3xl">
                <div className="flex items-center gap-4">
                  <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-neon-purple/10 text-neon-purple border border-neon-purple/20 flex items-center justify-center font-black text-xs">
                      {activeChatPartner.login[0].toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-xs uppercase tracking-[0.1em] text-white">{activeChatPartner.login}</h2>
                    <p className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 mt-0.5 ${
                      activeChatPartner.status === 'online' ? 'text-neon-green' : 'text-gray-500'
                    }`}>
                      {activeChatPartner.status === 'online' && <span className="w-1 h-1 bg-neon-green rounded-full animate-pulse"></span>}
                      {activeChatPartner.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2.5 text-gray-500 hover:text-neon-purple transition-all rounded-xl hover:bg-white/5">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-gray-500 hover:text-neon-purple transition-all rounded-xl hover:bg-white/5">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-gray-500 hover:text-white transition-all rounded-xl hover:bg-white/5">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth">
                {activeMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-50">
                    <MessageCircle className="w-12 h-12 text-white/10" />
                    <p className="text-xs font-bold uppercase tracking-widest">Нет сообщений. Напишите первым!</p>
                  </div>
                ) : (
                  activeMessages.map((msg, i) => {
                    const isMe = msg.fromId === currentUser.id;
                    return (
                      <div key={msg.id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isMe ? 'bg-neon-green/10 border-neon-green/20 text-neon-green' : 'bg-white/5 border-white/5 text-gray-600'
                        }`}>
                          {isMe ? 'Я' : activeChatPartner.login[0].toUpperCase()}
                        </div>
                        <div className={`space-y-1.5 ${isMe ? 'text-right' : ''}`}>
                          <div className={`p-4 rounded-2xl border max-w-sm relative group shadow-xl ${
                            isMe 
                              ? 'bg-white text-black border-transparent rounded-tr-none shadow-neon-green/5' 
                              : 'glass border-white/5 rounded-tl-none'
                          }`}>
                            <p className={`text-sm leading-relaxed ${isMe ? 'font-bold' : 'text-gray-300 font-medium'}`}>
                              {msg.text}
                            </p>
                            <div className={`absolute -bottom-5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'right-0' : 'left-0'}`}>
                              <span className="text-[9px] text-gray-700 font-bold">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {isMe && <CheckCheck className="w-3 h-3 text-neon-green" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/2 border-t border-white/5 backdrop-blur-3xl">
                <form onSubmit={handleSend} className="relative flex items-center gap-4 max-w-4xl mx-auto">
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-2.5 text-gray-600 hover:text-white transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2.5 text-gray-600 hover:text-white transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 relative group">
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl py-4 pl-5 pr-14 outline-none focus:border-neon-purple/30 transition-all text-xs font-bold"
                    />
                    <button 
                      type="submit"
                      disabled={!message.trim()}
                      className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                        message.trim() ? "bg-white text-black shadow-2xl scale-100" : "text-gray-700 scale-90 opacity-50"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-20 h-20 rounded-[2rem] bg-white/2 border border-white/5 flex items-center justify-center text-white/5">
                <MessageCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white">Выберите чат</h3>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest max-w-[200px] leading-loose">Твои тиммейты ждут твоего сообщения</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
