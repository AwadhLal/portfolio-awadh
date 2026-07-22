import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { getMessages, markMessageRead, deleteMessage } from '../../services/api';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const load = () => getMessages(unreadOnly).then(({ data }) => setMessages(data.data));
  useEffect(() => { load(); }, [unreadOnly]);

  const toggleRead = async (msg) => {
    try {
      await markMessageRead(msg.id, !msg.is_read);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update message');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      toast.success('Message deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">messages</p>
          <h1 className="font-display text-3xl font-semibold text-parchment">Inbox</h1>
        </div>
        <label className="flex items-center gap-2 font-mono text-sm text-slate-soft">
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} className="accent-teal-accent" />
          Unread only
        </label>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`panel p-5 ${!m.is_read ? 'border-teal-accent/50' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-display text-parchment font-medium">{m.name}</p>
                  <span className="font-mono text-xs text-slate-soft">{m.email}</span>
                  {!m.is_read && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-teal-accent/20 text-teal-accent">new</span>}
                </div>
                {m.subject && <p className="font-mono text-sm text-amber-accent mb-2">{m.subject}</p>}
                <p className="text-parchment-dim font-serif text-sm leading-relaxed">{m.message}</p>
                <p className="font-mono text-xs text-slate-soft mt-3">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => toggleRead(m)} className="text-slate-soft hover:text-teal-accent" title="Toggle read">
                  {m.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                </button>
                <button onClick={() => handleDelete(m.id)} className="text-slate-soft hover:text-amber-accent"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-slate-soft font-serif">No messages yet.</p>}
      </div>
    </div>
  );
}
