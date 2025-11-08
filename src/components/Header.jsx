export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "1rem 0",
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(6px)",
        zIndex: 100,
        color: "#fff",
        fontFamily: "Shippori Mincho B1, serif",
      }}
    >
      <h1 style={{ fontSize: "1rem", fontWeight: "400", letterSpacing: "0.2em" }}>
        琉香 — RYUKA
      </h1>
    </header>
  );
}
