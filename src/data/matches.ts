export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  group: string;
  date: string;
  time: string;
  status: "upcoming" | "finished";
}

export const matches: Match[] = [
  // Group A
  { id: 1, homeTeam: "Mexico", awayTeam: "South Africa", homeScore: null, awayScore: null, group: "A", date: "2026-06-12", time: "03:00", status: "upcoming" },
  { id: 2, homeTeam: "South Korea", awayTeam: "Czechia", homeScore: null, awayScore: null, group: "A", date: "2026-06-12", time: "10:00", status: "upcoming" },
  
  // Group B
  { id: 3, homeTeam: "Canada", awayTeam: "Bosnia and Herzegovina", homeScore: null, awayScore: null, group: "B", date: "2026-06-13", time: "03:00", status: "upcoming" },
  { id: 4, homeTeam: "Italy", awayTeam: "Albania", homeScore: null, awayScore: null, group: "B", date: "2026-06-14", time: "21:00", status: "upcoming" },
];