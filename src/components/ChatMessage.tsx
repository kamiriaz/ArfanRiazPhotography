import React from 'react';

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  onOptionClick?: (option: string) => void;
  options?: string[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, onOptionClick, options }) => {
  return (
    <div className={`p-2 my-1 rounded ${isBot ? 'bg-blue-100 text-black' : 'bg-gray-200 text-black'}`}>
      {message}
      {options && options.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onOptionClick && onOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
