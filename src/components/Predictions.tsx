import { useState, useEffect } from "react";
import { matches, type Match } from "../data/matches";

interface Prediction {
  matchId: number;
  prediction: "home" | "draw" | "away";
  pointsEarned: number;
}

interface User {
  name: string;
  points: number;
  predictions: Prediction[];
}

// Get current user from localStorage or create new
const getCurrentUser = (): User => {
  const saved = localStorage.getItem("fanzone_user");
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    name: "You",
    points: 0,
    predictions: []
  };
};

const saveUser = (user: User) => {
  localStorage.setItem("fanzone_user", JSON.stringify(user));
};

// Get all users from localStorage
const getAllUsers = (): User[] => {
  const saved = localStorage.getItem("fanzone_all_users");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

const saveAllUsers = (users: User[]) => {
  localStorage.setItem("fanzone_all_users", JSON.stringify(users));
};

// Flag image URLs using CDN
const getFlagUrl = (country: string): string => {
  const countryCodes: Record<string, string> = {
    "Mexico": "mx", "South Africa": "za", "South Korea": "kr", "Czechia": "cz",
    "Canada": "ca", "Bosnia and Herzegovina": "ba", "Qatar": "qa", "Switzerland": "ch",
    "Brazil": "br", "Morocco": "ma", "Haiti": "ht", "Scotland": "gb-sct",
    "USA": "us", "Paraguay": "py", "Australia": "au", "Turkiye": "tr",
    "Germany": "de", "Curacao": "cw", "Ivory Coast": "ci", "Ecuador": "ec",
    "Netherlands": "nl", "Japan": "jp", "Sweden": "se", "Tunisia": "tn",
    "Belgium": "be", "Egypt": "eg", "Iran": "ir", "New Zealand": "nz",
    "Spain": "es", "Cape Verde": "cv", "Saudi Arabia": "sa", "Uruguay": "uy",
    "France": "fr", "Senegal": "sn", "Iraq": "iq", "Norway": "no",
    "Argentina": "ar", "Algeria": "dz", "Austria": "at", "Jordan": "jo",
    "Portugal": "pt", "Denmark": "dk", "Uzbekistan": "uz", "Colombia": "co",
    "England": "gb-eng", "Croatia": "hr", "Ghana": "gh", "Panama": "pa",
  };
  const code = countryCodes[country] || "un";
  return `https://flagicons.lipis.dev/flags/4x3/${code}.svg`;
};

function Predictions() {
  const [user, setUser] = useState<User>(getCurrentUser());
  const [allUsers, setAllUsers] = useState<User[]>(getAllUsers());
  const [showNameModal, setShowNameModal] = useState(user.name === "You");
  const [tempName, setTempName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  // Removed unused selectedMatch state

  // Get upcoming matches
  const upcomingMatches = matches.filter(m => m.status === "upcoming");

  // Get finished matches to calculate points
  const finishedMatches = matches.filter(m => m.status === "finished" && m.homeScore !== null && m.awayScore !== null);

  // Calculate points for predictions
  useEffect(() => {
    let updatedUser = { ...user };
    let pointsEarned = 0;

    finishedMatches.forEach(match => {
      const existingPrediction = updatedUser.predictions.find(p => p.matchId === match.id);
      
      if (existingPrediction && existingPrediction.pointsEarned === 0) {
        let isCorrect = false;
        
        const homeScore = match.homeScore ?? 0;
        const awayScore = match.awayScore ?? 0;
        
        if (homeScore > awayScore && existingPrediction.prediction === "home") {
          isCorrect = true;
        } else if (awayScore > homeScore && existingPrediction.prediction === "away") {
          isCorrect = true;
        } else if (homeScore === awayScore && existingPrediction.prediction === "draw") {
          isCorrect = true;
        }
        
        if (isCorrect) {
          existingPrediction.pointsEarned = 3;
          pointsEarned += 3;
        }
      }
    });

    if (pointsEarned > 0) {
      updatedUser.points += pointsEarned;
      setUser(updatedUser);
      saveUser(updatedUser);
      
      const updatedAllUsers = allUsers.map(u => 
        u.name === updatedUser.name ? updatedUser : u
      );
      setAllUsers(updatedAllUsers);
      saveAllUsers(updatedAllUsers);
    }
  }, [finishedMatches]);

  // Save prediction
  const savePrediction = (matchId: number, prediction: "home" | "draw" | "away") => {
    const existingIndex = user.predictions.findIndex(p => p.matchId === matchId);
    let updatedPredictions = [...user.predictions];
    
    if (existingIndex >= 0) {
      updatedPredictions[existingIndex] = { matchId, prediction, pointsEarned: 0 };
    } else {
      updatedPredictions.push({ matchId, prediction, pointsEarned: 0 });
    }
    
    const updatedUser = { ...user, predictions: updatedPredictions };
    setUser(updatedUser);
    saveUser(updatedUser);
    
    const updatedAllUsers = allUsers.map(u => 
      u.name === updatedUser.name ? updatedUser : u
    );
    setAllUsers(updatedAllUsers);
    saveAllUsers(updatedAllUsers);
  };

  // Get user's prediction for a match - Returns the value that matches option values
  const getPredictionValue = (matchId: number): string => {
    const pred = user.predictions.find(p => p.matchId === matchId);
    if (!pred) return "";
    return pred.prediction;
  };

  // Update user name
  const updateUserName = () => {
    if (tempName.trim()) {
      const filteredUsers = allUsers.filter(u => u.name !== user.name);
      
      const updatedUser = { ...user, name: tempName.trim() };
      setUser(updatedUser);
      saveUser(updatedUser);
      
      const existingUser = filteredUsers.find(u => u.name === updatedUser.name);
      if (existingUser) {
        const mergedPredictions = [...existingUser.predictions];
        updatedUser.predictions.forEach(newPred => {
          const existing = mergedPredictions.find(p => p.matchId === newPred.matchId);
          if (!existing) {
            mergedPredictions.push(newPred);
          }
        });
        updatedUser.predictions = mergedPredictions;
        updatedUser.points = existingUser.points + updatedUser.points;
      }
      
      const newAllUsers = [...filteredUsers.filter(u => u.name !== updatedUser.name), updatedUser];
      setAllUsers(newAllUsers);
      saveAllUsers(newAllUsers);
      saveUser(updatedUser);
      
      setShowNameModal(false);
    }
  };

  // Leaderboard sorted by points
  const leaderboard = [...allUsers, user].filter((u, index, self) => 
    self.findIndex(t => t.name === u.name) === index
  ).sort((a, b) => b.points - a.points);

  return (
    <div style={{ padding: "20px" }}>
      {/* Name Modal */}
      {showNameModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "400px",
            width: "90%"
          }}>
            <h3 style={{ marginBottom: "16px" }}>Enter Your Name</h3>
            <input
              type="text"
              placeholder="Your name..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "2px solid #d97706",
                borderRadius: "8px",
                marginBottom: "16px"
              }}
              onKeyPress={(e) => e.key === "Enter" && updateUserName()}
            />
            <button
              onClick={updateUserName}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Start Playing
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        backgroundColor: "#fef3c7",
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "2px solid #d97706"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2 style={{ margin: 0, color: "#000000" }}>🎯 Match Predictions</h2>
            <p style={{ margin: "5px 0 0 0", color: "#000000", fontSize: "13px" }}>Predict winners and earn points!</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1e3a8a" }}>
              {user.points} pts
            </div>
            <div style={{fontSize: "12px", color: "#000000" }}>Hello, {user.name}!</div>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setShowLeaderboard(false)}
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: !showLeaderboard ? "#1e3a8a" : "#f3f4f6",
            color: !showLeaderboard ? "white" : "#374151",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          📋 Make Predictions
        </button>
        <button
          onClick={() => setShowLeaderboard(true)}
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: showLeaderboard ? "#1e3a8a" : "#f3f4f6",
            color: showLeaderboard ? "white" : "#374151",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Predictions View */}
      {!showLeaderboard && (
        <>
          {upcomingMatches.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
              <p>No upcoming matches available for predictions.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {upcomingMatches.map(match => (
                <div
                  key={match.id}
                  style={{
                    backgroundColor: "white",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontSize: "12px", color: "#000000", marginBottom: "4px" }}>
                        Group {match.group} • {match.date}
                      </div>
                      <div style={{ color: "#000000", fontSize: "18px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <img 
                          src={getFlagUrl(match.homeTeam)} 
                          alt={match.homeTeam}
                          style={{ width: "24px", height: "18px", objectFit: "cover", borderRadius: "2px" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span style={{color: "#000000"}}>{match.homeTeam}</span>
                        <span style={{ color: "#000000" }}>vs</span>
                        <img 
                          src={getFlagUrl(match.awayTeam)} 
                          alt={match.awayTeam}
                          style={{ width: "24px", height: "18px", objectFit: "cover", borderRadius: "2px" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span style={{ color: "#000000"}}>{match.awayTeam}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#000000", marginTop: "4px" }}>
                        ⏰ {match.time}
                      </div>
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <select
                        value={getPredictionValue(match.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          const value = e.target.value;
                          if (value === "home") savePrediction(match.id, "home");
                          else if (value === "draw") savePrediction(match.id, "draw");
                          else if (value === "away") savePrediction(match.id, "away");
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: "100%",
                          padding: "8px",
                          fontSize: "14px",
                          border: getPredictionValue(match.id) ? "2px solid #16a34a" : "2px solid #d97706",
                          borderRadius: "8px",
                          backgroundColor: getPredictionValue(match.id) ? "#dcfce7" : "white",
                          cursor: "pointer",
                          color: "#1e3a8a"
                        }}
                      >
                        <option value="" style={{color: "#9ca3af"}}>⚡ Pick winner</option>
                        <option value="home" style={{color: "#16a34a"}}>🏠 {match.homeTeam} wins</option>
                        <option value="draw" style={{color: "#d97706"}}>🤝 Draw</option>
                        <option value="away" style={{color: "#dc2626"}}>✈️ {match.awayTeam} wins</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ marginTop: "20px", padding: "12px", backgroundColor: "#f3f4f6", borderRadius: "8px", fontSize: "12px", color: "#666", textAlign: "center" }}>
            💡 Each correct prediction earns you <strong>3 points</strong>. Click on any match to see details!
          </div>
        </>
      )}

      {/* Leaderboard View */}
      {showLeaderboard && (
        <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1e3a8a", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "center" }}>Rank</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Player</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Points</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Predictions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(0, 10).map((player, idx) => (
                <tr key={player.name} style={{ 
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: player.name === user.name ? "#fef3c7" : (idx % 2 === 0 ? "#ffffff" : "#f9fafb")
                }}>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold" }}>
                    {idx === 0 ? "🏆" : idx + 1}
                  </td>
                  <td style={{ padding: "12px", fontWeight: player.name === user.name ? "bold" : "normal" }}>
                    {player.name} {player.name === user.name && "(You)"}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#1e3a8a" }}>
                    {player.points}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {player.predictions.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Predictions;