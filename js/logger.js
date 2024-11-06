import { ANGELS, DEMONS } from './constants.js';

class Logger {
    constructor(score) {
        this.entries = [];
        this.demonCounts = {};
        this.score = score;
        // Initialize demon counts
        DEMONS.forEach(demon => {
            this.demonCounts[demon.id] = 0;
        });
    }

    // Record an angel action
    recordAngel(angelId, notes = '', isUnlucky = false) {
        const angel = ANGELS.find(a => a.id === angelId);
        if (!angel) return null;

        const entry = {
            timestamp: this.getCurrentTime(),
            type: 'angel',
            action: angel,
            notes: notes,
            isUnlucky: isUnlucky,
            scoreImpact: isUnlucky ? 0 : angel.multiplier
        };

        this.entries.unshift(entry); // Add to beginning of array
        return this.score.updateScore(entry);
    }

    // Record a demon action
    recordDemon(demonId, notes = '', isLucky = false) {
        const demon = DEMONS.find(d => d.id === demonId);
        if (!demon) return null;

        // Check if max occurrences reached
        if (this.demonCounts[demonId] >= demon.maxOccurrences) {
            this.showBreakAlert(demon);
            return null;
        }

        const entry = {
            timestamp: this.getCurrentTime(),
            type: 'demon',
            action: demon,
            notes: notes,
            isLucky: isLucky,
            scoreImpact: isLucky ? 0 : demon.multiplier
        };

        this.entries.unshift(entry);
        this.demonCounts[demonId]++;
        const status = this.score.updateScore(entry);

        // Check if this entry triggers max occurrences
        if (this.demonCounts[demonId] === demon.maxOccurrences) {
            this.showBreakAlert(demon);
        }

        return status;
    }

    // Get current time in HH:mm format (NY timezone)
    getCurrentTime() {
        return new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Get all entries
    getEntries() {
        return this.entries.map((entry, index) => ({...entry, index}));
    }

    // Delete entry by index
    deleteEntry(index) {
        const entry = this.entries[index];
        if (!entry) return false;

        // If it's a demon, decrease its count
        if (entry.type === 'demon') {
            this.demonCounts[entry.action.id]--;
        }

        // Remove the entry
        this.entries.splice(index, 1);
        return true;
    }

    // Get counts for summary
    getCounts() {
        return {
            angels: this.entries.filter(entry => entry.type === 'angel').length,
            demons: this.entries.filter(entry => entry.type === 'demon').length
        };
    }

    // Get demon occurrences
    getDemonCounts() {
        return this.demonCounts;
    }

    // Show break alert
    showBreakAlert(demon) {
        alert(`Maximum occurrences (${demon.maxOccurrences}) reached for ${demon.name}. Time for a break!`);
    }

    // Calculate current session score
    getSessionScore() {
        return this.score.getScore();
    }

    // Export session data to CSV format
    exportToCSV() {
        const headers = ['Timestamp', 'Action', 'Score Impact', 'Note', 'Session Score', 'Luck'];
        let sessionScore = 0;
        
        const rows = this.entries.map(entry => {
            sessionScore += entry.scoreImpact;
            return [
                entry.timestamp,
                entry.action.name,
                entry.scoreImpact,
                entry.notes,
                sessionScore,
                entry.type === 'demon' ? entry.isLucky : entry.isUnlucky
            ];
        });

        return [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
    }

    // Reset the session
    resetSession() {
        this.entries = [];
        DEMONS.forEach(demon => {
            this.demonCounts[demon.id] = 0;
        });
        this.score.reset();
    }
}

export default Logger;