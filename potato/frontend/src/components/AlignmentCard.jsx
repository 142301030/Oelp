import { useState } from "react";

export default function AlignmentCard({ pair, mlWords, onAnswer }) {
  const [ans, setAns] = useState(null);
  const [mode, setMode] = useState(null);
  const [text, setText] = useState("");

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      
      <h4>{pair.en_word} → {pair.ml_word}</h4>

      <button onClick={() => {
        setAns("yes");
        onAnswer("yes");
      }}>YES</button>

      <button onClick={() => setAns("no")}>NO</button>

      {ans === "no" && (
        <>
          <button onClick={() => setMode("index")}>
            Select Index
          </button>

          <button onClick={() => setMode("manual")}>
            Type Word
          </button>

          {mode === "index" && (
            <div>
              {mlWords.map((w, i) => (
                <button key={i} onClick={() => onAnswer(i)}>
                  [{i}] {w}
                </button>
              ))}
            </div>
          )}

          {mode === "manual" && (
            <input
              placeholder="Correct word"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                onAnswer(e.target.value);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}