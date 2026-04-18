import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import Loader from "./components/Loader";
import ReviewList from "./components/ReviewList";
import { askQuestion } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    // add user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setLoading(true);

    try {
      const res = await askQuestion({
        productId: "p1",
        question: text,
      });

      const botResponse = res.data;
      console.log("RAW AI RESPONSE:", botResponse.summary);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text:
              botResponse.summary ||
              botResponse.result ||
              "No response",
            sender: "bot",
            reviews: Array.isArray(botResponse.reviews) ? botResponse.reviews : []
          },
        ]);
        setLoading(false);
      }, 800); // small delay

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to server", sender: "bot" },
      ]);
      setLoading(false);
    }
  };

const parseAIResponse = (text) => {
  const sections = {
    answer: "",
    pros: [],
    cons: [],
    confidence: ""
  };

  const lines = text.split("\n");

  let current = "answer"; // default fallback

  lines.forEach(line => {
    const lower = line.toLowerCase();

    if (lower.includes("answer") || lower.includes("summary")) {
      current = "answer";
    } 
    else if (lower.includes("pros")) {
      current = "pros";
    } 
    else if (lower.includes("cons")) {
      current = "cons";
    } 
    else if (lower.includes("confidence")) {
      current = "confidence";
    } 
    else if (line.trim()) {
      if (current === "pros") sections.pros.push(line.replace("-", "").trim());
      else if (current === "cons") sections.cons.push(line.replace("-", "").trim());
      else if (current === "answer") sections.answer += line + " ";
      else if (current === "confidence") sections.confidence = line;
    }
  });

  return sections;
};
  return (
    <div className="app-container">
      <h2 className="title">AI Review Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.sender === "bot" ? (
              <ChatMessage data={parseAIResponse(msg.text)} sender="bot" />
            ) : (
              <ChatMessage message={msg.text} sender="user" />
            )}
            {msg.reviews && msg.reviews.length > 0 && (
              <ReviewList reviews={msg.reviews} />
            )}
          </div>
        ))}
        {loading && <Loader />}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;