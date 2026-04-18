function ChatMessage({ message, sender, data }) {
  if (sender === "user") {
    return <div className="message user">{message}</div>;
  }

  return (
    <div className="message bot card">
      
      {/* Answer */}
      <div className="answer">
        {data?.answer?.trim() ? data.answer : message}
      </div>
      {/* Pros */}
      {data?.pros?.length > 0 && (
        <div className="pros">
          <strong>Pros:</strong>
          {data.pros.map((p, i) => (
            <div key={i}> {p}</div>
          ))}
        </div>
      )}

      {/* Cons */}
      {data?.cons?.length > 0 && (
        <div className="cons">
          <strong>Cons:</strong>
          {data.cons.map((c, i) => (
            <div key={i}> {c}</div>
          ))}
        </div>
      )}

      {/* Confidence */}
      {data?.confidence && (
        <div className="confidence">
          Confidence: <span>{data.confidence}</span>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;