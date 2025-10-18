"use client";
import React, { useState } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import Image from "next/image";

function InboxPage() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Byteline Executi...",
      title: "Systems Executive",
      avatar: "/images/courseImage.jpg",
      time: "10:15 AM",
      lastMessage: "Hi i have a question.",
      isActive: true,
      unread: true,
    },
    {
      id: 2,
      name: "Byteline Execut...",
      title: "Systems Executive",
      avatar: "/images/courseImage.jpg",
      time: "10:15 AM",
      lastMessage: "I need help",
      isActive: false,
      unread: false,
    },
    {
      id: 3,
      name: "Byteline Execut...",
      title: "Systems Executive",
      avatar: "/images/courseImage.jpg",
      time: "10:15 AM",
      lastMessage: "I need help",
      isActive: false,
      unread: false,
    },
    {
      id: 4,
      name: "Byteline Execut...",
      title: "Systems Executive",
      avatar: "/images/courseImage.jpg",
      time: "10:15 AM",
      lastMessage: "I need help",
      isActive: false,
      unread: false,
    },
  ];

  const selectedConversation = conversations[selectedChat] || conversations[0];

  const messages = [
    {
      id: 1,
      type: "received",
      text: "Hi i have a question.",
      timestamp: "10:15 AM",
    },
    {
      id: 2,
      type: "sent",
      image: "/images/courseImage.jpg",
      timestamp: "10:18 AM",
    },
    {
      id: 3,
      type: "sent",
      image: "/images/courseImage.jpg",
      timestamp: "10:20 AM",
    },
    {
      id: 4,
      type: "received",
      image: "/images/courseImage.jpg",
      timestamp: "10:22 AM",
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim().length === 0) return;
    console.log("Message sent:", messageInput);
    setMessageInput("");
  };

  return (
    <div className="flex h-screen bg-gray-50 container mx-auto">
      {/* Left Sidebar - Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>

          {/* Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Message ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation, index) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedChat(index)}
              className={`w-full px-4 py-3 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedChat === index ? "bg-green-50" : ""
              }`}
            >
              <Image
                width={48}
                height={48}
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`font-medium text-gray-900 truncate ${
                      selectedChat === index ? "font-semibold" : ""
                    }`}
                  >
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {conversation.title}
                </p>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {conversation.lastMessage}
                </p>
              </div>
              {selectedChat === index && (
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-2"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          {selectedConversation && (
            <div className="flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-900">
                  {selectedConversation.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedConversation.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "sent" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs">
                {message.image && (
                  <div className="relative group">
                    <Image
                      width={200}
                      height={200}
                      src={message.image}
                      alt="Message"
                      className="rounded-lg max-h-48 object-cover"
                    />
                    <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white bg-opacity-0 group-hover:bg-opacity-100 transition-all flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-600">↓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {message.text && (
                  <div
                    className={`${
                      message.type === "sent"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    } rounded-lg px-4 py-2 inline-block`}
                  >
                    {message.text}
                  </div>
                )}
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    message.type === "sent" ? "text-right" : ""
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip size={20} />
            </button>
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Add Image Or Files"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxPage;
