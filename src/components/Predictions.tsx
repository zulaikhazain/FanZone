import { useState, useEffect } from "react";
import { matches } from "../data/matches";

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

interface VoteStats {
  home: number;
  draw: number;
  away: number;
  total: number;
}

// Get current user with sample data
const getCurrentUser = (): User => {
  return {
    name: "You",
    points: 6,
    predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 },
      { matchId: 1, prediction: "home", pointsEarned: 0 },
      { matchId: 2, prediction: "away", pointsEarned: 0 },
      { matchId: 3, prediction: "home", pointsEarned: 0 },
    ]
  };
};

const saveUser = (user: User) => {
  localStorage.setItem("fanzone_user", JSON.stringify(user));
};

// Get all users with sample data
const getAllUsers = (): User[] => {
  return [
    { name: "Zulaikha", points: 6, predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 }
    ]},
    { name: "Ahmad", points: 0, predictions: [
      { matchId: 11, prediction: "draw", pointsEarned: 0 },
      { matchId: 12, prediction: "home", pointsEarned: 0 }
    ]},
    { name: "Sarah", points: 3, predictions: [
      { matchId: 11, prediction: "away", pointsEarned: 0 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 }
    ]},
    { name: "Kevin", points: 3, predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "away", pointsEarned: 0 }
    ]},
    { name: "Lisa", points: 3, predictions: [
      { matchId: 11, prediction: "draw", pointsEarned: 0 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 }
    ]},
    { name: "Miguel", points: 3, predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "away", pointsEarned: 0 }
    ]},
    { name: "Emma", points: 0, predictions: [
      { matchId: 11, prediction: "away", pointsEarned: 0 },
      { matchId: 12, prediction: "home", pointsEarned: 0 }
    ]},
    { name: "David", points: 6, predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 }
    ]},
    { name: "Sofia", points: 3, predictions: [
      { matchId: 11, prediction: "draw", pointsEarned: 0 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 }
    ]},
    { name: "Lucas", points: 3, predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "home", pointsEarned: 0 }
    ]},
    { name: "Olivia", points: 0, predictions: [
      { matchId: 11, prediction: "away", pointsEarned: 0 },
      { matchId: 12, prediction: "home", pointsEarned: 0 }
    ]},
    { name: "Daniel", points: 6, predictions: [
      { matchId: 11, prediction: "home", pointsEarned: 3 },
      { matchId: 12, prediction: "draw", pointsEarned: 3 }
    ]},
    { name: "Nurul", points: 0, predictions: [
      { matchId: 11, prediction: "draw", pointsEarned: 0 },
      { matchId: 12, prediction: "away", pointsEarned: 0 }
    ]},
    { name: "Hakim", points: 0, predictions: [
      { matchId: 11, prediction: "away", pointsEarned: 0 },
      { matchId: 12, prediction: "home", pointsEarned: 0 }
    ]},
  ];
};

const saveAllUsers = (users: User[]) => {
  localStorage.setItem("fanzone_all_users", JSON.stringify(users));
};

