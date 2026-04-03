"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Lock, Play } from "lucide-react";
import { useApp } from "@/lib/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useApp();
  const router = useRouter();
  const [loginVal, setLoginVal] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginVal, password)) {
      router.push("/");
    } else {
      setError("Неверный логин или пароль");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-md w-full p-8 rounded-[2rem] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">С возвращением в <span className="text-neon-purple">TeamUp</span></h1>
            <p className="text-gray-400">Твоя команда уже ждёт тебя</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Логин или Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-green transition-colors" />
                <input 
                  type="text" 
                  value={loginVal}
                  onChange={(e) => setLoginVal(e.target.value)}
                  placeholder="teamupdev"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-neon-green" />
                <span className="text-gray-400 group-hover:text-white transition-colors">Запомнить меня</span>
              </label>
              <Link href="#" className="text-neon-purple hover:text-white transition-colors">
                Забыли пароль?
              </Link>
            </div>

            <div className="pt-4">
              <button className="w-full bg-neon-purple text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_#9D00FF] transition-all flex items-center justify-center gap-2 group">
                Войти в систему <Play className="w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Ещё нет аккаунта?{" "}
              <Link href="/register" className="text-neon-green hover:text-white transition-colors font-bold">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
