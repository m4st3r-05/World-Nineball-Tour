// Mutable in-memory data store
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
            type: "Ranking",
            status: "Upcoming",
            image: "/img/world-pool-championship.jpg",
            heroImage: "/img/world-pool-championship.jpg",
            raceTarget: 9,
            prizeBreakdown: [
                { position: "Champion",       amount: "$250,000" },
                { position: "Runner-up",      amount: "$100,000" },
                { position: "Semi-finalists", amount: "$50,000" },
                { position: "5th-8th",        amount: "$25,000" },
                { position: "9th-16th",       amount: "$15,000" },
                { position: "17th-32nd",      amount: "$7,000" },
                { position: "33rd-64th",      amount: "$3,500" },
                { position: "65th-96th",      amount: "$2,000" },
                { position: "97th-128th",     amount: "$1,000" }
            ],
            matches: []
        }
    ],
    players: []
};
module.exports = data;
