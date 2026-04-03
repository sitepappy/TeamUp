"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Mail, Lock, ShieldCheck, Play } from "lucide-react";

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-md w-full p-8 rounded-[2rem] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Присоединяйся к <span className="text-neon-green">TeamUp</span></h1>
            <p className="text-gray-400">Начни поиск тиммейтов уже сейчас</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Логин</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-green transition-colors" />
                <input 
                  type="text" 
                  placeholder="vlad_pro_2007"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-neon-green/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-green transition-colors" />
                <input 
                  type="email" 
                  placeholder="vlad@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-neon-green/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Пароль</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-purple transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Подтвердите пароль</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-purple transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-neon-green text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_#00FF9C] transition-all flex items-center justify-center gap-2 group">
                Создать аккаунт <Play className="w-4 h-4 fill-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="text-neon-purple hover:text-white transition-colors font-bold">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