// Flag image URLs
const getFlagUrl = (country: string): string => {
  const countryCodes: Record<string, string> = {
    "Portugal": "pt",
    "Denmark": "dk",
    "England": "gb-eng",
    "Croatia": "hr",
    "Mexico": "mx",
    "South Africa": "za",
    "South Korea": "kr",
    "Czechia": "cz",
    "Canada": "ca",
    "Bosnia and Herzegovina": "ba",
    "Qatar": "qa",
    "Switzerland": "ch",
    "Brazil": "br",
    "Morocco": "ma",
    "Haiti": "ht",
    "Scotland": "gb-sct",
    "USA": "us",
    "Paraguay": "py",
    "Australia": "au",
    "Turkiye": "tr",
    "Germany": "de",
    "Curacao": "cw",
    "Ivory Coast": "ci",
    "Ecuador": "ec",
    "Netherlands": "nl",
    "Japan": "jp",
    "Sweden": "se",
    "Tunisia": "tn",
    "Belgium": "be",
    "Egypt": "eg",
    "Iran": "ir",
    "New Zealand": "nz",
    "Spain": "es",
    "Cape Verde": "cv",
    "Saudi Arabia": "sa",
    "Uruguay": "uy",
    "France": "fr",
    "Senegal": "sn",
    "Iraq": "iq",
    "Norway": "no",
    "Argentina": "ar",
    "Algeria": "dz",
    "Austria": "at",
    "Jordan": "jo",
    "Uzbekistan": "uz",
    "Colombia": "co",
    "Ghana": "gh",
    "Panama": "pa",
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
  const [voteStats, setVoteStats] = useState<Record<number, VoteStats>>({});

  // Calculate vote statistics for each match
  useEffect(() => {
    const stats: Record<number, VoteStats> = {};
    
    allUsers.forEach(u => {
      u.predictions.forEach(pred => {
        if (!stats[pred.matchId]) {
          stats[pred.matchId] = { home: 0, draw: 0, away: 0, total: 0 };
        }
        if (pred.prediction === "home") stats[pred.matchId].home++;
        if (pred.prediction === "draw") stats[pred.matchId].draw++;
        if (pred.prediction === "away") stats[pred.matchId].away++;
        stats[pred.matchId].total++;
      });
    });
    
    setVoteStats(stats);
  }, [allUsers]);

  // Get vote counts for Portugal vs Denmark (match id: 11)
  const portugalVotes = voteStats[11]?.home || 0;
  const denmarkVotes = voteStats[11]?.away || 0;
  const drawVotesPortugal = voteStats[11]?.draw || 0;
  const totalVotesPortugal = voteStats[11]?.total || 0;

  // Get vote counts for England vs Croatia (match id: 12)
  const englandVotes = voteStats[12]?.home || 0;
  const croatiaVotes = voteStats[12]?.away || 0;
  const drawVotesEngland = voteStats[12]?.draw || 0;
  const totalVotesEngland = voteStats[12]?.total || 0;

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

  // Get user's prediction for a match
  const getPredictionValue = (matchId: number): string => {
    const pred = user.predictions.find(p => p.matchId === matchId);
    if (!pred) return "";
    return pred.prediction;
  };

  // Update user name
  const updateUserName = () => {
    if (tempName.trim()) {
      const updatedUser = { ...user, name: tempName.trim() };
      setUser(updatedUser);
      saveUser(updatedUser);
      setShowNameModal(false);
    }
  };

  // Leaderboard sorted by points
  const leaderboard = [...allUsers, user].filter((u, index, self) => 
    self.findIndex(t => t.name === u.name) === index
  ).sort((a, b) => b.points - a.points);

  // Get vote percentages for upcoming matches
  const getVotePercentage = (matchId: number, type: "home" | "draw" | "away"): number => {
    const stats = voteStats[matchId];
    if (!stats || stats.total === 0) return 0;
    if (type === "home") return (stats.home / stats.total) * 100;
    if (type === "draw") return (stats.draw / stats.total) * 100;
    return (stats.away / stats.total) * 100;
  };

  const getTotalVotes = (matchId: number): number => {
    return voteStats[matchId]?.total || 0;
  };

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
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "400px",
            width: "90%",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}>Enter Your Name</h3>
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
                marginBottom: "16px",
                boxSizing: "border-box"
              }}
              onKeyPress={(e) => e.key === "Enter" && updateUserName()}
              autoFocus
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
            <div style={{fontSize: "12px", color: "#d97706", fontWeight: "500" }}>⭐ Hello, {user.name}!</div>
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
          {/* Finished Match 1: Portugal vs Denmark */}
          <div style={{
            backgroundColor: "#dcfce7",
            border: "2px solid #16a34a",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "20px", marginRight: "8px" }}>✅</span>
              <span style={{ fontWeight: "bold", color: "#16a34a" }}>Match Result: Portugal vs Denmark (2-0)</span>
            </div>
            
            <div style={{ 
              marginTop: "12px", 
              padding: "12px", 
              backgroundColor: "white", 
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
                📊 Fan Predictions for this match
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <img src={getFlagUrl("Portugal")} alt="Portugal" style={{ width: "32px", height: "24px", objectFit: "cover" }} />
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>{portugalVotes}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>voted Portugal win</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "28px" }}>🤝</span>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#d97706" }}>{drawVotesPortugal}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>voted Draw</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img src={getFlagUrl("Denmark")} alt="Denmark" style={{ width: "32px", height: "24px", objectFit: "cover" }} />
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#dc2626" }}>{denmarkVotes}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>voted Denmark win</div>
                </div>
              </div>
              <div style={{ fontSize: "11px", color: "#666", marginTop: "8px" }}>
                Total {totalVotesPortugal} fans participated
              </div>
            </div>
          </div>

          {/* Finished Match 2: England vs Croatia (1-1 DRAW) */}
          <div style={{
            backgroundColor: "#fef3c7",
            border: "2px solid #d97706",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "20px", marginRight: "8px" }}>🤝</span>
              <span style={{ fontWeight: "bold", color: "#d97706" }}>Match Result: England vs Croatia (1-1) - DRAW</span>
            </div>
            
            <div style={{ 
              marginTop: "12px", 
              padding: "12px", 
              backgroundColor: "white", 
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
                📊 Fan Predictions for this match
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <img src={getFlagUrl("England")} alt="England" style={{ width: "32px", height: "24px", objectFit: "cover" }} />
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>{englandVotes}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>voted England win</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "28px" }}>🤝</span>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#d97706" }}>{drawVotesEngland}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>voted Draw</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <img src={getFlagUrl("Croatia")} alt="Croatia" style={{ width: "32px", height: "24px", objectFit: "cover" }} />
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#dc2626" }}>{croatiaVotes}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>voted Croatia win</div>
                </div>
              </div>
              <div style={{ fontSize: "11px", color: "#666", marginTop: "8px" }}>
                Total {totalVotesEngland} fans participated
              </div>
            </div>

            <div style={{ fontSize: "14px", color: "#92400e", marginTop: "12px" }}>
              Match ended in a draw! {user.predictions.find(p => p.matchId === 12)?.prediction === "draw" ? "🎉 You predicted correctly and earned 3 points!" : "Better luck next time!"}
            </div>
          </div>

          {upcomingMatches.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
              <p>No upcoming matches available for predictions.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {upcomingMatches.map(match => {
                const homePercentage = getVotePercentage(match.id, "home");
                const drawPercentage = getVotePercentage(match.id, "draw");
                const awayPercentage = getVotePercentage(match.id, "away");
                const totalVotes = getTotalVotes(match.id);
                
                return (
                  <div
                    key={match.id}
                    style={{
                      backgroundColor: "white",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "16px",
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
                            style={{ width: "28px", height: "20px", objectFit: "cover", borderRadius: "2px" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                          <span style={{color: "#000000"}}>{match.homeTeam}</span>
                          <span style={{ color: "#000000" }}>vs</span>
                          <img 
                            src={getFlagUrl(match.awayTeam)} 
                            alt={match.awayTeam}
                            style={{ width: "28px", height: "20px", objectFit: "cover", borderRadius: "2px" }}
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
                            color: "#1e3a8a",
                            marginBottom: "12px"
                          }}
                        >
                          <option value="" style={{color: "#9ca3af"}}>⚡ Pick winner</option>
                          <option value="home" style={{color: "#16a34a"}}>🏠 {match.homeTeam} wins</option>
                          <option value="draw" style={{color: "#d97706"}}>🤝 Draw</option>
                          <option value="away" style={{color: "#dc2626"}}>✈️ {match.awayTeam} wins</option>
                        </select>
                        
                        {getPredictionValue(match.id) && (
                          <div style={{ marginTop: "8px" }}>
                            <div style={{ fontSize: "11px", color: "#666", marginBottom: "4px", textAlign: "center" }}>
                              👥 {totalVotes} fan{totalVotes !== 1 ? 's' : ''} voted
                            </div>
                            <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "4px" }}>
                              <div style={{ width: `${homePercentage}%`, backgroundColor: "#16a34a", transition: "width 0.3s" }} />
                              <div style={{ width: `${drawPercentage}%`, backgroundColor: "#d97706", transition: "width 0.3s" }} />
                              <div style={{ width: `${awayPercentage}%`, backgroundColor: "#dc2626", transition: "width 0.3s" }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                              <span style={{ color: "#16a34a" }}>🏠 {Math.round(homePercentage)}%</span>
                              <span style={{ color: "#d97706" }}>🤝 {Math.round(drawPercentage)}%</span>
                              <span style={{ color: "#dc2626" }}>✈️ {Math.round(awayPercentage)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div style={{ marginTop: "20px", padding: "12px", backgroundColor: "#f3f4f6", borderRadius: "8px", fontSize: "12px", color: "#666", textAlign: "center" }}>
            💡 Each correct prediction earns you <strong>3 points</strong>. The colored bar shows what other fans are predicting!
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
              {leaderboard.slice(0, 14).map((player, idx) => (
                <tr key={player.name} style={{ 
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: player.name === user.name ? "#fef3c7" : (idx % 2 === 0 ? "#ffffff" : "#f9fafb")
                }}>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold" }}>
                    {idx === 0 ? "🏆" : idx + 1}
                  </td>
                  <td style={{ 
                    padding: "12px", 
                    fontWeight: player.name === user.name ? "bold" : "normal",
                    color: player.name === user.name ? "#d97706" : "#000000"
                  }}>
                    {player.name} {player.name === user.name && "(You)"}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#1e3a8a" }}>
                    {player.points}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#000000" }}>
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