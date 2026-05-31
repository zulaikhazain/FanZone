import { useState } from "react";
import type { Match } from "../data/matches";

interface MatchDetailsModalProps {
  match: Match | null;
  onClose: () => void;
}

function MatchDetailsModal({ match, onClose }: MatchDetailsModalProps) {
  if (!match) return null;

  // Sample goal scorers data 
  const getGoalScorers = () => {
    if (match.id === 11) { // Portugal vs DR Congo (2-0)
      return {
        home: ["Ronaldo (23')", "Fernandes (67')"],
        away: []
      };
    }
    if (match.id === 12) { // England vs Croatia (1-1)
      return {
        home: ["Kane (45+2')"],
        away: ["Modric (78')"]
      };
    }
    return { home: [], away: [] };
  };

  const getManOfTheMatch = () => {
    if (match.id === 11) return "Cristiano Ronaldo (Portugal)";
    if (match.id === 12) return "Luka Modric (Croatia)";
    return "TBD";
  };

  // Get highlight video URL for finished matches
  const getHighlightUrl = () => {

    if (match.id === 11) {
      return "https://www.youtube.com/embed/thZaul9APqI?si=7M_1LJhYGmr36uEm"; 
    }
    if (match.id === 12) {
      return "https://www.youtube.com/embed/o-uDViF7qkk?si=m06DfiyK73SV9jCY";
    }
    return null;
  };

  const scorers = getGoalScorers();
  const manOfTheMatch = getManOfTheMatch();
  const highlightUrl = getHighlightUrl();
  const [showHighlights, setShowHighlights] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "24px",
          position: "relative",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666"
          }}
        >
          ✕
        </button>

        {/* Match Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", color: "#000000", margin: "0 0 8px 0" }}>
            {match.homeTeam} vs {match.awayTeam}
          </h2>
          <p style={{ color: "#000000", margin: "4px 0" }}>
            📅 {match.date} • ⏰ {match.time}
          </p>
          <p style={{ color: "#000000", margin: "4px 0" }}>
            Group {match.group} • {match.day}
          </p>
          
          {match.status === "finished" && match.homeScore !== null && (
            <div>
              {/* Final Score */}
              <p style={{ 
                fontSize: "48px", 
                fontWeight: "bold", 
                color: "#166534", 
                margin: "16px 0 8px 0",
                letterSpacing: "4px"
              }}>
                {match.homeScore} - {match.awayScore}
              </p>
              
              {/* Goal Scorers Section */}
              {(scorers.home.length > 0 || scorers.away.length > 0) && (
                <div style={{ 
                  marginTop: "8px", 
                  textAlign: "center", 
                  backgroundColor: "#f8fafc", 
                  padding: "12px 16px", 
                  borderRadius: "8px",
                  display: "inline-block",
                  width: "100%"
                }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "bold", color: "#1e3a8a", marginBottom: "8px" }}>
                    ⚽ Goal Scorers
                  </h4>
                  {scorers.home.length > 0 && (
                    <div style={{ marginBottom: "4px" }}>
                      <strong style={{ color: "#d97706" }}>{match.homeTeam}:</strong>{' '}
                      {scorers.home.map((scorer, idx) => (
                        <span key={idx} style={{ color: "#000000" }}>{scorer}{idx < scorers.home.length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                  )}
                  {scorers.away.length > 0 && (
                    <div>
                      <strong style={{ color: "#0284c7" }}>{match.awayTeam}:</strong>{' '}
                      {scorers.away.map((scorer, idx) => (
                        <span key={idx} style={{ color: "#000000" }}>{scorer}{idx < scorers.away.length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Man of the Match Section */}
              {manOfTheMatch !== "TBD" && (
                <div style={{ 
                  marginTop: "16px", 
                  textAlign: "center", 
                  backgroundColor: "#fef3c7", 
                  padding: "10px 16px", 
                  borderRadius: "8px" 
                }}>
                  <span style={{ fontSize: "20px", marginRight: "8px" }}>🏆</span>
                  <strong style={{ color: "#78350f" }}>Man of the Match:</strong>{' '}
                  <span style={{ color: "#000000", fontWeight: "500" }}>{manOfTheMatch}</span>
                </div>
              )}

              {/* Watch Highlights Button */}
              {highlightUrl && (
                <div style={{ marginTop: "20px" }}>
                  {!showHighlights ? (
                    <button
                      onClick={() => setShowHighlights(true)}
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        width: "100%",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#b91c1c";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                      }}
                    >
                      <span>▶</span> Watch Game Highlights
                    </button>
                  ) : (
                    <div style={{ marginTop: "12px" }}>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        marginBottom: "8px"
                      }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e3a8a", margin: 0 }}>
                          🎥 Match Highlights
                        </h4>
                        <button
                          onClick={() => setShowHighlights(false)}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "#666"
                          }}
                        >
                          ✕
                        </button>
                      </div>
                      <iframe
                        width="100%"
                        height="200"
                        src={highlightUrl}
                        title="Match Highlights"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: "8px" }}
                      ></iframe>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stadium Info */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#1e3a8a", borderBottom: "2px solid #eab308", paddingBottom: "4px" }}>
            🏟️ Stadium & Venue
          </h3>
          <p style={{ color: "#000000" }}><strong>Stadium:</strong> {match.stadium}</p>
          <p style={{ color: "#000000" }}><strong>City:</strong> {match.city}</p>
          <p style={{ color: "#000000" }}><strong>Referee:</strong> {match.referee}</p>
          <p style={{ color: "#000000" }}><strong>Weather:</strong> {match.weather}, {match.temperature}</p>
        </div>

        {/* Lineups */}
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#1e3a8a", borderBottom: "2px solid #eab308", paddingBottom: "4px" }}>
            ⚽ Starting Lineups
          </h3>
          
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "16px", marginBottom: "8px", color: "#d97706" }}>{match.homeTeam}</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {match.homeLineup.map((player, idx) => (
                <span key={idx} style={{ backgroundColor: "#f3f4f6", color: "#000000", padding: "4px 12px", borderRadius: "20px", fontSize: "14px" }}>
                  {player}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: "16px", marginBottom: "8px", color: "#0284c7" }}>{match.awayTeam}</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {match.awayLineup.map((player, idx) => (
                <span key={idx} style={{ backgroundColor: "#f3f4f6", color: "#000000", padding: "4px 12px", borderRadius: "20px", fontSize: "14px" }}>
                  {player}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetailsModal;