// Trading Journal Constants

// Angels List - Positive Trading Behaviors
export const ANGELS = [
    { 
        id: 'fantastic_entry',
        name: 'Fantastic Entry',
        multiplier: 3,
        description: ''
    },
    { 
        id: 'textbook_setup',
        name: 'Textbook Setup',
        multiplier: 2,
        description: ''
    },
    { 
        id: 'sit_on_hands',
        name: 'Sit on Hands',
        multiplier: 1,
        description: ''
    },
    { 
        id: 'regenerative_break',
        name: 'Regenerative Break',
        multiplier: 1,
        description: ''
    }
];

// Demons List - Negative Trading Behaviors
export const DEMONS = [
    { 
        id: 'fomo_chase',
        name: 'FOMO/Chase Entry',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'boredom_entry',
        name: 'Boredom/No Setup Entry',
        multiplier: -2,
        maxOccurrences: 3,
        description: ''
    },
    { 
        id: 'hesitated_entry',
        name: 'Hesitated/Missed Entry',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'missed_signal',
        name: 'Missed Critical Signal',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'poor_rr',
        name: 'Poor RR',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'big_loser',
        name: 'Let a big loser',
        multiplier: -3,
        maxOccurrences: 2,
        description: ''
    },
    { 
        id: 'premature_exit',
        name: 'Premature Exit',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'overstayed',
        name: 'Overstayed',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'trading_pnl',
        name: 'Trading the PnL',
        multiplier: -1,
        maxOccurrences: 1,
        description: ''
    },
    { 
        id: 'late_exit',
        name: 'Late Exit',
        multiplier: -1,
        maxOccurrences: 1,
        description: 'overstayed your welcome, a counter should be quick'
    }
];

// Timeline Events for Market Sessions
export const TIMELINE_EVENTS = [
    { name: 'Premarket', warningMinutes: 0, startTime: '09:00', endTime: '09:25', emoji: '☕' },
    { name: 'OMAR', warningMinutes: 3, startTime: '09:30', endTime: '09:31', emoji: '1️⃣' },
    { name: 'TOMAR', warningMinutes: 0, startTime: '09:31', endTime: '09:32', emoji: '2️⃣' },
    { name: 'FIMAR', warningMinutes: 0, startTime: '09:35', endTime: '09:36', emoji: '5️⃣' },
    { name: 'TEMAR', warningMinutes: 1, startTime: '09:39', endTime: '09:40', emoji: '🔟' },
    { name: 'O/U', warningMinutes: 2, startTime: '09:45', endTime: '09:46', emoji: '🧱' },
    { name: 'LilDow', warningMinutes: 2, startTime: '09:55', endTime: '10:10', emoji: '🪟' },
    { name: 'IBMAR', warningMinutes: 3, startTime: '10:30', endTime: '10:35', emoji: '⚖️' },
    { name: 'PVI', warningMinutes: 1, startTime: '11:15', endTime: '11:16', emoji: '🐕‍🦺' },
    { name: 'POORS', warningMinutes: 1, startTime: '11:30', endTime: '11:35', emoji: '🥐' },
    { name: 'LUNCH', warningMinutes: 1, startTime: '12:00', endTime: '12:05', emoji: '🕛' }
];
