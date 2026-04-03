"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Search, Send, Plus, MoreVertical, Phone, Video, Smile, Paperclip, ChevronLeft, Check, CheckCheck, MessageCircle } from "lucide-react";
import { useState } from "react";

const CHATS = [
  { id: 1, name: "ShadowFiend", lastMsg: "Го катку в доту?", time: "14:20", unread: 2, status: "online", avatar: "S" },
  { id: 2, name: "CyberPanda", lastMsg: "Я на миду буду", time: "Вчера", unread: 0, status: "away", avatar: "C" },
  { id: 3, name: "NeonSnake", lastMsg: "Спасибо за игру!", time: "Пн", unread: 0, status: "offline", avatar: "N" },
  { id: 4, name: "GosuGamer", lastMsg: "Прими в пати", time: "12:15", unread: 5, status: "online", avatar: "G" },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");

  const currentChat = CHATS.find(c => c.id === activeChat);

  return (
    <main className="min-h-screen pt-28 px-4 pb-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-purple opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-green opacity-10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl w-full h-[700px] glass rounded-[3rem] border-white/5 shadow-2xl overflow-hidden grid md:grid-cols-[320px_1fr] relative">
        {/* Sidebar */}
        <div className="border-r border-white/5 flex flex-col h-full bg-white/2 backdrop-blur-3xl">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black italic tracking-tighter uppercase text-white">Messages</h1>
              <button className="p-2 rounded-xl bg-neon-purple/10 text-neon-purple hover:bg-neon-purple hover:text-white transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-focus-within:text-neon-green transition-colors" />
              <input 
                type="text" 
                placeholder="Search chats..."
                className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-neon-green/30 transition-all text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-6 no-scrollbar">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full p-3.5 rounded-2xl flex items-center gap-4 transition-all relative group border ${
                  activeChat === chat.id ? "bg-white/5 border-white/10" : "hover:bg-white/2 border-transparent"
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border border-white/5 ${
                    chat.status === 'online' ? "bg-neon-green/10 text-neon-green" : "bg-white/5 text-gray-600"
                  }`}>
                    {chat.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-4 border-[#050505] ${
                    chat.status === 'online' ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : 
                    chat.status === 'away' ? "bg-yellow-500" : "bg-gray-600"
                  }`}></div>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold truncate text-xs uppercase tracking-tight text-gray-200">{chat.name}</span>
                    <span className="text-[9px] text-gray-600 font-mono font-bold">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate font-medium">{chat.lastMsg}</p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-4 h-4 bg-neon-purple rounded-lg flex items-center justify-center text-[9px] font-black shadow-[0_0_15px_rgba(157,0,255,0.5)]">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col h-full bg-[#080808]/30 relative">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/2 backdrop-blur-3xl">
                <div className="flex items-center gap-4">
                  <button className="md:hidden p-2 text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-neon-purple/10 text-neon-purple border border-neon-purple/20 flex items-center justify-center font-black text-xs">
                      {currentChat?.avatar}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-xs uppercase tracking-[0.1em] text-white">{currentChat?.name}</h2>
                    <p className="text-[9px] text-neon-green font-black uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <span className="w-1 h-1 bg-neon-green rounded-full animate-pulse"></span>
                      Online
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
              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                <div className="flex justify-center">
                  <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-white/2 rounded-full border border-white/5">
                    Today
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-gray-600 shrink-0">{currentChat?.avatar}</div>
                  <div className="space-y-1.5">
                    <div className="glass p-4 rounded-2xl rounded-tl-none border-white/5 max-w-sm relative group shadow-xl">
                      <p className="text-sm text-gray-300 leading-relaxed font-medium">Привет! Видел твою заявку в Доту. Еще ищешь пати?</p>
                      <span className="text-[9px] text-gray-700 absolute -bottom-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity font-bold">14:20</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-[10px] font-black text-neon-green shrink-0">ME</div>
                  <div className="space-y-1.5 text-right">
                    <div className="bg-white text-black p-4 rounded-2xl rounded-tr-none max-w-sm relative group shadow-xl shadow-neon-green/5">
                      <p className="text-sm font-bold leading-relaxed">Привет! Да, го. Какая роль?</p>
                      <div className="absolute -bottom-5 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] text-gray-700 uppercase font-black tracking-widest">Seen</span>
                        <CheckCheck className="w-3 h-3 text-neon-green" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-gray-600 shrink-0">{currentChat?.avatar}</div>
                  <div className="space-y-1.5">
                    <div className="glass p-4 rounded-2xl rounded-tl-none border-white/5 max-w-sm shadow-xl">
                      <p className="text-sm text-gray-300 leading-relaxed font-medium">Я на миду обычно, могу на 4 пересесть если надо.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-gray-600 shrink-0">{currentChat?.avatar}</div>
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-white/5 rounded-full border border-white/5 shadow-inner">
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">Typing</span>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-neon-purple rounded-full"></motion.div>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-neon-purple rounded-full"></motion.div>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-neon-purple rounded-full"></motion.div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/2 border-t border-white/5 backdrop-blur-3xl">
                <div className="relative flex items-center gap-4 max-w-4xl mx-auto">
                  <div className="flex items-center gap-1">
                    <button className="p-2.5 text-gray-600 hover:text-white transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 text-gray-600 hover:text-white transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 relative group">
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message..."
                      className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl py-4 pl-5 pr-14 outline-none focus:border-neon-purple/30 transition-all text-xs font-bold"
                    />
                    <button className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                      message ? "bg-white text-black shadow-2xl scale-100" : "text-gray-700 scale-90"
                    }`}>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-20 h-20 rounded-[2rem] bg-white/2 border border-white/5 flex items-center justify-center text-white/5">
                <MessageCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white">Select a Chat</h3>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest max-w-[200px] leading-loose">Your teammates are waiting for your message</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
