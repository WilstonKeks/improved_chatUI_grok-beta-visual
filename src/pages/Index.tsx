import { useState } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ImageUploader } from '@/components/chat/ImageUploader';
import { Sidebar } from '@/components/chat/Sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/lib/store';
import { sendMessage } from '@/lib/xai';
import { Send } from 'lucide-react';

export default function Index() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { currentChatId, addMessage } = useChatStore();

  const handleSubmit = async () => {
    if (!message.trim() && !image) return;
    if (!currentChatId) return;

    const newMessage = {
      id: crypto.randomUUID(),
      content: message,
      role: 'user' as const,
      timestamp: Date.now(),
      imageUrl: image ? URL.createObjectURL(image) : undefined,
    };

    addMessage(currentChatId, newMessage);
    setMessage('');
    setImage(null);

    try {
      const response = await sendMessage(message, 'YOUR_XAI_API_KEY');
      const data = await response.json();

      const aiMessage = {
        id: crypto.randomUUID(),
        content: data.choices[0].message.content,
        role: 'assistant' as const,
        timestamp: Date.now(),
      };

      addMessage(currentChatId, aiMessage);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-hidden">
          <ChatContainer />
        </main>
        <div className="border-t bg-chat-user p-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <ImageUploader
              onImageSelect={setImage}
              onImageClear={() => setImage(null)}
              selectedImage={image}
            />
            <div className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button onClick={handleSubmit} className="px-8">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}