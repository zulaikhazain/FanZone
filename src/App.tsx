import { useState } from "react";
import MatchList from "./components/MatchList";
import GroupStandings from "./components/GroupStandings";
import Predictions from "./components/Predictions";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"matches" | "standings" | "predictions">("matches");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eff6ff" }}>
      <header style={{
        backgroundColor: "#1e3a8a",
        color: "#ffffff",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          ⚽ FanZone - World Cup 2026
        </h1>
        <p style={{ fontSize: "14px", marginTop: "4px", opacity: 0.9 }}>
          Track matches, predict scores, compete with friends
        </p>
        
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("matches")}
            style={{
              backgroundColor: activeTab === "matches" ? "#eab308" : "transparent",
              color: activeTab === "matches" ? "#1e3a8a" : "white",
              border: "none",
              padding: "8px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            📅 Matches
          </button>
          <button
            onClick={() => setActiveTab("standings")}
            style={{
              backgroundColor: activeTab === "standings" ? "#eab308" : "transparent",
              color: activeTab === "standings" ? "#1e3a8a" : "white",
              border: "none",
              padding: "8px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🏆 Group Standings
          </button>
          <button
            onClick={() => setActiveTab("predictions")}
            style={{
              backgroundColor: activeTab === "predictions" ? "#eab308" : "transparent",
              color: activeTab === "predictions" ? "#1e3a8a" : "white",
              border: "none",
              padding: "8px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🎯 Predictions
          </button>
        </div>
      </header>
      
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {activeTab === "matches" && <MatchList />}
        {activeTab === "standings" && <GroupStandings />}
        {activeTab === "predictions" && <Predictions />}
      </main>
    </div>
  );
}

export default App;