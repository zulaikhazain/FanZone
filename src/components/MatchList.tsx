import { useState } from "react";
import { matches } from "../data/matches";
import type { Match } from "../data/matches";
import MatchDetailsModal from "./MatchDetailsModal";

// Group color mapping
const groupColors: Record<string, { bg: string; border: string; text: string }> = {
  "A": { bg: "#fef3c7", border: "#d97706", text: "#78350f" },  // Gold/Yellow
  "B": { bg: "#e0f2fe", border: "#0284c7", text: "#0c4a6e" },  // Blue
  "C": { bg: "#dcfce7", border: "#16a34a", text: "#14532d" },  // Green
  "D": { bg: "#fee2e2", border: "#dc2626", text: "#7f1d1d" },  // Red
  "E": { bg: "#f3e8ff", border: "#9333ea", text: "#4c1d95" },  // Purple
  "F": { bg: "#ffedd5", border: "#ea580c", text: "#7c2d12" },  // Orange
  "G": { bg: "#cffafe", border: "#0891b2", text: "#164e63" },  // Cyan
  "H": { bg: "#fce7f3", border: "#db2777", text: "#831843" },  // Pink
  "I": { bg: "#e0e7ff", border: "#4f46e5", text: "#312e81" },  // Indigo
  "J": { bg: "#fed7aa", border: "#ea580c", text: "#431407" },  // Light Orange
  "K": { bg: "#d1fae5", border: "#059669", text: "#064e3b" },  // Emerald
  "L": { bg: "#fef9c3", border: "#ca8a04", text: "#713f12" },  // Light Yellow
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
    "DR Congo": "cd",
    "Uzbekistan": "uz",
    "Colombia": "co",
    "England": "gb-eng",
    "Croatia": "hr",
    "Ghana": "gh",
    "Panama": "pa",
    "Chezia": "cz",
    "Denmark": "dk",
  };
  
  const code = countryCodes[country] || "un";
  return `https://flagicons.lipis.dev/flags/4x3/${code}.svg`;
};

// Sort matches by date (earliest first)
function sortByDate(matchArray: Match[]): Match[] {
  return [...matchArray].sort((a, b) => {
    const dateTimeA = `${a.date} ${a.time}`;
    const dateTimeB = `${b.date} ${b.time}`;
    return new Date(dateTimeA).getTime() - new Date(dateTimeB).getTime();
  });
}

// Group matches by date
function groupByDate(matchArray: Match[]): { [date: string]: Match[] } {
  const grouped: { [date: string]: Match[] } = {};
  matchArray.forEach(match => {
    if (!grouped[match.date]) {
      grouped[match.date] = [];
    }
    grouped[match.date].push(match);
  });
  return grouped;
}

// Format date header
function formatDateHeader(dateStr: string) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  return formattedDate;
}

function MatchList() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  // Get matches and sort them by date
  const upcomingMatches = sortByDate(matches.filter(m => m.status === "upcoming"));
  const finishedMatches = sortByDate(matches.filter(m => m.status === "finished"));
  
  // Group matches by date
  const upcomingByDate = groupByDate(upcomingMatches);
  const finishedByDate = groupByDate(finishedMatches);
  
  // Get sorted dates
  const upcomingDates = Object.keys(upcomingByDate).sort();
  const finishedDates = Object.keys(finishedByDate).sort();

  return (
    <div style={{ padding: "20px" }}>
      {/* Time Zone Note - Top */}
      <div style={{
        backgroundColor: "#f3f4f6",
        padding: "8px 12px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "12px",
        color: "#4b5563",
        textAlign: "center",
        border: "1px solid #d97706"
      }}>
        ⏰ All times shown in <strong>24-hour format</strong> • <strong>MYT (Malaysia Time)</strong>
      </div>

      <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#000000" }}>
        📅 Upcoming Matches: Group Stage ({upcomingMatches.length})
      </h2>
      
      {upcomingDates.length > 0 ? (
        upcomingDates.map(date => (
          <div key={date}>
            <h3 style={{
              fontSize: "18px",
              marginTop: "20px",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "3px solid #d97706",
              color: "#374151"
            }}>
              📍 {formatDateHeader(date)}
            </h3>
            {upcomingByDate[date].map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onClick={() => setSelectedMatch(match)}
              />
            ))}
          </div>
        ))
      ) : (
        <p style={{ color: "#000000" }}>No upcoming matches</p>
      )}
      
      <h2 style={{ fontSize: "24px", marginTop: "32px", color: "#000000", marginBottom: "16px" }}>
        ✅ Finished Matches ({finishedMatches.length})
      </h2>
      
      {finishedDates.length > 0 ? (
        finishedDates.map(date => (
          <div key={date}>
            <h3 style={{
              fontSize: "18px",
              marginTop: "20px",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "3px solid #dc2626",
              color: "#374151"
            }}>
              📍 {formatDateHeader(date)}
            </h3>
            {finishedByDate[date].map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onClick={() => setSelectedMatch(match)}
              />
            ))}
          </div>
        ))
      ) : (
        <p style={{ color: "#000000" }}>No finished matches yet</p>
      )}

      {/* Time Zone Note - Footer */}
      <div style={{
        marginTop: "32px",
        paddingTop: "16px",
        borderTop: "1px solid #e5e7eb",
        textAlign: "center",
        fontSize: "11px",
        color: "#9ca3af",
        border: "#d97706"
      }}>
        All times are in <strong>24-hour format</strong> and displayed in <strong>Malaysia Time (MYT)</strong>
      </div>

      {/* Match Details Modal */}
      <MatchDetailsModal 
        match={selectedMatch} 
        onClose={() => setSelectedMatch(null)} 
      />
    </div>
  );
}

function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  // Get colors for this group, fallback to default if group not found
  const colors = groupColors[match.group] || { bg: "#f3f4f6", border: "#9ca3af", text: "#1f2937" };
  
  return (
    <div 
      style={{
        border: `2px solid ${colors.border}`,
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "12px",
        backgroundColor: colors.bg,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s"
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ 
        fontWeight: "bold", 
        color: colors.text, 
        fontSize: "14px",
        marginBottom: "4px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <span>Group {match.group}</span>
        <span style={{ backgroundColor: colors.border, color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "12px" }}>
          {match.day || ""}
        </span>
      </div>
      
      {/* Teams with Image Flags */}
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "500", 
        margin: "8px 0",
        color: "#1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img 
            src={getFlagUrl(match.homeTeam)} 
            alt={match.homeTeam}
            style={{ width: "24px", height: "18px", objectFit: "cover", borderRadius: "2px" }}
          />
          {match.homeTeam}
        </span>
        <span style={{ fontWeight: "bold", color: colors.border }}>vs</span>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img 
            src={getFlagUrl(match.awayTeam)} 
            alt={match.awayTeam}
            style={{ width: "24px", height: "18px", objectFit: "cover", borderRadius: "2px" }}
          />
          {match.awayTeam}
        </span>
      </div>
      
      <div style={{ color: "#4b5563", fontSize: "14px", textAlign: "center" }}>
        ⏰ {match.time}
      </div>
      
      {match.status === "finished" && match.homeScore !== null && (
        <div style={{ 
          fontSize: "20px", 
          fontWeight: "bold", 
          marginTop: "8px",
          color: colors.text,
          textAlign: "center"
        }}>
          Final Score: {match.homeScore} - {match.awayScore}
        </div>
      )}
    </div>
  );
}

export default MatchList;