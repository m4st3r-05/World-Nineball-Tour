// Mutable in-memory data store
const top32Players = [
    { id: 1, name: "Dương Quốc Hoàng", country: "VIE", flag: "🇻🇳", rank: 1, points: 1700 },
    { id: 2, name: "Fedor Gorst", country: "USA", flag: "🇺🇸", rank: 2, points: 1650 },
    { id: 3, name: "Mario He", country: "AUT", flag: "🇦🇹", rank: 3, points: 1605 },
    { id: 4, name: "Eklent Kaçi", country: "ALB", flag: "🇦🇱", rank: 4, points: 1550 },
    { id: 5, name: "Joshua Filler", country: "GER", flag: "🇩🇪", rank: 5, points: 1490 },
    { id: 6, name: "Albin Ouschan", country: "AUT", flag: "🇦🇹", rank: 6, points: 1455 },
    { id: 7, name: "Jayson Shaw", country: "SCO", flag: "🏴", rank: 7, points: 1410 },
    { id: 8, name: "Francisco Sánchez Ruiz", country: "ESP", flag: "🇪🇸", rank: 8, points: 1380 },
    { id: 9, name: "Naoyuki Oi", country: "JPN", flag: "🇯🇵", rank: 9, points: 1340 },
    { id: 10, name: "Mieszko Fortuński", country: "POL", flag: "🇵🇱", rank: 10, points: 1310 },
    { id: 11, name: "Niels Feijen", country: "NED", flag: "🇳🇱", rank: 11, points: 1275 },
    { id: 12, name: "Skyler Woodward", country: "USA", flag: "🇺🇸", rank: 12, points: 1245 },
    { id: 13, name: "Carlo Biado", country: "PHI", flag: "🇵🇭", rank: 13, points: 1205 },
    { id: 14, name: "Max Lechner", country: "AUT", flag: "🇦🇹", rank: 14, points: 1175 },
    { id: 15, name: "Mohammed Bedard", country: "USA", flag: "🇺🇸", rank: 15, points: 1140 },
    { id: 16, name: "David Alcaide", country: "ESP", flag: "🇪🇸", rank: 16, points: 1110 },
    { id: 17, name: "Ralf Souquet", country: "GER", flag: "🇩🇪", rank: 17, points: 1085 },
    { id: 18, name: "Wu Kun Lin", country: "TPE", flag: "🇹🇼", rank: 18, points: 1060 },
    { id: 19, name: "Kostas Papadopoulos", country: "GRE", flag: "🇬🇷", rank: 19, points: 1040 },
    { id: 20, name: "Mickey Krause", country: "USA", flag: "🇺🇸", rank: 20, points: 1015 },
    { id: 21, name: "Marc Vidal", country: "ESP", flag: "🇪🇸", rank: 21, points: 990 },
    { id: 22, name: "Warren Kiamco", country: "PHI", flag: "🇵🇭", rank: 22, points: 975 },
    { id: 23, name: "Brennan Jordan", country: "USA", flag: "🇺🇸", rank: 23, points: 960 },
    { id: 24, name: "S. Y. Park", country: "KOR", flag: "🇰🇷", rank: 24, points: 940 },
    { id: 25, name: "Alexander Kazakis", country: "GRE", flag: "🇬🇷", rank: 25, points: 920 },
    { id: 26, name: "Rodolfo Luat", country: "PHI", flag: "🇵🇭", rank: 26, points: 900 },
    { id: 27, name: "Lee Vann Corteza", country: "PHI", flag: "🇵🇭", rank: 27, points: 885 },
    { id: 28, name: "Pavel Olegovich", country: "RUS", flag: "🇷🇺", rank: 28, points: 870 },
    { id: 29, name: "Sergey Tkach", country: "UKR", flag: "🇺🇦", rank: 29, points: 850 },
    { id: 30, name: "John Morra", country: "CAN", flag: "🇨🇦", rank: 30, points: 830 },
    { id: 31, name: "Chris Melling", country: "ENG", flag: "🇬🇧", rank: 31, points: 815 },
    { id: 32, name: "Harvey Ahlers", country: "USA", flag: "🇺🇸", rank: 32, points: 800 }
];

