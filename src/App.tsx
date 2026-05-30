import MatchList from "./components/MatchList";
import "./App.css";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fdf4" }}>
      <header style={{
        backgroundColor: "#166534",
        color: "white",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          ⚽ FanZone - World Cup 2026
        </h1>
        <p style={{ fontSize: "14px", marginTop: "4px", opacity: 0.9 }}>
          Track matches, predict scores, compete with friends
        </p>
      </header>
      
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
        <MatchList />
      </main>
    </div>
  );
}

export default App;