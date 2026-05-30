import { matches } from "../data/matches";
import type { Match } from "../data/matches";

function MatchList() {
  const upcomingMatches = matches.filter(m => m.status === "upcoming");
  const finishedMatches = matches.filter(m => m.status === "finished");

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📅 Upcoming Matches</h2>
      {upcomingMatches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
      
      <h2 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "16px" }}>✅ Finished Matches</h2>
      {finishedMatches.length > 0 ? (
        finishedMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))
      ) : (
        <p style={{ color: "#666" }}>No finished matches yet</p>
      )}
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ fontWeight: "bold", color: "#666", fontSize: "14px" }}>
        Group {match.group}
      </div>
      <div style={{ fontSize: "18px", fontWeight: "500", margin: "8px 0" }}>
        {match.homeTeam} vs {match.awayTeam}
      </div>
      <div style={{ color: "#888", fontSize: "14px" }}>
        📅 {match.date} • ⏰ {match.time}
      </div>
      {match.status === "finished" && match.homeScore !== null && (
        <div style={{ 
          fontSize: "20px", 
          fontWeight: "bold", 
          marginTop: "8px",
          color: "#166534"
        }}>
          Final Score: {match.homeScore} - {match.awayScore}
        </div>
      )}
    </div>
  );
}

export default MatchList;