import React, { useEffect, useRef, useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { useChatbot } from './hooks/useChatbot';

function App() {
  const customerName = "Arfan Riaz";
  const { messages, isTyping, sendMessage } = useChatbot(customerName);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    setShowOptions(false);
    if (option === "Other") {
      const input = document.getElementById("chat-input") as HTMLInputElement;
      input?.focus();
    } else {
      sendMessage(option);
    }
  };

  const options = ["Pricing", "Floor Plans", "Portfolio", "360° Tours", "Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white shadow-2xl rounded-t-xl md:rounded-xl md:my-4 overflow-hidden">
          <ChatHeader customerName={customerName} />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="space-y-1">
              {messages.map((message, index) => (
                <React.Fragment key={message.id}>
                  <ChatMessage
                    message={message.text}
                    isBot={message.isBot}
                    timestamp={message.timestamp}
                  />

                  {/* Show vertical buttons below first bot message */}
                  {index === 0 && message.isBot && showOptions && (
                    <div className="flex flex-col mt-3 space-y-2 items-center">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          className="w-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded shadow hover:from-blue-600 hover:to-indigo-700"
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <ChatInput id="chat-input" onSendMessage={sendMessage} disabled={isTyping} />
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-sm text-gray-600">
          <p>AI Chatbot • Powered by GPT-4o-mini • Intelligent Conversations</p>
        </div>
      </div>
    </div>
  );
}

export default App;
