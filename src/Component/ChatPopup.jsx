import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { getSuggestedTask, updateSuggestedTask } from "../api/user.api";

const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState("");
    const [task, setTask] = useState({});

    const handleSend = async () => {
        if (!input.trim()) return;
    
        let newMessages = [...messages];
    
        // Step 1: Get user name and fetch suggested task
        if (step === 1) {
            const name = input.trim();
            setUserName(name);
            newMessages.push({ sender: "user", text: name });
            newMessages.push({ sender: "bot", text: `Hi ${name}! 👋 Welcome back.` });
            newMessages.push({ sender: "bot", text: "..." }); // Loading indicator
            setMessages(newMessages);
            setInput("");
    
            try {
                const res = await getSuggestedTask();
                // console.log("API response:", res.data);
    
                const suggestedTask = res.data.suggestedTask;
                if (suggestedTask) {
                    setTask(suggestedTask);
    
                    // Replace last "..." with task message
                    newMessages.pop();
                    newMessages.push({
                        sender: "bot",
                        text: `Your suggested task for today is: "${suggestedTask.title}". Please type: complete, progress, or skip.`,
                    });
    
                    setStep(2);
                } else {
                    newMessages.pop();
                    newMessages.push({ sender: "bot", text: "No task found for you today." });
                }
            } catch (error) {
                console.error("Task fetch error:", error);
                newMessages.pop();
                newMessages.push({ sender: "bot", text: "Sorry! Unable to fetch your task right now." });
            }
    
            setMessages([...newMessages]);
            return;
        }
    
        // Step 2: Handle task status input
        if (step === 2) {
            const status = input.toLowerCase();
            newMessages.push({ sender: "user", text: input });
    
            if (["complete", "progress", "skip"].includes(status)) {
                newMessages.push({ sender: "bot", text: "..." }); // Loading indicator
                setMessages(newMessages);
                setInput("");
    
                try {
                    const payload = {
                        taskId: task._id,
                        action: status
                    };
                    const res = await updateSuggestedTask(payload);
                    console.log(res);
    
                    newMessages.pop(); // remove "..."
                    newMessages.push({
                        sender: "bot",
                        text: `Thanks ${userName}! Your task "${task.title}" is marked as "${status}". ✅`,
                    });
    
                    setStep(3);
                } catch (error) {
                    console.error("Status update error:", error);
                    newMessages.pop(); // remove "..."
                    newMessages.push({ sender: "bot", text: "Failed to update task status. Try again later." });
                }
            } else {
                newMessages.push({
                    sender: "bot",
                    text: "I'm in development phase. 🚧 Please use: complete, progress, or skip.",
                });
            }
    
            setMessages([...newMessages]);
            setInput("");
        }
    };
    

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen && messages.length === 0) {
                        setMessages([{ sender: "bot", text: "Hello! What's your name?" }]);
                        setStep(1);
                    }
                }}
                className="bg-bg-color1/90 text-white p-3 rounded-full shadow-lg hover:bg-bg-color1 transition"
            >
                {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="mt-2 w-80 h-96 bg-black rounded-xl shadow-2xl border border-bg-color1/50 flex flex-col overflow-hidden">
                    <div className="bg-bg-color1 text-white p-3 font-medium text-center">
                        AI Chat Assistant
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-300 space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-md max-w-[80%] ${
                                    msg.sender === "user"
                                        ? "bg-blue-600 text-white self-end ml-auto"
                                        : "bg-gray-800 text-gray-300 self-start"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t flex items-center gap-2 text-text-color border-gray-200">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full px-3 py-2 bg-bg-color border rounded focus:outline-none text-xs"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="text-xs font-medium p-2 bg-bg-color1 text-text-color rounded-md"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatPopup;
