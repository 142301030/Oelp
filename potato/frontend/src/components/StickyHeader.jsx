export default function StickyHeader({ en, ml, active }) {
  const words = en.split(" ");

  return (
    <div style={{
      position: "sticky",
      top: 0,
      background: "white",
      padding: "10px",
      borderBottom: "1px solid #ccc"
    }}>
      <p>
        <b>English:</b>{" "}
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              background: i === active ? "yellow" : "transparent",
              marginRight: "5px"
            }}
          >
            {w}
          </span>
        ))}
      </p>

      <p><b>Malayalam:</b> {ml}</p>
    </div>
  );
}