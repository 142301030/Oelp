import { useNavigate } from "react-router-dom";

export default function Domain() {
  const nav = useNavigate();

  return (
    <div>
      <h2>Select Domain</h2>

      <select>
        <option>General</option>
        <option>Medical</option>
      </select>

      <button onClick={() => nav("/instructions")}>
        Continue
      </button>
    </div>
  );
}