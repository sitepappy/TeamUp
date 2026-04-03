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
    <main className="min-h-screen pt-24 px-4 pb-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-purple opacity-5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-green opacity-5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl w-full h-[750px] glass rounded-[2.5rem] border-white/5 shadow-2xl overflow-hidden grid md:grid-cols-[350px_1fr] relative">
        {/* Sidebar */}
        <div className="border-r border-white/5 flex flex-col h-full bg-white/5 md:bg-transparent">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">Сообщения</h1>
              <button className="p-2 rounded-xl bg-neon-purple/20 text-neon-purple hover:bg-neon-purple hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-green transition-colors" />
              <input 
                type="text" 
                placeholder="Поиск диалогов..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-neon-green/30 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all relative group ${
                  activeChat === chat.id ? "bg-white/10 border-white/10" : "hover:bg-white/5 border-transparent"
                } border`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border border-white/10 ${
                    chat.status === 'online' ? 'bg-neon-green/10 text-neon-green' : 'bg-white/5 text-gray-500'
                  }`}>
                    {chat.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#050505] ${
                    chat.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 
                    chat.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold truncate text-sm">{chat.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-neon-purple rounded-full flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_#9D00FF]">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col h-full bg-[#080808]/50 relative">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-4">
                  <button className="md:hidden p-2 text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-neon-purple/10 text-neon-purple border border-neon-purple/20 flex items-center justify-center font-bold">
                      {currentChat?.avatar}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-sm uppercase tracking-wider">{currentChat?.name}</h2>
                    <p className="text-[10px] text-neon-green font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-neon-green rounded-full animate-pulse"></span>
                      В сети
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-neon-purple transition-all rounded-lg hover:bg-white/5">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-neon-purple transition-all rounded-lg hover:bg-white/5">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-white transition-all rounded-lg hover:bg-white/5">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex justify-center">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    Сегодня
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">{currentChat?.avatar}</div>
                  <div className="space-y-1">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-md relative group">
                      <p className="text-sm">Привет! Видел твою заявку в Доту. Еще ищешь пати?</p>
                      <span className="text-[10px] text-gray-600 absolute -bottom-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity">14:20</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-lg bg-neon-green/20 border border-neon-green/30 flex items-center justify-center text-xs font-bold text-neon-green">Я</div>
                  <div className="space-y-1 text-right">
                    <div className="bg-neon-green text-black p-4 rounded-2xl rounded-tr-none max-w-md relative group">
                      <p className="text-sm font-medium">Привет! Да, го. Какая роль?</p>
                      <div className="absolute -bottom-5 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-gray-600 uppercase font-bold">Просмотрено</span>
                        <CheckCheck className="w-3 h-3 text-neon-green" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">{currentChat?.avatar}</div>
                  <div className="space-y-1">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-md">
                      <p className="text-sm">Я на миду обычно, могу на 4 пересесть если надо.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">{currentChat?.avatar}</div>
                  <div className="flex items-center gap-1 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Печатает</span>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-neon-purple rounded-full"></motion.div>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-neon-purple rounded-full"></motion.div>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-neon-purple rounded-full"></motion.div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/5 border-t border-white/5">
                <div className="relative flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 pl-4 pr-12 outline-none focus:border-neon-purple/30 transition-all text-sm"
                    />
                    <button className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                      message ? "bg-neon-purple text-white shadow-[0_0_15px_#9D00FF]" : "text-gray-600"
                    }`}>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                <MessageCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tighter">Выберите диалог</h3>
                <p className="text-gray-500 text-sm">Твои тиммейты уже ждут сообщения от тебя</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
