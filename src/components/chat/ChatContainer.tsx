import { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { useChatStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChatContainer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { chats, currentChatId } = useChatStore();
  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select or start a new chat</p>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollRef} className="h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-2">
        {currentChat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}