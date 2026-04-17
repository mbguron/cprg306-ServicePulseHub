"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getChatbotResponse } from "@/lib/chatbot";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await getChatbotResponse({ prompt: userMessage.text });
      console.log("Chatbot response:", response);
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date().toISOString,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-24 right-8 z-50 w-96 h-[500px] bg-orange-200 border rounded-lg shadow-2xl flex flex-col transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-orange-400/80 p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <Image src="/chatbot.svg" alt="Chatbot" width={32} height={32} />
            </div>
            <div className="-mt-1 flex flex-col">
              <h3 className="text-white font-bold text-lg">Chat Assistant</h3>
              <p className="text-orange-100 text-sm">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-orange-700 rounded p-1 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-orange-400 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Commonly Asked Questions */}

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-4 bg-white rounded-b-lg"
        >
          <div className="flex gap-2 mb-3">
            <div
              type="button"
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-full text-gray-500 cursor-pointer"
              onClick={() => {
                setInputValue("What is your location?");
              }}
            >
              Location
            </div>
            <div
              type="button"
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-full text-gray-500 cursor-pointer"
              onClick={() => {
                setInputValue("What is your contact information?");
              }}
            >
              Contact Information
            </div>
            <div
              type="button"
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-full text-gray-500 cursor-pointer"
              onClick={() => {
                setInputValue("What services do you offer?");
              }}
            >
              Services
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-gray-100 border border-gray-100 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-300 transition-all"
              disabled={isLoading}
            />
            {isLoading ? (
              <button
                type="button"
                onClick={handleStopResponse}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
