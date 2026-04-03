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
  bio?: string;
  discord?: string;
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

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  text: string;
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
  messages: Message[];
  login: (login: string, password: string) => boolean;
  register: (login: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
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
  sendMessage: (toId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USERS: User[] = [
  { id: '1', login: 'teamupdev', email: 'admin@teamup.gg', role: 'admin', status: 'online' },
  { id: '2', login: 'vlad_pro_2007', email: 'vlad@example.com', role: 'user', status: 'online', rank: 'Immortal', elo: 6200, bio: 'Играю в доту с 2013 года.', discord: 'vlad_discord' },
  { id: '3', login: 'CyberPanda', email: 'panda@example.com', role: 'user', status: 'away', rank: 'Divine', elo: 5100, bio: 'Я на миду буду', discord: 'panda_dc' },
];

const INITIAL_POSTS: LFGPost[] = [
  { id: 'p1', userId: '2', userName: 'vlad_pro_2007', gameId: 'dota-2', role: 'Mid', rank: 'Immortal', elo: 6200, lang: 'RU', description: 'Ищу +2 в пати, саппорты от 5к ммр', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 'p2', userId: '3', userName: 'CyberPanda', gameId: 'dota-2', role: 'Carry', rank: 'Divine', elo: 5100, lang: 'EN/RU', description: 'Я на миду буду', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<LFGPost[]>(INITIAL_POSTS);
  const [reports, setReports] = useState<Report[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('tu_users');
    const savedPosts = localStorage.getItem('tu_posts');
    const savedReports = localStorage.getItem('tu_reports');
    const savedMessages = localStorage.getItem('tu_messages');
    const savedUser = localStorage.getItem('tu_current_user');

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedReports) setReports(JSON.parse(savedReports));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('tu_users', JSON.stringify(users));
    localStorage.setItem('tu_posts', JSON.stringify(posts));
    localStorage.setItem('tu_reports', JSON.stringify(reports));
    localStorage.setItem('tu_messages', JSON.stringify(messages));
    if (currentUser) {
      localStorage.setItem('tu_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tu_current_user');
    }
  }, [users, posts, reports, messages, currentUser, isLoaded]);

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

  const register = (loginStr: string, emailStr: string, passwordStr: string) => {
    if (users.find(u => u.login === loginStr || u.email === emailStr)) {
      return false;
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      login: loginStr,
      email: emailStr,
      role: 'user',
      status: 'online',
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const updateUser = (data: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
  };

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

  const sendMessage = (toId: string, text: string) => {
    if (!currentUser) return;
    const newMessage: Message = {
      id: 'msg-' + Math.random().toString(36).substr(2, 9),
      fromId: currentUser.id,
      toId,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider value={{
      currentUser, users, posts, reports, messages,
      login, register, logout, updateUser, createPost, deletePost, updatePost,
      banUser, unbanUser, deleteUser, changeRole,
      createReport, updateReportStatus, addReportComment, sendMessage
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
