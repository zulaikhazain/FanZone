export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  group: string;
  day: string;
  date: string;
  time: string;
  status: "upcoming" | "finished";
}

export const matches: Match[] = [
  // Group A
  { id: 1, homeTeam: "Mexico", awayTeam: "South Africa", homeScore: null, awayScore: null, group: "A", day: "Friday", date: "2026-06-12", time: "03:00", status: "upcoming" },
  { id: 2, homeTeam: "South Korea", awayTeam: "Czechia", homeScore: null, awayScore: null, group: "A", day: "Friday", date: "2026-06-12", time: "10:00", status: "upcoming" },
  { id: 3, homeTeam: "Chezia", awayTeam: "South Africa", homeScore: null, awayScore: null, group: "A", day: "Friday", date: "2026-06-19", time: "12:00", status: "upcoming" },
  { id: 4, homeTeam: "Mexico", awayTeam: "South Korea", homeScore: null, awayScore: null, group: "A", day: "Friday", date: "2026-06-19", time: "09:00", status: "upcoming" },
  { id: 5, homeTeam: "South Africa", awayTeam: "South Korea", homeScore: null, awayScore: null, group: "A", day: "Thursday", date: "2026-06-25", time: "09:00", status: "upcoming" },
  { id: 6, homeTeam: "Czechia", awayTeam: "Mexico", homeScore: null, awayScore: null, group: "A", day: "Thursday", date: "2026-06-25", time: "09:00", status: "upcoming" },

  // Group B
  { id: 7, homeTeam: "Canada", awayTeam: "Bosnia and Herzegovina", homeScore: null, awayScore: null, group: "B", day: "Saturday", date: "2026-06-13", time: "03:00", status: "upcoming" },
  { id: 8, homeTeam: "Qatar", awayTeam: "Switzerland", homeScore: null, awayScore: null, group: "B", day: "Sunday", date: "2026-06-14", time: "03:00", status: "upcoming" },
  { id: 9, homeTeam: "Switzerland", awayTeam: "Bosnia and Herzegovina", homeScore: null, awayScore: null, group: "B", day: "Friday", date: "2026-06-19", time: "03:00", status: "upcoming" },
  { id: 10, homeTeam: "Canada", awayTeam: "Qatar", homeScore: null, awayScore: null, group: "B", day: "Friday", date: "2026-06-19", time: "06:00", status: "upcoming" },
  { id: 11, homeTeam: "Switzerland", awayTeam: "Canada", homeScore: null, awayScore: null, group: "B", day: "Thursday", date: "2026-06-25", time: "03:00", status: "upcoming" },
  { id: 12, homeTeam: "Bosnia and Herzegovina", awayTeam: "Qatar", homeScore: null, awayScore: null, group: "B", day: "Thursday", date: "2026-06-25", time: "03:00", status: "upcoming" },

  // Group C
  { id: 13, homeTeam: "Brazil", awayTeam: "Morocco", homeScore: null, awayScore: null, group: "C", day: "Sunday", date: "2026-06-14", time: "06:00", status: "upcoming" },
  { id: 14, homeTeam: "Haiti", awayTeam: "Scotland", homeScore: null, awayScore: null, group: "C", day: "Sunday", date: "2026-06-14", time: "09:00", status: "upcoming" },
  { id: 15, homeTeam: "Scotland", awayTeam: "Morocco", homeScore: null, awayScore: null, group: "C", day: "Saturday", date: "2026-06-20", time: "06:00", status: "upcoming" },
  { id: 16, homeTeam: "Brazil", awayTeam: "Haiti", homeScore: null, awayScore: null, group: "C", day: "Saturday", date: "2026-06-20", time: "08:30", status: "upcoming" },
  { id: 17, homeTeam: "Morocco", awayTeam: "Haiti", homeScore: null, awayScore: null, group: "C", day: "Thursday", date: "2026-06-25", time: "06:00", status: "upcoming" },
  { id: 18, homeTeam: "Scotland", awayTeam: "Brazil", homeScore: null, awayScore: null, group: "C", day: "Thursday", date: "2026-06-25", time: "06:00", status: "upcoming" },

  // Group D
  { id: 19, homeTeam: "USA", awayTeam: "Paraguay", homeScore: null, awayScore: null, group: "D", day: "Saturday", date: "2026-06-13", time: "09:00", status: "upcoming" },
  { id: 20, homeTeam: "Australia", awayTeam: "Turkiye", homeScore: null, awayScore: null, group: "D", day: "Sunday", date: "2026-06-14", time: "12:00", status: "upcoming" },
  { id: 21, homeTeam: "USA", awayTeam: "Australia", homeScore: null, awayScore: null, group: "D", day: "Saturday", date: "2026-06-20", time: "03:00", status: "upcoming" },
  { id: 22, homeTeam: "Turkiye", awayTeam: "Paraguay", homeScore: null, awayScore: null, group: "D", day: "Saturday", date: "2026-06-20", time: "11:00", status: "upcoming" },
  { id: 23, homeTeam: "Turkiye", awayTeam: "USA", homeScore: null, awayScore: null, group: "D", day: "Friday", date: "2026-06-26", time: "10:00", status: "upcoming" },
  { id: 24, homeTeam: "Paraguay", awayTeam: "Australia", homeScore: null, awayScore: null, group: "D", day: "Friday", date: "2026-06-26", time: "10:00", status: "upcoming" },

  // Group E
  { id: 25, homeTeam: "Germany", awayTeam: "Curacao", homeScore: null, awayScore: null, group: "E", day: "Monday", date: "2026-06-15", time: "01:00", status: "upcoming" },
  { id: 26, homeTeam: "Ivory Coast", awayTeam: "Ecuador", homeScore: null, awayScore: null, group: "E", day: "Monday", date: "2026-06-15", time: "07:00", status: "upcoming" },
  { id: 27, homeTeam: "Germany", awayTeam: "Ivory Coast", homeScore: null, awayScore: null, group: "E", day: "Sunday", date: "2026-06-21", time: "04:00", status: "upcoming" },
  { id: 28, homeTeam: "Ecuador", awayTeam: "Curacao", homeScore: null, awayScore: null, group: "E", day: "Sunday", date: "2026-06-21", time: "08:00", status: "upcoming" },
  { id: 29, homeTeam: "Curacao", awayTeam: "Ivory Coast", homeScore: null, awayScore: null, group: "E", day: "Friday", date: "2026-06-26", time: "04:00", status: "upcoming" },
  { id: 30, homeTeam: "Ecuador", awayTeam: "Germany", homeScore: null, awayScore: null, group: "E", day: "Friday", date: "2026-06-26", time: "04:00", status: "upcoming" },

  // Group F
  { id: 31, homeTeam: "Netherlands", awayTeam: "Japan", homeScore: null, awayScore: null, group: "F", day: "Monday", date: "2026-06-15", time: "04:00", status: "upcoming" },
  { id: 32, homeTeam: "Sweden", awayTeam: "Tunisia", homeScore: null, awayScore: null, group: "F", day: "Monday", date: "2026-06-15", time: "10:00", status: "upcoming" },
  { id: 33, homeTeam: "Netherlands", awayTeam: "Sweden", homeScore: null, awayScore: null, group: "F", day: "Sunday", date: "2026-06-21", time: "04:00", status: "upcoming" },
  { id: 34, homeTeam: "Tunisia", awayTeam: "Japan", homeScore: null, awayScore: null, group: "F", day: "Sunday", date: "2026-06-21", time: "12:00", status: "upcoming" },
  { id: 35, homeTeam: "Tunisia", awayTeam: "Netherlands", homeScore: null, awayScore: null, group: "F", day: "Friday", date: "2026-06-26", time: "07:00", status: "upcoming" },
  { id: 36, homeTeam: "Japan", awayTeam: "Sweden", homeScore: null, awayScore: null, group: "F", day: "Friday", date: "2026-06-26", time: "07:00", status: "upcoming" },

  // Group G
  { id: 37, homeTeam: "Belgium", awayTeam: "Egypt", homeScore: null, awayScore: null, group: "G", day: "Tuesday", date: "2026-06-16", time: "03:00", status: "upcoming" },
  { id: 38, homeTeam: "Iran", awayTeam: "New Zealand", homeScore: null, awayScore: null, group: "G", day: "Tuesday", date: "2026-06-16", time: "09:00", status: "upcoming" },
  { id: 39, homeTeam: "Belgium", awayTeam: "Iran", homeScore: null, awayScore: null, group: "G", day: "Monday", date: "2026-06-22", time: "03:00", status: "upcoming" },
  { id: 40, homeTeam: "New Zealand", awayTeam: "Egypt", homeScore: null, awayScore: null, group: "G", day: "Monday", date: "2026-06-22", time: "09:00", status: "upcoming" },
  { id: 41, homeTeam: "New Zealand", awayTeam: "Belgium", homeScore: null, awayScore: null, group: "G", day: "Saturday", date: "2026-06-27", time: "11:00", status: "upcoming" },
  { id: 42, homeTeam: "Egypt", awayTeam: "Iran", homeScore: null, awayScore: null, group: "G", day: "Saturday", date: "2026-06-27", time: "11:00", status: "upcoming" },

  // Group H
  { id: 43, homeTeam: "Spain", awayTeam: "Cape Verde", homeScore: null, awayScore: null, group: "H", day: "Tuesday", date: "2026-06-16", time: "12:00", status: "upcoming" },
  { id: 44, homeTeam: "Saudi Arabia", awayTeam: "Uruguay", homeScore: null, awayScore: null, group: "H", day: "Tuesday", date: "2026-06-16", time: "06:00", status: "upcoming" },
  { id: 45, homeTeam: "Spain", awayTeam: "Saudi Arabia", homeScore: null, awayScore: null, group: "H", day: "Monday", date: "2026-06-22", time: "06:00", status: "upcoming" },
  { id: 46, homeTeam: "Uruguay", awayTeam: "Cape Verde", homeScore: null, awayScore: null, group: "H", day: "Tuesday", date: "2026-06-22", time: "06:00", status: "upcoming" },
  { id: 47, homeTeam: "Cape verde", awayTeam: "Saudi Arabia", homeScore: null, awayScore: null, group: "H", day: "Saturday", date: "2026-06-27", time: "08:00", status: "upcoming" },
  { id: 48, homeTeam: "Uruguay", awayTeam: "Spain", homeScore: null, awayScore: null, group: "H", day: "Saturday", date: "2026-06-27", time: "08:00", status: "upcoming" },

  // Group I
  { id: 49, homeTeam: "France", awayTeam: "Senegal", homeScore: null, awayScore: null, group: "I", day: "Wednesday", date: "2026-06-17", time: "03:00", status: "upcoming" },
  { id: 50, homeTeam: "Iraq", awayTeam: "Norway", homeScore: null, awayScore: null, group: "I", day: "Wednesday", date: "2026-06-17", time: "06:00", status: "upcoming" },
  { id: 51, homeTeam: "France", awayTeam: "Iraq", homeScore: null, awayScore: null, group: "I", day: "Tuesday", date: "2026-06-23", time: "05:00", status: "upcoming" },
  { id: 52, homeTeam: "Norway", awayTeam: "Senegal", homeScore: null, awayScore: null, group: "I", day: "Tuesday", date: "2026-06-23", time: "08:00", status: "upcoming" },
  { id: 53, homeTeam: "Norway", awayTeam: "France", homeScore: null, awayScore: null, group: "I", day: "Saturday", date: "2026-06-27", time: "03:00", status: "upcoming" },
  { id: 54, homeTeam: "Senegal", awayTeam: "Iraq", homeScore: null, awayScore: null, group: "I", day: "Saturday", date: "2026-06-23", time: "03:00", status: "upcoming" },
  
  // Group J
  { id: 55, homeTeam: "Argentina", awayTeam: "Algeria", homeScore: null, awayScore: null, group: "J", day: "Wednesday", date: "2026-06-17", time: "09:00", status: "upcoming" },
  { id: 56, homeTeam: "Austria", awayTeam: "Jordan", homeScore: null, awayScore: null, group: "J", day: "Wednesday", date: "2026-06-17", time: "12:00", status: "upcoming" },
  { id: 57, homeTeam: "Argentina", awayTeam: "Austria", homeScore: null, awayScore: null, group: "J", day: "Tuesday", date: "2026-06-23", time: "0:00", status: "upcoming" },
  { id: 58, homeTeam: "Jordan", awayTeam: "Algeria", homeScore: null, awayScore: null, group: "J", day: "Tuesday", date: "2026-06-23", time: "11:00", status: "upcoming" },
  { id: 59, homeTeam: "Algeria", awayTeam: "Austria", homeScore: null, awayScore: null, group: "J", day: "Sunday", date: "2026-06-28", time: "10:00", status: "upcoming" },
  { id: 60, homeTeam: "Jordan", awayTeam: "Argentina", homeScore: null, awayScore: null, group: "J", day: "Sunday", date: "2026-06-28", time: "10:00", status: "upcoming" },

  // Group K
  { id: 61, homeTeam: "Portugal", awayTeam: "DR Congo", homeScore: null, awayScore: null, group: "K", day: "Thursday", date: "2026-06-18", time: "01:00", status: "upcoming" },
  { id: 62, homeTeam: "Uzbekistan", awayTeam: "Colombia", homeScore: null, awayScore: null, group: "K", day: "Thursday", date: "2026-06-18", time: "10:00", status: "upcoming" },
  { id: 63, homeTeam: "Portugal", awayTeam: "Uzbekistan", homeScore: null, awayScore: null, group: "K", day: "Wednesday", date: "2026-06-24", time: "01:00", status: "upcoming" },
  { id: 64, homeTeam: "Colombia", awayTeam: "DR Congo", homeScore: null, awayScore: null, group: "K", day: "Wednesday", date: "2026-06-24", time: "10:00", status: "upcoming" },
  { id: 65, homeTeam: "Colombia", awayTeam: "Portugal", homeScore: null, awayScore: null, group: "K", day: "Sunday", date: "2026-06-28", time: "07:30", status: "upcoming" },
  { id: 66, homeTeam: "DR Congo", awayTeam: "Uzbekistan", homeScore: null, awayScore: null, group: "K", day: "Sunday", date: "2026-06-28", time: "07:30", status: "upcoming" },

  // Group L
  { id: 67, homeTeam: "England", awayTeam: "Croatia", homeScore: null, awayScore: null, group: "L", day: "Monday", date: "2026-06-18", time: "04:00", status: "upcoming" },
  { id: 68, homeTeam: "Ghana", awayTeam: "Panama", homeScore: null, awayScore: null, group: "L", day: "Monday", date: "2026-06-18", time: "07:00", status: "upcoming" },
  { id: 69, homeTeam: "England", awayTeam: "Ghana", homeScore: null, awayScore: null, group: "L", day: "Wednesday", date: "2026-06-24", time: "04:00", status: "upcoming" },
  { id: 70, homeTeam: "Panama", awayTeam: "Croatia", homeScore: null, awayScore: null, group: "L", day: "Wednesday", date: "2026-06-24", time: "07:00", status: "upcoming" },
  { id: 71, homeTeam: "Panama", awayTeam: "England", homeScore: null, awayScore: null, group: "L", day: "Sunday", date: "2026-06-28", time: "05:00", status: "upcoming" },
  { id: 72, homeTeam: "Croatia", awayTeam: "Ghana", homeScore: null, awayScore: null, group: "L", day: "Sunday", date: "2026-06-28", time: "05:00", status: "upcoming" },
];