function buildTournamentBracket(players, raceTo = 9) {
    const rounds = [];
    let currentRoundPlayers = players.map((player) => ({ ...player }));
    let roundNumber = 1;

    while (currentRoundPlayers.length > 1) {
        const matches = [];
        const nextRoundPlayers = [];

        for (let i = 0; i < currentRoundPlayers.length; i += 2) {
            const playerA = currentRoundPlayers[i];
            const playerB = currentRoundPlayers[i + 1];
            const scoreA = i % 4 === 0 ? raceTo : (i % 3 === 0 ? 7 : 9);
            const scoreB = i % 4 === 0 ? 5 : (i % 3 === 0 ? 9 : 2);
            const winner = scoreA >= raceTo ? playerA : playerB;

            matches.push({
                id: `${roundNumber}-${(i / 2) + 1}`,
                round: `Round ${roundNumber}`,
                roundLabel: `ROUND ${roundNumber} - RACE TO ${raceTo}`,
                player1: playerA,
                player2: playerB,
                score1: scoreA,
                score2: scoreB,
                winner: winner.name,
                scheduled: `Jul ${20 + roundNumber}, ${18 + (i % 4)}:30`,
                venue: "Main Table"
            });

            nextRoundPlayers.push(winner);
        }

        rounds.push({
            name: `Round ${roundNumber}`,
            label: `ROUND ${roundNumber} - RACE TO ${raceTo}`,
            matches
        });

        currentRoundPlayers = nextRoundPlayers;
        roundNumber += 1;
    }

    return rounds;
}

const data = {
    tournaments: [
        {
            id: 1,
            name: "World Pool Championship 2026",
            shortName: "WORLD POOL",
            subtitle: "CHAMPIONSHIP",
            date: "01 - 06 June 2026",
            dateRange: "Jun 01 - 06, 2026",
            venue: "Green Halls",
            location: "Jeddah, Saudi Arabia",
            prize: "$1,000,000",
            type: "Major",
            status: "Upcoming",
            image: "/img/world-pool-championship.jpg",
            heroImage: "/img/world-pool-championship.jpg",
            raceTarget: 9,
            participants: top32Players,
            prizeBreakdown: [
                { position: "Champion", amount: "$250,000" },
                { position: "Runner-up", amount: "$100,000" },
                { position: "Semi-finalists", amount: "$50,000" },
                { position: "5th-8th", amount: "$25,000" },
                { position: "9th-16th", amount: "$15,000" },
                { position: "17th-32nd", amount: "$7,000" },
                { position: "33rd-64th", amount: "$3,500" },
                { position: "65th-96th", amount: "$2,000" },
                { position: "97th-128th", amount: "$1,000" }
            ],
            matches: buildTournamentBracket(top32Players, 9)
        },
        {
            id: 2,
            name: "US Open Pool Championship 2026",
            shortName: "US OPEN",
            subtitle: "CHAMPIONSHIP",
            date: "15 - 20 June 2026",
            dateRange: "Jun 15 - 20, 2026",
            venue: "Las Vegas Convention Center",
            location: "Las Vegas, USA",
            prize: "$600,000",
            type: "Ranking",
            status: "Upcoming",
            image: "/img/us-open-pool-championship.jpg",
            heroImage: "/img/us-open-pool-championship.jpg",
            raceTarget: 9,
            participants: top32Players,
            prizeBreakdown: [
                { position: "Champion", amount: "$180,000" },
                { position: "Runner-up", amount: "$80,000" },
                { position: "Semi-finalists", amount: "$35,000" }
            ],
            matches: buildTournamentBracket(top32Players, 9)
        },
        {
            id: 3,
            name: "Hanoi Open Pool Championship 2026",
            shortName: "HANOI OPEN",
            subtitle: "CHAMPIONSHIP",
            date: "12 - 18 July 2026",
            dateRange: "Jul 12 - 18, 2026",
            venue: "Hanoi Indoor Stadium",
            location: "Hanoi, Vietnam",
            prize: "$750,000",
            type: "Ranking",
            status: "Upcoming",
            image: "/img/hanoi-open-pool-championship.jpg",
            heroImage: "/img/hanoi-open-pool-championship.jpg",
            raceTarget: 9,
            participants: top32Players,
            prizeBreakdown: [
                { position: "Champion", amount: "$220,000" },
                { position: "Runner-up", amount: "$95,000" },
                { position: "Semi-finalists", amount: "$40,000" }
            ],
            matches: buildTournamentBracket(top32Players, 9)
        },
        {
            id: 4,
            name: "European Open Pool Championship 2026",
            shortName: "EUROPEAN OPEN",
            subtitle: "CHAMPIONSHIP",
            date: "03 - 09 August 2026",
            dateRange: "Aug 03 - 09, 2026",
            venue: "European Arena",
            location: "Berlin, Germany",
            prize: "$500,000",
            type: "Ranking",
            status: "Upcoming",
            image: "/img/european-open-pool-championship.jpg",
            heroImage: "/img/european-open-pool-championship.jpg",
            raceTarget: 9,
            participants: top32Players,
            prizeBreakdown: [
                { position: "Champion", amount: "$150,000" },
                { position: "Runner-up", amount: "$70,000" },
                { position: "Semi-finalists", amount: "$30,000" }
            ],
            matches: buildTournamentBracket(top32Players, 9)
        }
    ],
    players: top32Players
};
module.exports = data;
