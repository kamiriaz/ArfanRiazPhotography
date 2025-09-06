import { useState, useCallback } from 'react';
import { ChatApiService } from '../services/chatApi';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export function useChatbot(customerName: string) {
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    text: `👋 Welcome! I'm Arfan Riaz, your property photography specialist.  
I can help you with the following:`,
    isBot: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    options: ["Pricing & Quotes", "Floor Plans", "Virtual Tours", "Portfolio", "Other"]
  } as any
]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatApiService] = useState(() => new ChatApiService());

  const sendMessage = useCallback((text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Get AI response from backend
    chatApiService.sendMessage(text).then((response) => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }).catch((error) => {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting to the chat service. Please make sure the backend server is running and try again.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    });
  }, [chatApiService]);

  return {
    messages,
    isTyping,
    sendMessage,
    clearHistory: () => chatApiService.clearHistory()
  };
}