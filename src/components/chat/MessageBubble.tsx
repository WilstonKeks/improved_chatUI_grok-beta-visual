import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full gap-4 p-4',
        isUser ? 'bg-chat-user' : 'bg-chat-ai'
      )}
    >
      <Avatar className={cn('h-8 w-8', isUser ? 'bg-primary' : 'bg-accent')}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="prose prose-invert max-w-none">
          {message.content}
        </div>
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="Uploaded content"
            className="max-h-60 rounded-lg object-contain"
          />
        )}
        <div className="text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}