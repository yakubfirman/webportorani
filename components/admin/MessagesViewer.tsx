'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faChevronDown, faTrash, faInbox,
  faReply, faCheckDouble, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { ContactMessageData } from '../../types';
import { api } from '../../lib/api';
import Button from '../ui/Button';

export default function MessagesViewer() {
  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = async () => {
    const data = await api.getMessages() as ContactMessageData[];
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleRead = async (id: number) => {
    await api.markMessageRead(id);
    await load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus pesan ini?')) return;
    await api.deleteMessage(id);
    await load();
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (loading) return (
    <div className="flex items-center gap-2 py-12 text-gray-400 justify-center">
      <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
      <span>Memuat pesan...</span>
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-pink-600" />
        <h2 className="text-lg font-bold text-pink-900">Pesan Masuk</h2>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount} baru
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faInbox} className="w-7 h-7 text-gray-400" />
          </div>
          <p className="font-medium">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-xs overflow-hidden transition-colors ${
                msg.is_read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
              }`}
            >
              {/* Header */}
              <div
                className="p-4 flex items-start justify-between gap-4 cursor-pointer"
                onClick={() => setExpanded(expanded === msg.id ? null : (msg.id ?? null))}
              >
                <div className="flex items-start gap-3 min-w-0">
                  {!msg.is_read && (
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-pink-900 truncate">{msg.name}</p>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-sm text-gray-700 mt-0.5 font-medium truncate">{msg.subject}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-400">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    }) : ''}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-4 h-4 text-gray-400 transition-transform ${expanded === msg.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {/* Expanded */}
              {expanded === msg.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed mt-3 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href={`mailto:${msg.email}`}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xs bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faReply} className="w-3 h-3" /> Balas Email
                    </a>
                    {!msg.is_read && (
                      <Button
                        onClick={() => handleRead(msg.id!)}
                        variant="ghost"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xs bg-green-50 text-green-700 hover:bg-green-100 font-medium"
                      >
                        <FontAwesomeIcon icon={faCheckDouble} className="w-3 h-3" /> Tandai Dibaca
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(msg.id!)}
                      variant="ghost"
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-3 h-3" /> Hapus
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
