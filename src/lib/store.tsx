"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  login: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'banned';
  rank?: string;
  elo?: number;
}

export interface LFGPost {
  id: string;
  userId: string;
  userName: string;
  gameId: string;
  role: string;
  rank: string;
  elo: number;
  lang: string;
  description: string;
  createdAt: string;
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  type: 'bug' | 'complaint' | 'other';
  createdAt: string;
  comments: { userId: string; text: string; createdAt: string }[];
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  posts: LFGPost[];
  reports: Report[];
  login: (login: string, password: string) => boolean;
  logout: () => void;
  createPost: (post: Omit<LFGPost, 'id' | 'userId' | 'userName' | 'createdAt'>) => void;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, data: Partial<LFGPost>) => void;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
  changeRole: (userId: string, role: UserRole) => void;
  createReport: (report: Omit<Report, 'id' | 'userId' | 'userName' | 'createdAt' | 'status' | 'comments'>) => void;
  updateReportStatus: (reportId: string, status: Report['status']) => void;
  addReportComment: (reportId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USERS: User[] = [
  { id: '1', login: 'teamupdev', email: 'admin@teamup.gg', role: 'admin', status: 'online' },
  { id: '2', login: 'vlad_pro_2007', email: 'vlad@example.com', role: 'user', status: 'online', rank: 'Immortal', elo: 6200 },
  { id: '3', login: 'CyberPanda', email: 'panda@example.com', role: 'user', status: 'away', rank: 'Divine', elo: 5100 },
];

const INITIAL_POSTS: LFGPost[] = [
  { id: 'p1', userId: '2', userName: 'vlad_pro_2007', gameId: 'dota-2', role: 'Mid', rank: 'Immortal', elo: 6200, lang: 'RU', description: 'Ищу +2 в пати, саппорты от 5к ммр', createdAt: new Date().toISOString() },
  { id: 'p2', userId: '3', userName: 'CyberPanda', gameId: 'dota-2', role: 'Carry', rank: 'Divine', elo: 5100, lang: 'EN/RU', description: 'Я на миду буду', createdAt: new Date().toISOString() },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<LFGPost[]>(INITIAL_POSTS);
  const [reports, setReports] = useState<Report[]>([]);

  // Simple login mock
  const login = (loginStr: string, passwordStr: string) => {
    if (loginStr === 'teamupdev' && passwordStr === 'Monkastan2804') {
      const admin = users.find(u => u.login === 'teamupdev');
      if (admin) {
        setCurrentUser(admin);
        return true;
      }
    }
    const user = users.find(u => (u.login === loginStr || u.email === loginStr) && u.status !== 'banned');
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const createPost = (post: any) => {
    if (!currentUser) return;
    const newPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.login,
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = (postId: string) => setPosts(prev => prev.filter(p => p.id !== postId));

  const updatePost = (postId: string, data: Partial<LFGPost>) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, ...data } : p));
  };

  const banUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'banned' } : u));
    if (currentUser?.id === userId) logout();
  };

  const unbanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'offline' } : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setPosts(prev => prev.filter(p => p.userId !== userId));
    if (currentUser?.id === userId) logout();
  };

  const changeRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  };

  const createReport = (report: any) => {
    if (!currentUser) return;
    const newReport: Report = {
      ...report,
      id: 'rep-' + Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.login,
      status: 'open',
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (reportId: string, status: Report['status']) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  const addReportComment = (reportId: string, text: string) => {
    if (!currentUser) return;
    setReports(prev => prev.map(r => r.id === reportId ? {
      ...r,
      comments: [...r.comments, { userId: currentUser.id, text, createdAt: new Date().toISOString() }]
    } : r));
  };

  return (
    <AppContext.Provider value={{
      currentUser, users, posts, reports,
      login, logout, createPost, deletePost, updatePost,
      banUser, unbanUser, deleteUser, changeRole,
      createReport, updateReportStatus, addReportComment
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
