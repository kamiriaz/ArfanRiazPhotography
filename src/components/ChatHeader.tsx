import React from 'react';
import { Bot, Circle, Zap } from 'lucide-react';

interface ChatHeaderProps {
  customerName: string;
}

export function ChatHeader({ customerName }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">
            <div className="flex items-center gap-2">
              Arfan Riaz Photography Assistant
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
          </h1>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Circle className="w-2 h-2 fill-green-500 text-green-500" />
            <span>AI-Powered • Ready to Help</span>
          </div>
        </div>
      </div>
    </div>
  );
}