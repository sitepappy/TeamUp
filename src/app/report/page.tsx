"use client";

import { motion } from "framer-motion";
import { Flag, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const { createReport, currentUser } = useApp();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const formData = new FormData(e.currentTarget);
    createReport({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as any,
    });
    setSubmitted(true);
    setTimeout(() => router.push("/"), 3000);
  };

  if (!currentUser) {
    return (
      <main className="min-h-screen pt-32 flex flex-col items-center justify-center p-4">
        <div className="glass p-8 rounded-[2rem] text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-neon-purple mx-auto" />
          <h1 className="text-2xl font-bold">Нужна авторизация</h1>
          <p className="text-gray-400">Чтобы создать тикет или отправить жалобу, пожалуйста, войдите в свой аккаунт.</p>
          <button onClick={() => router.push("/login")} className="w-full py-4 bg-neon-purple text-white rounded-xl font-bold">Войти</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-4 pb-12 relative overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden"
        >
          {submitted ? (
            <div className="text-center space-y-6 py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-neon-green" />
              </motion.div>
              <h2 className="text-3xl font-bold uppercase italic tracking-tighter">Тикет отправлен!</h2>
              <p className="text-gray-400">Администрация рассмотрит вашу заявку в ближайшее время. Вы будете перенаправлены на главную страницу...</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                  <Flag className="w-8 h-8 text-neon-purple" />
                  Центр поддержки
                </h1>
                <p className="text-gray-400">Опишите вашу проблему, жалобу на игрока или найденный баг. Мы постараемся помочь как можно быстрее.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Тип обращения</label>
                  <select name="type" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-neon-purple/30 appearance-none text-white">
                    <option value="bug" className="bg-[#050505]">Баг / Техническая проблема</option>
                    <option value="complaint" className="bg-[#050505]">Жалоба на игрока</option>
                    <option value="other" className="bg-[#050505]">Другое</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Тема</label>
                  <input name="title" required placeholder="Краткая суть проблемы" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-neon-purple/30 text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Подробное описание</label>
                  <textarea name="description" required placeholder="Расскажите подробнее..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-neon-purple/30 text-white h-40 resize-none" />
                </div>

                <button type="submit" className="w-full py-5 bg-neon-purple text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_#9D00FF] transition-all flex items-center justify-center gap-3 group">
                  Отправить тикет
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
