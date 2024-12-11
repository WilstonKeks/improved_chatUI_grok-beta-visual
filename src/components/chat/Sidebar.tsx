import { useState } from 'react';
import { useChatStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquarePlus, Trash2, Edit2, Save } from 'lucide-react';

export function Sidebar() {
  const { chats, currentChatId, addChat, deleteChat, setCurrentChat, updateChatTitle } =
    useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const startEditing = (chatId: string, title: string) => {
    setEditingId(chatId);
    setEditTitle(title);
  };

  const saveTitle = (chatId: string) => {
    updateChatTitle(chatId, editTitle);
    setEditingId(null);
  };

  return (
    <div className="flex h-full w-64 flex-col gap-4 bg-chat-user p-4">
      <Button
        onClick={() => addChat()}
        className="w-full"
        variant="secondary"
      >
        <MessageSquarePlus className="mr-2 h-4 w-4" />
        New Chat
      </Button>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-2"
            >
              {editingId === chat.id ? (
                <>
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="h-8"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => saveTitle(chat.id)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={currentChatId === chat.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start truncate"
                    onClick={() => setCurrentChat(chat.id)}
                  >
                    {chat.title}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => startEditing(chat.id, chat.title)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteChat(chat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}