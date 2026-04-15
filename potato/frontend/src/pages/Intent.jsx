import { useNavigate } from "react-router-dom";

export default function Intent() {
  const nav = useNavigate();

  return (
    <div>
      <h2>Select Task</h2>
      <button onClick={() => nav("/domain")}>Evaluate Model</button>
      <button onClick={() => nav("/domain")}>Ground Truth</button>
    </div>
  );
}