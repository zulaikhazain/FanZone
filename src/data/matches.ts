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
  { id: 1, homeTeam: "Germany", awayTeam: "Scotland", homeScore: null, awayScore: null, group: "A", date: "2026-06-12", time: "21:00", status: "upcoming" },
  { id: 2, homeTeam: "Hungary", awayTeam: "Switzerland", homeScore: null, awayScore: null, group: "A", date: "2026-06-13", time: "15:00", status: "upcoming" },
  { id: 3, homeTeam: "Germany", awayTeam: "Hungary", homeScore: null, awayScore: null, group: "A", date: "2026-06-18", time: "18:00", status: "upcoming" },
  { id: 4, homeTeam: "Switzerland", awayTeam: "Scotland", homeScore: null, awayScore: null, group: "A", date: "2026-06-18", time: "21:00", status: "upcoming" },
  
  // Group B
  { id: 5, homeTeam: "Spain", awayTeam: "Croatia", homeScore: null, awayScore: null, group: "B", date: "2026-06-13", time: "18:00", status: "upcoming" },
  { id: 6, homeTeam: "Italy", awayTeam: "Albania", homeScore: null, awayScore: null, group: "B", date: "2026-06-14", time: "21:00", status: "upcoming" },
  { id: 7, homeTeam: "Spain", awayTeam: "Italy", homeScore: null, awayScore: null, group: "B", date: "2026-06-19", time: "21:00", status: "upcoming" },
  { id: 8, homeTeam: "Croatia", awayTeam: "Albania", homeScore: null, awayScore: null, group: "B", date: "2026-06-18", time: "15:00", status: "upcoming" },
];