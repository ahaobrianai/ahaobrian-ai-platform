import React, { useState } from "react";
import ChoiceSelector from "../common/ChoiceSelector";
import styled from "styled-components";

// List of public AI chat APIs (models)
const chatModels = [
  { label: "Brainshop", value: "brainshop" },
  { label: "GPT-4 (giftedtech)", value: "giftedtech" },
  { label: "Maher Zubair ChatGPT-4", value: "maherzubair" },
];

const chatApiUrls = {
  brainshop: (msg) =>
    `https://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=1&msg=${encodeURIComponent(msg)}`,
  giftedtech: (msg) =>
    `https://gpt4.giftedtech.workers.dev/?prompt=${encodeURIComponent(msg)}`,
  maherzubair: (msg) =>
    `https://api.maher-zubair.tech/ai/chatgpt4?q=${encodeURIComponent(msg)}`,
};

// Chat UI styling
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChatBox = styled.div`
  max-height: 210px;
  overflow-y: auto;
  background: #4fd7fa22;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  animation: fadeIn .6s;
`;

const UserMsg = styled.div`
  font-weight: bold;
  color: #53fa7b;
  margin-bottom: .4rem;
`;

const BotMsg = styled.div`
  color: #8c6bfa;
  margin-bottom: .6rem;
`;

const InputRow = styled.form`
  display: flex;
  gap: 0.8rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.7rem;
  border-radius: 1rem;
  border: 2px solid #ddd;
  font-size: 1rem;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.rainbowBorder};
  &:focus {
    outline: none;
    border-color: #53fa7b;
    box-shadow: 0 2px 12px #8884;
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.rainbowBorder};
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform .18s ${({ theme }) => theme.animationFast};
  animation: bounce 1s infinite alternate;
  &:hover {
    transform: scale(1.08) rotate(-2deg);
  }
`;

function AIChatWidget() {
  const [selectedModel, setSelectedModel] = useState(chatModels[0].value);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const userMsg = input;
    setChat([...chat, { user: userMsg, bot: "..." }]);
    setInput("");

    try {
      const url = chatApiUrls[selectedModel](userMsg);
      const res = await fetch(url);
      let botMsg = "";

      if (selectedModel === "brainshop") {
        const data = await res.json();
        botMsg = data.cnt;
      } else if (selectedModel === "giftedtech") {
        botMsg = await res.text();
      } else if (selectedModel === "maherzubair") {
        const data = await res.json();
        botMsg = typeof data === "string" ? data : JSON.stringify(data);
      }

      setChat((prev) =>
        prev.slice(0, -1).concat({ user: userMsg, bot: botMsg })
      );
    } catch (err) {
      setChat((prev) =>
        prev.slice(0, -1).concat({ user: userMsg, bot: "Error getting response!" })
      );
    }
    setLoading(false);
  }

  return (
    <ChatContainer>
      <ChoiceSelector
        label="Choose AI Chat Model"
        options={chatModels}
        value={selectedModel}
        onChange={e => setSelectedModel(e.target.value)}
      />
      <ChatBox>
        {chat.length === 0 && <div style={{color: "#aaa"}}>Start a conversation!</div>}
        {chat.map((msg, idx) => (
          <div key={idx}>
            <UserMsg>👤 You: {msg.user}</UserMsg>
            <BotMsg>🤖 AI: {msg.bot}</BotMsg>
          </div>
        ))}
      </ChatBox>
      <InputRow onSubmit={handleSend}>
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <SendButton type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </SendButton>
      </InputRow>
    </ChatContainer>
  );
}

export default AIChatWidget;
