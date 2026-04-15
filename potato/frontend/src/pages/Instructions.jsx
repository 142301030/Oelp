import { useNavigate } from "react-router-dom";

export default function Instructions() {
  const nav = useNavigate();

  return (
    <div>
      <h2>Instructions</h2>

      <ul>
        <li>Each page shows English + Malayalam sentence</li>
        <li>Check word alignment</li>
        <li>YES → correct</li>
        <li>NO → incorrect</li>
        <li>If NO:
          <ul>
            <li>Select correct index</li>
            <li>OR type correct word</li>
          </ul>
        </li>
      </ul>

      <button onClick={() => nav("/annotate")}>
        Start Annotation
      </button>
    </div>
  );
}