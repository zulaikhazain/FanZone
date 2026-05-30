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
  stadium: string;
  city: string;
  referee: string;
  homeLineup: string[];
  awayLineup: string[];
  weather: string;
  temperature: string;
}

export const matches: Match[] = [
  // Group A - Opening match
  { 
    id: 1, homeTeam: "Mexico", awayTeam: "South Africa", homeScore: null, awayScore: null, 
    group: "A", day: "Friday", date: "2026-06-12", time: "03:00", status: "upcoming",
    stadium: "Estadio Azteca", city: "Mexico City", referee: "Daniele Orsato (Italy)",
    homeLineup: ["Ochoa", "Montes", "Vasquez", "Gallardo", "Sanchez", "Alvarez", "Chavez", "Pineda", "Lozano", "Martin", "Jimenez"],
    awayLineup: ["Williams", "Mvala", "Xoki", "Modiba", "Kekana", "Mokoena", "Sithole", "Zungu", "Mosele", "Lekganyane", "Makgopa"],
    weather: "Clear sky", temperature: "22°C"
  },

  // Group B - Day 2
  { 
    id: 2, homeTeam: "Canada", awayTeam: "Bosnia and Herzegovina", homeScore: null, awayScore: null, 
    group: "B", day: "Saturday", date: "2026-06-13", time: "03:00", status: "upcoming",
    stadium: "BMO Field", city: "Toronto", referee: "Clement Turpin (France)",
    homeLineup: ["Borjan", "Johnston", "Vitoria", "Miller", "Laryea", "Eustaquio", "Hutchinson", "Buchanan", "David", "Larin", "Davies"],
    awayLineup: ["Sehic", "Hadzikadunic", "Sanicanin", "Kolasinac", "Dedic", "Pjanic", "Cimirot", "Tatar", "Demirovic", "Dzeko", "Prevljak"],
    weather: "Sunny", temperature: "24°C"
  },

  // Group C - Day 3
  { 
    id: 3, homeTeam: "Brazil", awayTeam: "Morocco", homeScore: null, awayScore: null, 
    group: "C", day: "Sunday", date: "2026-06-14", time: "06:00", status: "upcoming",
    stadium: "Estadio do Maracana", city: "Rio de Janeiro", referee: "Felix Zwayer (Germany)",
    homeLineup: ["Alisson", "Danilo", "Marquinhos", "Militão", "Lodi", "Casemiro", "Paquetá", "Vinicius Jr", "Rodrygo", "Neymar", "Richarlison"],
    awayLineup: ["Bounou", "Hakimi", "Aguerd", "Saiss", "Mazraoui", "Amrabat", "Ounahi", "Ziyech", "Ezzalzouli", "En-Nesyri", "Boufal"],
    weather: "Partly cloudy", temperature: "25°C"
  },

  // Group D - Day 4
  { 
    id: 4, homeTeam: "USA", awayTeam: "Paraguay", homeScore: null, awayScore: null, 
    group: "D", day: "Saturday", date: "2026-06-13", time: "09:00", status: "upcoming",
    stadium: "MetLife Stadium", city: "New Jersey", referee: "Benoit Bastien (France)",
    homeLineup: ["Turner", "Dest", "Zimmerman", "Richards", "Robinson", "Adams", "McKennie", "Musah", "Pulisic", "Weah", "Balogun"],
    awayLineup: ["Silva", "Rojas", "Gomez", "Alonso", "Espinoza", "Villalba", "Sanchez", "Romero", "Almiron", "Gonzalez", "Enciso"],
    weather: "Clear sky", temperature: "28°C"
  },

  // Group E - Day 5
  { 
    id: 5, homeTeam: "Germany", awayTeam: "Curacao", homeScore: null, awayScore: null, 
    group: "E", day: "Monday", date: "2026-06-15", time: "01:00", status: "upcoming",
    stadium: "Allianz Arena", city: "Munich", referee: "Anthony Taylor (England)",
    homeLineup: ["Neuer", "Kimmich", "Rudiger", "Schlotterbeck", "Raum", "Gundogan", "Musiala", "Sane", "Wirtz", "Muller", "Fullkrug"],
    awayLineup: ["Room", "Martina", "Van Eijma", "Gaari", "Janga", "Bacuna", "Kuwas", "Gorré", "Antonia", "Janga", "Hooi"],
    weather: "Clear", temperature: "20°C"
  },

  // Group F - Day 6
  { 
    id: 6, homeTeam: "Netherlands", awayTeam: "Japan", homeScore: null, awayScore: null, 
    group: "F", day: "Monday", date: "2026-06-15", time: "04:00", status: "upcoming",
    stadium: "Johan Cruijff Arena", city: "Amsterdam", referee: "Szymon Marciniak (Poland)",
    homeLineup: ["Flekken", "Dumfries", "Van Dijk", "Ake", "Blind", "De Jong", "Koopmeiners", "Berghuis", "Gakpo", "Depay", "Weghorst"],
    awayLineup: ["Gonda", "Itakura", "Yoshida", "Taniguchi", "Nagatomo", "Endo", "Morita", "Kamada", "Doan", "Minamino", "Asano"],
    weather: "Cloudy", temperature: "18°C"
  },

  // Group G - Day 7
  { 
    id: 7, homeTeam: "Belgium", awayTeam: "Egypt", homeScore: null, awayScore: null, 
    group: "G", day: "Tuesday", date: "2026-06-16", time: "03:00", status: "upcoming",
    stadium: "King Baudouin Stadium", city: "Brussels", referee: "Wilmar Roldan (Colombia)",
    homeLineup: ["Courtois", "Castagne", "Vertonghen", "Faes", "Theate", "Tielemans", "Onana", "De Bruyne", "Trossard", "Lukaku", "Doku"],
    awayLineup: ["El Shenawy", "Hany", "Abdelmonem", "Ibrahim", "Fatouh", "Fathi", "El Soulia", "Zizo", "Salah", "Marmoush", "Trezege"],
    weather: "Sunny", temperature: "22°C"
  },

  // Group H - Day 8
  { 
    id: 8, homeTeam: "Spain", awayTeam: "Cape Verde", homeScore: null, awayScore: null, 
    group: "H", day: "Tuesday", date: "2026-06-16", time: "12:00", status: "upcoming",
    stadium: "Camp Nou", city: "Barcelona", referee: "Victor Gomes (South Africa)",
    homeLineup: ["Simon", "Carvajal", "Laporte", "Torres", "Gaya", "Rodri", "Pedri", "Gavi", "Olmo", "Morata", "Asensio"],
    awayLineup: ["Vozinha", "Stopira", "Lopes", "Fernandes", "Furtado", "Andrade", "Monteiro", "Teixeira", "Mendes", "Rodrigues", "Tavares"],
    weather: "Sunny", temperature: "26°C"
  },

  // Group I - Day 9
  { 
    id: 9, homeTeam: "France", awayTeam: "Senegal", homeScore: null, awayScore: null, 
    group: "I", day: "Wednesday", date: "2026-06-17", time: "03:00", status: "upcoming",
    stadium: "Stade de France", city: "Paris", referee: "Ivan Barton (El Salvador)",
    homeLineup: ["Lloris", "Kounde", "Varane", "Upamecano", "Hernandez", "Tchouameni", "Rabiot", "Coman", "Griezmann", "Mbappe", "Giroud"],
    awayLineup: ["Mendy", "Sabaly", "Koulibaly", "Diallo", "Ciss", "Gueye", "Mendy", "Sarr", "Mane", "Dia", "Jackson"],
    weather: "Light rain", temperature: "16°C"
  },

  // Group J - Day 10
  { 
    id: 10, homeTeam: "Argentina", awayTeam: "Algeria", homeScore: null, awayScore: null, 
    group: "J", day: "Wednesday", date: "2026-06-17", time: "09:00", status: "upcoming",
    stadium: "Estadio Monumental", city: "Buenos Aires", referee: "Raphael Claus (Brazil)",
    homeLineup: ["Martinez", "Molina", "Romero", "Otamendi", "Acuna", "De Paul", "Paredes", "Fernandez", "Messi", "Alvarez", "Di Maria"],
    awayLineup: ["Mandrea", "Atal", "Mandi", "Touba", "Zeffane", "Bennacer", "Zerrouki", "Mahrez", "Belaili", "Slimani", "Bounedjah"],
    weather: "Sunny", temperature: "28°C"
  },

  // Group K - FINISHED MATCH (Portugal vs Denmark)
  { 
    id: 11, homeTeam: "Portugal", awayTeam: "Denmark", homeScore: 2, awayScore: 0, 
    group: "K", day: "Thursday", date: "2026-06-18", time: "01:00", status: "finished",
    stadium: "Estadio da Luz", city: "Lisbon", referee: "Szymon Marciniak (Poland)",
    homeLineup: ["Costa", "Cancelo", "Dias", "Antonio Silva", "Mendes", "Fernandes", "Palhinha", "Bernardo", "Felix", "Ronaldo", "Leao"],
    awayLineup: ["Schmeichel", "Andersen", "Kjaer", "Christensen", "Maehle", "Hojbjerg", "Eriksen", "Delaney", "Skov Olsen", "Hojlund", "Lindstrom"],
    weather: "Clear", temperature: "22°C"
  },

  // Group L - FINISHED MATCH (Example with score)
  { 
    id: 12, homeTeam: "England", awayTeam: "Croatia", homeScore: 1, awayScore: 1, 
    group: "L", day: "Monday", date: "2026-06-18", time: "04:00", status: "finished",
    stadium: "Wembley Stadium", city: "London", referee: "Jesus Valenzuela (Venezuela)",
    homeLineup: ["Pickford", "Walker", "Stones", "Maguire", "Shaw", "Rice", "Bellingham", "Saka", "Foden", "Rashford", "Kane"],
    awayLineup: ["Livakovic", "Juranovic", "Lovren", "Gvardiol", "Sosa", "Modric", "Brozovic", "Kovacic", "Vlasic", "Perisic", "Kramaric"],
    weather: "Light rain", temperature: "15°C"
  },
];