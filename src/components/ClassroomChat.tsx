import React, { useState, useEffect, useRef } from 'react';
import { Send, User as UserIcon, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { User, ChatMessage } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

interface ClassroomChatProps {
  user: User;
}

export const ClassroomChat: React.FC<ClassroomChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const classroomName = user.group_name || 'Umum';
  const isAdminOrTeacher = user.role === 'admin' || user.role === 'guru';

  useEffect(() => {
    // If not using Firebase, we could mock, but let's try Firebase
    if (!db) {
      setLoading(false);
      return;
    }
    
    // We filter by classroom_name. If teacher, they might have a generic group or need to select,
    // but for now, they just join their group_name ("Guru Sosiologi"). 
    const q = query(
      collection(db, 'chats'),
      where('classroom_name', '==', classroomName),
      orderBy('timestamp', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetched.push({
          id: doc.id,
          classroom_name: data.classroom_name,
          user_id: data.user_id,
          user_name: data.user_name,
          user_avatar: data.user_avatar,
          user_role: data.user_role,
          text: data.text,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : new Date().toISOString()
        });
      });
      setMessages(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching chats:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [classroomName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const text = newMessage.trim();
    setNewMessage('');

    if (db) {
      try {
        await addDoc(collection(db, 'chats'), {
          classroom_name: classroomName,
          user_id: user.id,
          user_name: user.name,
          user_avatar: user.avatarUrl,
          user_role: user.role,
          text,
          timestamp: serverTimestamp()
        });
      } catch (err) {
        console.error("Error sending message:", err);
        // Put message back if failed
        setNewMessage(text);
      }
    } else {
      // Fallback local UI if no DB
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        classroom_name: classroomName,
        user_id: user.id,
        user_name: user.name,
        user_avatar: user.avatarUrl,
        user_role: user.role,
        text,
        timestamp: new Date().toISOString()
      }]);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh] max-h-[800px]">
      {/* Header */}
      <div className="bg-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-emerald-100 font-bold text-lg leading-tight">Diskusi Kelas: {classroomName}</h2>
            <p className="text-xs text-stone-400">Hanya anggota rombel {classroomName} yang dapat melihat ruang ini.</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-900/50">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
            <span className="text-xs">Memuat pesan...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-stone-500 space-y-3">
            <UserIcon className="w-12 h-12 text-stone-700" />
            <p className="text-sm font-medium">Belum ada obrolan di kelas ini. Sapa teman-temanmu!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.user_id === user.id;
            const isTeacher = msg.user_role === 'guru' || msg.user_role === 'admin';
            const showAvatar = !isMe && (idx === 0 || messages[idx - 1].user_id !== msg.user_id);

            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} w-full`}>
                <div className={`flex max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                  {/* Avatar (hanya tampil jika bukan pesan kita dan pesan pertama dari blok tersebut) */}
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full bg-stone-800 flex-shrink-0 border border-stone-700 overflow-hidden ml-0 mr-2">
                      {showAvatar ? (
                        <img src={msg.user_avatar} alt={msg.user_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-transparent" />
                      )}
                    </div>
                  )}

                  <div className={`flex flex-col ${isMe ? 'items-end ml-2 mr-0' : 'items-start'}`}>
                    {(!isMe && showAvatar) && (
                      <span className="text-[10px] text-stone-400 mb-1 ml-1 font-semibold flex items-center space-x-1">
                        <span>{msg.user_name}</span>
                        {isTeacher && (
                          <span className="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1 py-0.5 rounded uppercase">Guru</span>
                        )}
                      </span>
                    )}

                    <div 
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        isMe 
                          ? 'bg-emerald-700 text-emerald-50 rounded-br-none shadow-sm border border-emerald-600/50' 
                          : isTeacher
                            ? 'bg-amber-900/40 text-amber-50 border border-amber-700/50 rounded-bl-none shadow-sm'
                            : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-stone-500 mt-1 mx-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-stone-950 p-3 sm:p-4 border-t border-stone-800">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tulis pesan ke kelas..."
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-stone-500"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
