import { useState } from "react";
import { matches } from "../data/matches";

interface TeamStats {
  name: string;
  group: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// Define all 4 teams for each group
const groupTeams: Record<string, string[]> = {
  "A": ["Mexico", "South Africa", "South Korea", "Czechia"],
  "B": ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  "C": ["Brazil", "Morocco", "Haiti", "Scotland"],
  "D": ["USA", "Paraguay", "Australia", "Turkiye"],
  "E": ["Germany", "Curacao", "Ivory Coast", "Ecuador"],
  "F": ["Netherlands", "Japan", "Sweden", "Tunisia"],
  "G": ["Belgium", "Egypt", "Iran", "New Zealand"],
  "H": ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  "I": ["France", "Senegal", "Iraq", "Norway"],
  "J": ["Argentina", "Algeria", "Austria", "Jordan"],
  "K": ["Portugal", "Denmark", "Uzbekistan", "Colombia"],
  "L": ["England", "Croatia", "Ghana", "Panama"],
};

// Flag image URLs using CDN
const getFlagUrl = (country: string): string => {
  const countryCodes: Record<string, string> = {
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
    "Portugal": "pt",
    "Denmark": "dk",
    "Uzbekistan": "uz",
    "Colombia": "co",
    "England": "gb-eng",
    "Croatia": "hr",
    "Ghana": "gh",
    "Panama": "pa",
  };
  const code = countryCodes[country] || "un";
  return `https://flagicons.lipis.dev/flags/4x3/${code}.svg`;
};

function calculateStandings(): Record<string, TeamStats[]> {
  const teams: Record<string, Record<string, TeamStats>> = {};
  
  Object.keys(groupTeams).forEach(group => {
    teams[group] = {};
    groupTeams[group].forEach(teamName => {
      teams[group][teamName] = {
        name: teamName,
        group: group,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    });
  });

  matches.forEach(match => {
    if (match.status === "finished" && match.homeScore !== null && match.awayScore !== null) {
      if (teams[match.group] && teams[match.group][match.homeTeam] && teams[match.group][match.awayTeam]) {
        const homeStats = teams[match.group][match.homeTeam];
        const awayStats = teams[match.group][match.awayTeam];
        
        homeStats.played++;
        awayStats.played++;
        
        homeStats.goalsFor += match.homeScore;
        homeStats.goalsAgainst += match.awayScore;
        awayStats.goalsFor += match.awayScore;
        awayStats.goalsAgainst += match.homeScore;
        
        if (match.homeScore > match.awayScore) {
          homeStats.wins++;
          homeStats.points += 3;
          awayStats.losses++;
        } else if (match.awayScore > match.homeScore) {
          awayStats.wins++;
          awayStats.points += 3;
          homeStats.losses++;
        } else {
          homeStats.draws++;
          homeStats.points += 1;
          awayStats.draws++;
          awayStats.points += 1;
        }
        
        homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst;
        awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst;
      }
    }
  });

  const result: Record<string, TeamStats[]> = {};
  Object.keys(teams).forEach(group => {
    result[group] = Object.values(teams[group]).sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  });
  
  return result;
}

const groupNames: Record<string, string> = {
  "A": "Group A", "B": "Group B", "C": "Group C", "D": "Group D",
  "E": "Group E", "F": "Group F", "G": "Group G", "H": "Group H",
  "I": "Group I", "J": "Group J", "K": "Group K", "L": "Group L",
};

function GroupStandings() {
  const [selectedGroup, setSelectedGroup] = useState<string>("A");
  const standings = calculateStandings();
  const groups = Object.keys(standings).sort();

  // If no standings data yet, show loading
  if (!standings || Object.keys(standings).length === 0) {
    return <div style={{ padding: "20px" }}>Loading standings...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Time Zone Note */}
      <div style={{
        backgroundColor: "#fef3c7",
        padding: "8px 12px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "12px",
        color: "#78350f",
        textAlign: "center",
        border: "2px solid #d97706"
      }}>
        🏆 Group standings updated based on finished matches • MYT
      </div>

      {/* Dropdown team selector */}
      <div style={{ marginBottom: "20px" }}>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue) {
              const [, teamGroup] = selectedValue.split("|");
              setSelectedGroup(teamGroup);
            }
          }}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "16px",
            border: "2px solid #d97706",
            borderRadius: "8px",
            backgroundColor: "white",
            cursor: "pointer",
            outline: "none",
            color: "#000000"
          }}
          defaultValue=""
        >
          <option value="" disabled style={{ color: "#9ca3af" }}>
            📋 Jump to a team...
          </option>
          
          <optgroup label="——— Group A ———" style={{ color: "#d97706", fontWeight: "bold" }}>
            <option value="Mexico|A">Mexico</option>
            <option value="South Africa|A">South Africa</option>
            <option value="South Korea|A">South Korea</option>
            <option value="Czechia|A">Czechia</option>
          </optgroup>
          
          <optgroup label="——— Group B ———" style={{ color: "#0284c7", fontWeight: "bold" }}>
            <option value="Canada|B">Canada</option>
            <option value="Bosnia and Herzegovina|B">Bosnia and Herzegovina</option>
            <option value="Qatar|B">Qatar</option>
            <option value="Switzerland|B">Switzerland</option>
          </optgroup>
          
          <optgroup label="——— Group C ———" style={{ color: "#16a34a", fontWeight: "bold" }}>
            <option value="Brazil|C">Brazil</option>
            <option value="Morocco|C">Morocco</option>
            <option value="Haiti|C">Haiti</option>
            <option value="Scotland|C">Scotland</option>
          </optgroup>
          
          <optgroup label="——— Group D ———" style={{ color: "#dc2626", fontWeight: "bold" }}>
            <option value="USA|D">USA</option>
            <option value="Paraguay|D">Paraguay</option>
            <option value="Australia|D">Australia</option>
            <option value="Turkiye|D">Turkiye</option>
          </optgroup>
          
          <optgroup label="——— Group E ———" style={{ color: "#9333ea", fontWeight: "bold" }}>
            <option value="Germany|E">Germany</option>
            <option value="Curacao|E">Curacao</option>
            <option value="Ivory Coast|E">Ivory Coast</option>
            <option value="Ecuador|E">Ecuador</option>
          </optgroup>
          
          <optgroup label="——— Group F ———" style={{ color: "#ea580c", fontWeight: "bold" }}>
            <option value="Netherlands|F">Netherlands</option>
            <option value="Japan|F">Japan</option>
            <option value="Sweden|F">Sweden</option>
            <option value="Tunisia|F">Tunisia</option>
          </optgroup>
          
          <optgroup label="——— Group G ———" style={{ color: "#0891b2", fontWeight: "bold" }}>
            <option value="Belgium|G">Belgium</option>
            <option value="Egypt|G">Egypt</option>
            <option value="Iran|G">Iran</option>
            <option value="New Zealand|G">New Zealand</option>
          </optgroup>
          
          <optgroup label="——— Group H ———" style={{ color: "#db2777", fontWeight: "bold" }}>
            <option value="Spain|H">Spain</option>
            <option value="Cape Verde|H">Cape Verde</option>
            <option value="Saudi Arabia|H">Saudi Arabia</option>
            <option value="Uruguay|H">Uruguay</option>
          </optgroup>
          
          <optgroup label="——— Group I ———" style={{ color: "#4f46e5", fontWeight: "bold" }}>
            <option value="France|I">France</option>
            <option value="Senegal|I">Senegal</option>
            <option value="Iraq|I">Iraq</option>
            <option value="Norway|I">Norway</option>
          </optgroup>
          
          <optgroup label="——— Group J ———" style={{ color: "#ea580c", fontWeight: "bold" }}>
            <option value="Argentina|J">Argentina</option>
            <option value="Algeria|J">Algeria</option>
            <option value="Austria|J">Austria</option>
            <option value="Jordan|J">Jordan</option>
          </optgroup>
          
          <optgroup label="——— Group K ———" style={{ color: "#059669", fontWeight: "bold" }}>
            <option value="Portugal|K">Portugal</option>
            <option value="Denmark|K">Denmark</option>
            <option value="Uzbekistan|K">Uzbekistan</option>
            <option value="Colombia|K">Colombia</option>
          </optgroup>
          
          <optgroup label="——— Group L ———" style={{ color: "#ca8a04", fontWeight: "bold" }}>
            <option value="England|L">England</option>
            <option value="Croatia|L">Croatia</option>
            <option value="Ghana|L">Ghana</option>
            <option value="Panama|L">Panama</option>
          </optgroup>
        </select>
        
        <p style={{ fontSize: "12px", color: "#666", marginTop: "8px", textAlign: "center" }}>
          📋 Select any team from the dropdown to jump to their group
        </p>
      </div>

      {/* Group Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px", borderBottom: "2px solid #e5e7eb", paddingBottom: "12px" }}>
        {groups.map(group => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            style={{
              backgroundColor: selectedGroup === group ? "#1e3a8a" : "#f3f4f6",
              color: selectedGroup === group ? "white" : "#374151",
              border: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {groupNames[group]}
          </button>
        ))}
      </div>

      {/* Standings Table */}
      {standings[selectedGroup] && (
        <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "auto", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "600px" }}>
            <thead>
              <tr style={{ backgroundColor: "#1e3a8a", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>#</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Team</th>
                <th style={{ padding: "12px", textAlign: "center" }}>P</th>
                <th style={{ padding: "12px", textAlign: "center" }}>W</th>
                <th style={{ padding: "12px", textAlign: "center" }}>D</th>
                <th style={{ padding: "12px", textAlign: "center" }}>L</th>
                <th style={{ padding: "12px", textAlign: "center" }}>GF</th>
                <th style={{ padding: "12px", textAlign: "center" }}>GA</th>
                <th style={{ padding: "12px", textAlign: "center" }}>GD</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings[selectedGroup].map((team, idx) => (
                <tr key={team.name} style={{ borderBottom: "1px solid #e5e7eb", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", color: "#6b7280" }}>{idx + 1}</td>
                  <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <img 
                      src={getFlagUrl(team.name)} 
                      alt={team.name}
                      style={{ width: "24px", height: "18px", objectFit: "cover", borderRadius: "2px" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span style={{ color: "#000000", fontWeight: "500" }}>{team.name}</span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.played}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#16a34a", fontWeight: "500" }}>{team.wins}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#eab308", fontWeight: "500" }}>{team.draws}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#dc2626", fontWeight: "500" }}>{team.losses}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.goalsFor}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.goalsAgainst}</td>
                  <td style={{ 
                    padding: "12px", 
                    textAlign: "center", 
                    fontWeight: "bold",
                    color: team.goalDifference >= 0 ? "#16a34a" : "#dc2626"
                  }}>
                    {team.goalDifference}
                  </td>
                  <td style={{ 
                    padding: "12px", 
                    textAlign: "center", 
                    fontWeight: "bold", 
                    fontSize: "16px",
                    color: "#1e3a8a"
                  }}>
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: "20px", padding: "12px", backgroundColor: "#f3f4f6", borderRadius: "8px", fontSize: "11px", color: "#6b7280", textAlign: "center", flexWrap: "wrap" }}>
        <span style={{ marginRight: "16px" }}>✅ P: Played</span>
        <span style={{ marginRight: "16px" }}>✅ W: Wins</span>
        <span style={{ marginRight: "16px" }}>✅ D: Draws</span>
        <span style={{ marginRight: "16px" }}>✅ L: Losses</span>
        <span style={{ marginRight: "16px" }}>✅ GF: Goals For</span>
        <span style={{ marginRight: "16px" }}>✅ GA: Goals Against</span>
        <span>✅ GD: Goal Difference</span>
      </div>
    </div>
  );
}

export default GroupStandings;