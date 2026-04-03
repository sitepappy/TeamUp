"use client";

import { useApp } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, Flag, BarChart3, ChevronRight, LogOut, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const menuItems = [
    { name: "Дашборд", path: "/admin", icon: LayoutDashboard },
    { name: "Пользователи", path: "/admin/users", icon: Users },
    { name: "Заявки (LFG)", path: "/admin/posts", icon: FileText },
    { name: "Репорты", path: "/admin/reports", icon: Flag },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-white/5 backdrop-blur-xl flex flex-col p-6 fixed h-full z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-neon-purple flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">ADMIN<span className="text-neon-purple">PANEL</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                  isActive ? "bg-neon-purple text-white shadow-[0_0_15px_#9D00FF]" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-wider">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 rounded-lg bg-neon-purple/20 text-neon-purple flex items-center justify-center font-bold text-xs uppercase">{currentUser.login[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate uppercase tracking-tighter">{currentUser.login}</p>
              <p className="text-[10px] text-neon-purple font-bold uppercase tracking-widest">Administrator</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white text-sm transition-all group">
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Вернуться на сайт</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 pt-12 relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[150px] rounded-full -z-10"></div>
        {children}
      </main>
    </div>
  );
}
